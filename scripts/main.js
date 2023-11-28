import {longPolling} from "./chat.js"
import { getRandomColor,setUserColor, getSavedUser,initializeNewUser,getById,getUsernameColor,sendMessge, trimMessage} from "./imports.js";

document.addEventListener('DOMContentLoaded', function() {
  var elements = document.querySelectorAll('#chat'), el;
  for (var i = 0; i < elements.length, el = elements[i]; i++) {
    if (el.scrollHeight > el.clientHeight) {
      SimpleScrollbar.initEl(el);
    }
  }
  let savedNickname = getSavedUser();
  if(!savedNickname) 
  {
    savedNickname = initializeNewUser();
    setUserColor(getRandomColor())
  }
});


const sendButton = getById('sendButton');
const messageInput = getById('message');

messageInput.addEventListener('keyup', (e)=>
{  
  if (e.key === 'Enter') {
    e.preventDefault();
    sendButton.click();
  }
})

sendButton.addEventListener('click', () => {
  const nickname = getSavedUser();
  const message = trimMessage(messageInput.value);
  if (nickname && message.trim()){
    sendMessge(nickname,message,getUsernameColor());
    messageInput.value.trim();
    messageInput.value = ""
    return;
  }
  else if(!nickname)
  {
    sendMessge("chat","please refresh page","green","rgb(239, 108, 0)",true);
    messageInput.value = ""
  }  
});

