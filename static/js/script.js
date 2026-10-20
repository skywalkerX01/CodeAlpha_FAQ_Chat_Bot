const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const clearBtn = document.getElementById("clear-chat");
const copyBtn = document.getElementById("copy-last");
const voiceBtn = document.getElementById("voice-btn");
const toast = document.getElementById("toast");

// Add a message to the chat
function addMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.textContent = sender === "bot" ? "Bot" : "You";

  if (sender === "bot" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  }

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.textContent = message;

  const time = document.createElement("small");
  time.classList.add("timestamp");
  time.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const content = document.createElement("div");
  content.classList.add("message-content");
  content.appendChild(bubble);
  content.appendChild(time);

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  localStorage.setItem("chatHistory", chatBox.innerHTML);
}

// Typing Indicator
function showTyping() {
  if (document.getElementById("typing-indicator")) return;
  const typing = document.createElement("div");
  typing.classList.add("message", "bot");
  typing.id = "typing-indicator";
  typing.innerHTML = `
        <div class="avatar">Bot</div>
        <div class="bubble typing">Typing...</div>
    `;
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}
function hideTyping() {
  const typing = document.getElementById("typing-indicator");
  if (typing) typing.remove();
}

// Send message
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  userInput.value = "";
  try {
    showTyping();
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 900));
    hideTyping();
    addMessage(data.reply, "bot");
  } catch (error) {
    hideTyping();
    addMessage("Something went wrong.", "bot");
    console.error(error);
  }
}

// Button click
sendBtn.addEventListener("click", sendMessage);

// Press Enter
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && userInput.value.trim() !== "") {
    sendMessage();
  }
});

// Clear chat
clearBtn.addEventListener("click", function () {
  chatBox.innerHTML = "";
  localStorage.removeItem("chatHistory");
  addMessage("Hello! Ask me anything about our services.", "bot");
});

// Copy Button
copyBtn.addEventListener("click", async () => {
  try {
    const replies = document.querySelectorAll(".message.bot .bubble");
    if (replies.length === 0) return;
    const lastReply = replies[replies.length - 1].textContent;
    await navigator.clipboard.writeText(lastReply);
    showToast("Copied to clipboard");
  } catch (err) {
    showToast("Failed to copy");
    console.error(err);
  }
});

// Voice Button
if ("webkitSpeechRecognition" in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceBtn.addEventListener("click", () => {
    recognition.start();
    showToast("Listening...");
  });

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.trim();
    if (!transcript) return;
    userInput.value = transcript;
    sendMessage();
  };
} else {
  voiceBtn.style.display = "none";
}

window.addEventListener("load", () => {
  const history = localStorage.getItem("chatHistory");
  if (history) {
    chatBox.innerHTML = history;
  } else {
    addMessage("Hello! Ask me anything about our services.", "bot");
  }
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}
