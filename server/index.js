const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Contact = require('./models/Contact');
require('dotenv').config();

// Gemini AI - dynamically imported because @google/genai is ESM-only
let googleGenAI;
(async () => {
  const { GoogleGenAI } = await import('@google/genai');
  googleGenAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
})();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allows connections from any origin (e.g. Vite dev port 5173/5174/5175 etc)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Simple Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Contact Us Post Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, company, message, source } = req.body;

    // Basic Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message.'
      });
    }

    // Create entry in database
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      company,
      message,
      source
    });

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error(`Error saving contact submission: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Server Error: Could not save contact submission.'
    });
  }
});

// Helper: call Gemini with model fallback + retry on 503
async function callGeminiWithFallback(prompt) {
  const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  const MAX_RETRIES = 2;

  for (const model of MODELS) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await googleGenAI.models.generateContent({
          model,
          contents: prompt,
        });
        console.log(`✅ Gemini responded using model: ${model} (attempt ${attempt})`);
        return response;
      } catch (err) {
        const is503 = err.message && (err.message.includes('503') || err.message.includes('UNAVAILABLE') || err.message.includes('overloaded'));
        const isLast = attempt === MAX_RETRIES;

        if (is503 && !isLast) {
          // Wait 1.5s before retry
          console.warn(`⚠️  Model ${model} overloaded, retrying in 1.5s... (attempt ${attempt})`);
          await new Promise(r => setTimeout(r, 1500));
          continue;
        }

        if (is503) {
          console.warn(`⚠️  Model ${model} still overloaded after ${MAX_RETRIES} attempts, trying next model...`);
          break; // try next model
        }

        throw err; // non-503 error — propagate immediately
      }
    }
  }

  throw new Error('All Gemini models are currently overloaded. Please try again in a moment.');
}

// ── DEBUG: Test Gemini connection ──────────────────────────────────────────
app.get('/test-gemini', async (req, res) => {
  console.log('🔑 GEMINI_API_KEY loaded:', process.env.GEMINI_API_KEY ? `${process.env.GEMINI_API_KEY.substring(0, 8)}...` : 'UNDEFINED');
  try {
    const response = await googleGenAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Say hello in one word.',
    });
    res.json({ success: true, text: response.text });
  } catch (error) {
    console.error('❌ Gemini test error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
      status: error.status,
      details: error.errorDetails || error.toString(),
    });
  }
});

// AI Chart Bot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const systemPrompt = `You are an analytics assistant for Arshith Groups.
Your job is to generate chart data based on the user's request.
Always return ONLY valid JSON — no markdown, no explanation, no code fences.

The JSON must follow this exact format:
{
  "chartType": "bar" | "line" | "pie",
  "title": "<chart title>",
  "data": [
    { "label": "<name>", "value": <number> }
  ]
}

If the user's query cannot be answered with a chart, return:
{ "error": "I can only generate chart data. Please ask for analytics or data visualisation." }

User question: ${message}`;

    const response = await callGeminiWithFallback(systemPrompt);

    const raw = response.text.trim();

    // Strip any accidental markdown code fences
    const cleaned = raw.replace(/^```[a-z]*\n?/i, '').replace(/```$/i, '').trim();

    const parsed = JSON.parse(cleaned);
    res.json(parsed);
  } catch (error) {
    console.error('Chart AI error:', error.message);

    // User-friendly error messages
    let friendlyMsg = 'Something went wrong with the AI service. Please try again.';
    if (error.message.includes('overloaded') || error.message.includes('503') || error.message.includes('UNAVAILABLE')) {
      friendlyMsg = 'The AI is experiencing high demand right now. Please wait a moment and try again.';
    } else if (error.message.includes('API key') || error.message.includes('401')) {
      friendlyMsg = 'API key issue. Please check the server configuration.';
    } else if (error.message.includes('quota') || error.message.includes('429')) {
      friendlyMsg = 'API quota exceeded. Please try again later.';
    }

    res.status(500).json({ error: friendlyMsg });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
