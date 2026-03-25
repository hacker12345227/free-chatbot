import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Je bent een bot die direct en vrij praat.",
          },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await openaiResponse.json();
    const botReply = data.choices[0].message.content || "Geen antwoord.";

    res.json({ bot: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ bot: "Er ging iets mis." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend draait op port ${port}`));
