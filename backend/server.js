require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());  // Allow frontend to access backend API

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;


app.post('/chat', async (req, res) => {
    try {
        const response = await axios.post(GEMINI_API_URL, {
            contents: [{ role: "user", parts: [{ text: req.body.message }] }]
        });

        // Extract the AI response properly
        const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't understand that.";
        
        res.json({ reply });
    } catch (error) {
        console.error("Error fetching AI response:", error.response?.data || error.message);
        res.status(500).json({ reply: "AI is currently unavailable. Try again later." });
    }
});
