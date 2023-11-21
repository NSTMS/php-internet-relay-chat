import {longPolling} from "./chat.js"
import { getRandomColor } from "./helpers/colorHelper.js";


window.addEventListener("load", (event) => {
  //longPolling();
});

const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('message');
const chatContainer = document.getElementById('chat');

sendButton.addEventListener('click', () => {
  const nickname = localStorage.getItem("nickname")
  const message = messageInput.value;

  if (nickname && message) {
    const newMessage = document.createElement('div');
    newMessage.classList.add("message");

    const nickNameSpan = document.createElement("span");
    nickNameSpan.style.color = getRandomColor()
    nickNameSpan.textContent = nickname;
    
    const messageSpan = document.createElement("span");
    messageSpan.textContent = " : " + message;
    
    newMessage.appendChild(nickNameSpan);
    newMessage.appendChild(messageSpan);
    chatContainer.appendChild(newMessage);

    // Clear input fields
    messageInput.value = '';
  }
});

