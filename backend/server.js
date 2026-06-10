import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// OpenAI setup
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// simple memory (optional)
let chatHistory = [];

// test route (IMPORTANT)
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// chatbot route
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // store user message
    chatHistory.push({ role: "user", content: message });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        ...chatHistory,
      ],
    });

    const reply = response.choices[0].message.content;

    // store assistant reply
    chatHistory.push({ role: "assistant", content: reply });

    res.json({ reply });

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
});

// port setup (VERY IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});