import { commands } from "../consts/commands.js";
import { createElement,getById, sendMessge } from "../imports.js";
export const quitChat = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("username-color");
    console.log("nie mam pojęcia jak to ma działać");
    window.close();
    return "you leave room"

}

export const joinChat = (room) =>{
    console.log("nie mam pojęcia jak to ma działać");
    return "joined room " + room
}

export const showAllComands = () =>{
    for(let cmd in commands)
    {
        sendMessge('chat',cmd + " - " + commands[cmd], 'green','rgb(239, 108, 0)', true);
    }
    return null;
}

export const showMessagesCounter = () => {
    const userMessages = document.querySelectorAll("div.message");
    return userMessages.length;
}

export const clearChat = () =>{
    const chatContainer = getById('chat');

    const userMessages = document.querySelectorAll("div.message");
    userMessages.forEach(element => {
        chatContainer.removeChild(element);
    });
    return null;
}