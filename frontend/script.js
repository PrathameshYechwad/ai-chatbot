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
    // call backend
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    // show bot reply
    const botMsg = document.createElement("div");
    botMsg.className = "bot";
    botMsg.innerText = "AI: " + data.reply;
    chatBox.appendChild(botMsg);

    // auto scroll
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    const errMsg = document.createElement("div");
    errMsg.className = "bot";
    errMsg.innerText = "Error: Server not responding";
    chatBox.appendChild(errMsg);
  }
}

// optional: send on Enter key
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});