import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Chat endpoint
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${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}`,
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
    res.status(500).json({ bot: "Er ging iets mis." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend draait op port ${PORT}`));
