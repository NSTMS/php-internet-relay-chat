import {getSavedUser, isValidColor,joinChat, showAllComands,quitChat,setUserName,getById,createElement,getUsernameColor,clearChat, setUserColor} from "./helperImports.js"
import { commands } from "../consts/commands.js";
export const messageHasCommand = (message) =>{

    const splitted = message.split(" "); 
    if(splitted.length <=0)return null;
    const command = splitted[0];
    const query = splitted[1];

    const takesQuery = ["/NICK", "/COLOR", "/JOIN"]

    if((takesQuery.includes(command) && query == null) || !Object.keys(commands).includes(command)) return null;
    const sys = "chat";
    const color = "green";
    switch(command)
    {

        case "/NICK":
            setUserName(query);
            return sendMessge(sys,"nick changed to " + query, color);
        case "/ME":
            return sendMessge(sys,getSavedUser(),color);
        case "/QUIT":
            return quitChat();
        case "/JOIN":
            return sendMessge(sys, joinChat(query), color);
        case "/COLOR":
            if(isValidColor(query)) return sendMessge(sys,setUserColor(query),color);
            return null;
        case "/CLEAR":
        case "/CLS":
            return clearChat();
        case "/COMMANDS":
            return showAllComands();
        case "/HELP":
            return sendMessge(sys,"you jokin' there is no help for you", color);
        default:
            return null;
    }
} 


export const sendMessge = (nickname, message, color) =>{
    const chatContainer = getById('chat');

    const newMessage = createElement('div');
    newMessage.classList.add("message");
    const nickNameSpan = createElement("span");
    nickNameSpan.style.color = color
    nickNameSpan.classList.add("nick");
    nickNameSpan.textContent = nickname;
    const messageSpan = createElement("span");
    messageSpan.textContent = " : " + message;
    newMessage.appendChild(nickNameSpan);
    newMessage.appendChild(messageSpan);
    chatContainer.appendChild(newMessage);
  
    const content = messageHasCommand(message)
    if(content)
    {
      const commandMessage = createElement('div');
      const contentSpan = createElement("span");
      contentSpan.textContent = content;
      commandMessage.appendChild(contentSpan);
      chatContainer.appendChild(commandMessage);
    }
  }

export const trimMessage =(message) =>{
    
}