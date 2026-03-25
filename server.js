// backend/server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// POST endpoint voor chat
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Je bent een directe chatbot die eerlijk antwoord geeft en soms scheldwoorden gebruikt." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    res.json({ bot: data.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ bot: "Er is een fout opgetreden bij het ophalen van een antwoord." });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
