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
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'https://arshithgroup.com',
  'https://www.arshithgroup.com',
  'https://arshithgroups.web.app',
  'https://arshith-groups.vercel.app',
  'https://arshithgroups.vercel.app',
];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    // Allow all localhost ports for dev
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }
    // Allow any Vercel preview/production deployment for this project
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
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

// ── Keyword fallback for conversational chatbot ────────────
const FALLBACK_RESPONSES = [
  {
    keywords: ['fresh', 'ecommerce', 'e-commerce', 'farm', 'grocery', 'food', 'shop'],
    reply: "Arshith Fresh India Pvt Ltd is our flagship e-commerce platform, established in 2025. We bring fresh, quality products directly from farms to consumers across India — bridging the gap between producers and customers with technology. Visit arshithfresh.com to learn more!"
  },
  {
    keywords: ['infotech', 'it', 'software', 'tech', 'technology', 'development', 'cloud', 'web'],
    reply: "Arshith Infotech is our IT & software arm, delivering cutting-edge solutions across web development, cloud services, digital transformation, and software consulting. We help businesses leverage technology to scale efficiently."
  },
  {
    keywords: ['suntech', 'consulting', 'business', 'solution', 'strategy'],
    reply: "Suntech Solutions, established in 2019, is our business consulting division. We provide strategic guidance, operational improvements, and growth strategies to help organizations achieve their goals across diverse industries."
  },
  {
    keywords: ['intern', 'internship', 'job', 'career', 'work', 'apply', 'hire', 'opportunity', 'training'],
    reply: "We offer exciting internship programs across IT, e-commerce, and business consulting! Apply via our Google Form on the Internship page and complete the Quizzory assessment. It's a great opportunity to work with a growing multi-sector group. Visit our Internship page for details!"
  },
  {
    keywords: ['ceo', 'farook', 'founder', 'leader', 'director', 'head'],
    reply: "Arshith Group is led by our visionary CEO, Farook N, who founded the group and has driven its expansion across IT, e-commerce, and consulting. Under his leadership, Arshith Group has grown into a dynamic multi-sector enterprise since 2019."
  },
  {
    keywords: ['contact', 'reach', 'email', 'phone', 'call', 'message', 'touch'],
    reply: "You can reach Arshith Group through our Contact Us page on this website. Fill in the form and our team will get back to you promptly. We'd love to hear from you!"
  },
  {
    keywords: ['history', 'journey', 'founded', 'year', 'timeline', 'established', 'started', 'when'],
    reply: "Arshith Group's journey: 🏢 2019 — Suntech Solutions founded · 💻 2021 — Arshith Infotech launched · 📈 2023 — Major expansion in IT consulting · 🛒 2025 — Arshith Fresh India Pvt Ltd established · 🚀 2026 — Continuing to grow across all divisions!"
  },
  {
    keywords: ['arshith', 'group', 'company', 'about', 'who', 'what', 'business', 'overview'],
    reply: "Arshith Group is a dynamic multi-sector enterprise operating across three core divisions: Arshith Infotech (IT & software), Arshith Fresh India Pvt Ltd (e-commerce & farm-to-consumer), and Suntech Solutions (business consulting). Founded in 2019, we are committed to innovation and growth!"
  },
];

function getFallbackReply(message) {
  const lower = message.toLowerCase();
  for (const { keywords, reply } of FALLBACK_RESPONSES) {
    if (keywords.some(kw => lower.includes(kw))) return reply;
  }
  return "Welcome to Arshith Group! We operate across IT services (Arshith Infotech), e-commerce (Arshith Fresh), and business consulting (Suntech Solutions). Ask me about our services, internship programs, company history, or how to contact us — I'm happy to help! 😊";
}

// ── Conversational AI Chatbot Endpoint ────────────────────
app.post('/api/chatbot', async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Message is required.' });
  }

  const SYSTEM_INSTRUCTION = `You are AGI (Arshith Groups Intelligence), the official AI intelligence platform for Arshith Group — a professional, friendly, and knowledgeable representative of the company.

COMPANY OVERVIEW:
Arshith Group is a dynamic multi-sector Indian enterprise founded by CEO Farook N. It operates three core business units:

1. ARSHITH INFOTECH
   - IT services, software development, cloud solutions, digital transformation, and technology consulting
   - Serves businesses of all sizes seeking to leverage technology for growth
   - Launched: 2021

2. ARSHITH FRESH INDIA PVT LTD
   - E-commerce platform focused on farm-to-consumer delivery of fresh produce and quality products
   - Mission: bridge the gap between farmers and end consumers using technology
   - Established: 2025
   - Website: arshithfresh.com

3. SUNTECH SOLUTIONS
   - Business consulting and strategic advisory services
   - Provides operational improvements, growth strategies, and management consulting
   - Established: 2019

COMPANY TIMELINE:
- 2019: Suntech Solutions founded
- 2021: Arshith Infotech launched
- 2023: Major IT consulting expansion
- 2025: Arshith Fresh India Pvt Ltd established
- 2026: Continued cross-sector growth

CEO: Farook N — Visionary founder and leader of Arshith Group

INTERNSHIP PROGRAM:
- Available across all three divisions (IT, e-commerce, consulting)
- Apply via Google Form on the website's Internship page
- Candidates complete a Quizzory assessment as part of the selection process
- Great opportunity for students and fresh graduates

YOUR BEHAVIOR RULES:
- Respond ONLY about Arshith Group, its subsidiaries, services, leadership, and programs
- If asked about unrelated topics, politely redirect: "I'm here to help with questions about Arshith Group. What would you like to know about our businesses or services?"
- Keep responses concise — 80 to 150 words unless the user asks for detailed information
- Tone: Professional, warm, and helpful
- Never fabricate phone numbers, email addresses, or specific pricing
- Never claim capabilities you don't have
- Use plain text only — no markdown, no bullet symbols that look bad in chat`;

  // If no Gemini available, go straight to fallback
  if (!googleGenAI) {
    console.warn('⚠️  Gemini not initialised — using fallback for chatbot');
    return res.json({
      success: true,
      reply: getFallbackReply(message),
      powered_by: 'fallback',
    });
  }

  try {
    // Build Gemini conversation contents array
    // Format: [{role:'user', parts:[{text}]}, {role:'model', parts:[{text}]}, ...]
    const contents = history.map(h => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: [{ text: h.text }],
    }));

    // Append the current user message
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await googleGenAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 300,
        temperature: 0.7,
      },
    });

    const reply = response.text?.trim() || getFallbackReply(message);
    console.log(`✅ Chatbot Gemini replied (${reply.length} chars)`);

    return res.json({ success: true, reply, powered_by: 'gemini' });

  } catch (error) {
    const msg = error.message || '';
    console.error('❌ Chatbot Gemini error:', msg);

    const is429 = msg.includes('429') || msg.includes('quota') || msg.includes('rate');
    const is503 = msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('overloaded');

    if (is429 || is503) {
      console.warn('⚠️  Chatbot rate-limited — using fallback');
    }

    // Always return success with fallback so frontend never shows error state
    return res.json({
      success: true,
      reply: getFallbackReply(message),
      powered_by: 'fallback',
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

    if (!googleGenAI) {
      return res.status(503).json({ error: 'AI service is currently unavailable. Please try again in a moment.' });
    }

    const response = await googleGenAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
    });

    const raw = response.text.trim();
    const cleaned = raw.replace(/^```[a-z]*\n?/i, '').replace(/```$/i, '').trim();
    const parsed = JSON.parse(cleaned);
    res.json(parsed);
  } catch (error) {
    console.error('Chart AI error:', error.message);
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

