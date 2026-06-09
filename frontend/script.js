let token = localStorage.getItem("token");

if (token) {
  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";
}

async function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPass").value;

  await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  alert("Registered! Now login");
}

async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPass").value;

  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    location.reload();
  } else {
    alert("Login failed");
  }
}

async function sendMsg() {
  const msg = document.getElementById("msg").value;

  if (!msg) return;

  addMsg("user", msg);
  document.getElementById("msg").value = "";

  const res = await fetch("https://ai-chatbot-qaxb.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: msg,
      token: localStorage.getItem("token")
    })
  });

  const data = await res.json();

  addMsg("bot", data.reply);
}

function addMsg(type, text) {
  const chat = document.getElementById("chat");

  const div = document.createElement("div");
  div.classList.add("msg", type);
  div.innerText = text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function logout() {
  localStorage.removeItem("token");
  location.reload();
}