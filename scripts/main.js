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

messageInput.addEventListener('keyup', (e)=>
{  
  if (e.key === 'Enter') {
    
    e.preventDefault();
    sendButton.click();
  }
})

sendButton.addEventListener('click', () => {
  const nickname = getSavedUser();
  const message = messageInput.value;
  if (!nickname || !message.trim()){
    sendMessge(nickname,message,getUsernameColor());
    messageInput.value.trim();
    messageInput.value = ""
    return;
  }
  else{
    sendMessge(nickname,message,getUsernameColor());
    messageInput.value.trim();
    messageInput.value = ""
  }
  
});

