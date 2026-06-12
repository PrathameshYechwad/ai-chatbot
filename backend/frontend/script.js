const BACKEND_URL = "https://ai-chatbot-qaxb.onrender.com";

async function sendMessage() {
  const inputBox = document.getElementById("message");
  const chatBox = document.getElementById("chat-box");

  const message = inputBox.value.trim();
  if (!message) return;

  chatBox.innerHTML += `<div class="user">You: ${message}</div>`;
  inputBox.value = "";

  try {
    const res = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    chatBox.innerHTML += `<div class="bot">AI: ${data.reply || data.error}</div>`;

  } catch (err) {
    chatBox.innerHTML += `<div class="bot">Error: Server not responding</div>`;
  }
}