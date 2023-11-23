import { commands } from "../consts/commands.js";
import { createElement,getById } from "../imports.js";
export const quitChat = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("username-color");
    console.log("nie mam pojęcia jak to ma działać");
    return "you leave room"

}

export const joinChat = (room) =>{
    console.log("nie mam pojęcia jak to ma działać");
    return "joined room " + room
}

export const showAllComands = () =>{
    const chatContainer = getById('chat');
    for(let cmd in commands)
    {
        const newMessage = createElement('div');
        newMessage.classList.add("message");        
        const messageSpan = createElement("span");
        messageSpan.textContent = " --" + commands[cmd];
        newMessage.appendChild(messageSpan);
        chatContainer.appendChild(newMessage);
    }
    return null;
}

export const clearChat = () =>{
    const chatContainer = getById('chat');

    const userMessages = document.querySelectorAll("div.message");
    userMessages.forEach(element => {
        chatContainer.removeChild(element);
    });
    return null;
}