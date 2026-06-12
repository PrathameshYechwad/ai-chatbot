import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 MIDDLEWARE
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// (optional) serve frontend if needed in backend
app.use(express.static(path.join(__dirname, "../frontend")));

// homepage check
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// 🔥 CHAT API
app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    // OpenRouter request
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant."
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://ai-chatbot-qaxb.onrender.com",
          "X-Title": "AI Chatbot"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.error("Backend Error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Server error",
      details: error.response?.data?.error?.message || error.message
    });
  }
});

// 🔥 RENDER PORT FIX
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});