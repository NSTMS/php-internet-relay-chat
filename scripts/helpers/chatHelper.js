import { commands } from "../consts/commands.js";
import { createElement,getById, writeMessage } from "../imports.js";
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
    //rgb(239, 108, 0)
    let help = -1;
    for(let cmd in commands)
    {
        writeMessage('chat',cmd + " - " + commands[cmd], '#80bfff','#80bfff', true,help);
        if(help == -1) help = 0; 
        
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