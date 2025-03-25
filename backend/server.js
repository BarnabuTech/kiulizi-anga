const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());  // Allow frontend to access backend API

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log('Environment variables loaded:', {
    GEMINI_API_KEY: GEMINI_API_KEY ? `${GEMINI_API_KEY.slice(0, 4)}...${GEMINI_API_KEY.slice(-4)}` : 'not set',
    PORT: process.env.PORT
});

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Kiulizi Anga API' });
});

app.post('/chat', async (req, res) => {
    try {
        console.log('Sending request to Gemini API...');
        const response = await axios.post(GEMINI_API_URL, {
            contents: [{
                parts: [{
                    text: req.body.message
                }]
            }]
        });

        console.log('Received response from Gemini API:', response.data);
        const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't understand that.";
        
        res.json({ reply });
    } catch (error) {
        console.error("Error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        res.status(500).json({ reply: "AI is currently unavailable. Try again later." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
