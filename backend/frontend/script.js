async function sendMessage() {
  const inputBox = document.getElementById("message");
  const chatBox = document.getElementById("chat-box");

  const message = inputBox.value.trim();

  if (!message) return;

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.className = "user";
  userMsg.innerText = "You: " + message;
  chatBox.appendChild(userMsg);

  inputBox.value = "";

  try {
    // Call backend
    const res = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    // Show bot reply
    const botMsg = document.createElement("div");
    botMsg.className = "bot";

    if (data.reply) {
      botMsg.innerText = "AI: " + data.reply;
    } else {
      botMsg.innerText = "Error: " + (data.error || "Unknown error");
    }

    chatBox.appendChild(botMsg);

    // Auto scroll
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    const errMsg = document.createElement("div");
    errMsg.className = "bot";
    errMsg.innerText = "Error: Server not responding";
    chatBox.appendChild(errMsg);
  }
}

// Send on Enter key
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});