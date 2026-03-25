async function sendMessage() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const userMessage = input.value;
  chat.innerHTML += `<p><b>Jij:</b> ${userMessage}</p>`;

  input.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Je bent een directe chatbot. Je praat normaal, gebruikt soms scheldwoorden en bent niet overdreven braaf."
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    })
  });

  const data = await response.json();
  const botMessage = data.choices[0].message.content;

  chat.innerHTML += `<p><b>Bot:</b> ${botMessage}</p>`;
}
