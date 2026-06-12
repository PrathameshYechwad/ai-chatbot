const BACKEND_URL = "https://ai-chatbot-qaxb.onrender.com";

async function sendMessage() {
  const inputBox = document.getElementById("message");
  const chatBox = document.getElementById("chat-box");

  const message = inputBox.value.trim();
  if (!message) return;

  // show user message
  const userMsg = document.createElement("div");
  userMsg.className = "user";
  userMsg.innerText = "You: " + message;
  chatBox.appendChild(userMsg);

  inputBox.value = "";

  try {
    const res = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    const botMsg = document.createElement("div");
    botMsg.className = "bot";

    botMsg.innerText = data.reply
      ? "AI: " + data.reply
      : "Error: " + (data.error || "No response");

    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    const errMsg = document.createElement("div");
    errMsg.className = "bot";
    errMsg.innerText = "Error: Server not responding";
    chatBox.appendChild(errMsg);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});