// script.js

async function sendMessage() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const userMessage = input.value.trim();
  if (!userMessage) return;

  chat.innerHTML += `<p><b>Jij:</b> ${userMessage}</p>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    chat.innerHTML += `<p><b>Bot:</b> ${data.bot}</p>`;
    chat.scrollTop = chat.scrollHeight;

  } catch (error) {
    console.error("Fout bij versturen:", error);
    chat.innerHTML += `<p><b>Bot:</b> Er is iets misgegaan bij het ophalen van een antwoord.</p>`;
  }
}

document.getElementById("input").addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});
