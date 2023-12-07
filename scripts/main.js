import { getRandomColor,setUserColor, getSavedUser,initializeNewUser,getById,getUsernameColor,writeMessage, trimMessage} from "./imports.js";
import {sendMessageToDb} from "./chat.js";

//TO DO:
// remove old messages
// check if user is avalible


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
    initializeNewUser();
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
    writeMessage(nickname,message,getUsernameColor());

      (async ()=>{await sendMessageToDb(nickname, message, getUsernameColor())})();
  }
  else if(!nickname)
  {
    writeMessage("chat","please refresh page","green","rgb(239, 108, 0)",true);
  }
  messageInput.value = ""

});

