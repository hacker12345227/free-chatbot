async function sendMessage() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");
  const message = input.value.trim();
  if (!message) return;

  chat.innerHTML += `<p><b>Jij:</b> ${message}</p>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    const resp = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await resp.json();
    chat.innerHTML += `<p><b>Bot:</b> ${data.bot}</p>`;
    chat.scrollTop = chat.scrollHeight;
  } catch (err) {
    chat.innerHTML += `<p><b>Bot:</b> Fout bij laden.</p>`;
  }
}
