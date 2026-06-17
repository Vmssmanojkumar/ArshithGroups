const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Contact = require('./models/Contact');
require('dotenv').config();

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

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
