import {longPolling} from "./chat.js"
import { getRandomColor,setUserColor, getSavedUser,initializeNewUser,createElement,getById,getUsernameColor, messageHasCommand,sendMessge} from "./imports.js";

document.onreadystatechange = function(e)
{
    if (document.readyState === 'complete')
    {
        let savedNickname = getSavedUser();
        if(!savedNickname) 
        {
          savedNickname = initializeNewUser();
          setUserColor(getRandomColor())
        }
    }
};


const sendButton = getById('sendButton');
const messageInput = getById('message');

messageInput.addEventListener('keydown', (e)=>
{  
  if (e.key === 'Enter') {
    const nickname = getSavedUser();
    const message = messageInput.value;
    if (nickname && message.trim()){
      sendMessge(nickname,message);
      messageInput.value = null;
    }
  }
})

sendButton.addEventListener('click', () => {
  const nickname = getSavedUser();
  const message = messageInput.value;
  if (!nickname || !message.trim()){
    messageInput.value =null;
    return;
  }
  else{
    sendMessge(nickname,message);
    messageInput.value = null;
  }
  
});

