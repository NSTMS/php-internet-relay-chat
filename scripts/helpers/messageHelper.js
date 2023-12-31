import {
    getSavedUser,
    isValidColor,
    showAllComands,
    setUserName,
    getById,
    createElement,
    getUsernameColor,
    clearChat,
    setUserColor,
    showMessagesCounter
} from "./helperImports.js"
import {commands} from "../consts/commands.js";
import {sendMessageToDb} from "../chat.js";

export const messageHasCommand = (message) => {
    const splitted = message.split(" ");
    if (!splitted || splitted.length <= 0) return null;
    const command = splitted[0].toUpperCase();
    const query = splitted[1];
    const takesQuery = ["/NICK", "/COLOR"]

    if ((takesQuery.includes(command) && query == null) || !Object.keys(commands).includes(command)) return null;
    const sys = "chat";
    const color = "#80bfff"; //rgb(239, 108, 0)
    const bg = "#80bfff";
    switch (command) {
        case "/CHAT":
            return writeMessage(sys, `yo, whazzup?`, color, bg, true);
        case "/NICK":
            const nick = separateNick(splitted);
            setUserName(nick).then(res => {
                if (res) {
                    return writeMessage(sys, `nick changed to ${nick}`, color, bg, true, -1, true);
                } else {
                    return writeMessage(sys, "provided nick is used by another user", color, bg, true);
                }
            });
            break;
        case "/ME":
            return writeMessage(sys, `your are ${getSavedUser()} and your color is ${getUsernameColor()}`, color, bg, true);
        case "/COLOR":
            if (isValidColor(query)) {
                setUserColor(query)
                return writeMessage(sys, `color changed to: ${getUsernameColor()}`, color, bg, true);
            }
            return writeMessage(sys, `invalid color value`, color, bg, true);
        case "/CLEAR":
        case "/CLS":
            return clearChat();
        case "/COMMANDS":
            return showAllComands();
        case "/HELP":
            return writeMessage(sys, "you jokin', there is no help for you", color, bg, true);
        case "/COUNTER":
            return writeMessage(sys, `there are ${showMessagesCounter()} messages in this chat`, color, bg, true);
        default:
            return null;
    }
}


export const writeMessage = (nickname, message, color, bg = "#eceff4", isChat = false, counter = -1, changingNick = false) => {
    const chatContainer = getById('chat');
    const newMessage = createElement('div');
    if (isChat) newMessage.classList.add("user");
    newMessage.classList.add("message");
    const messageSpan = createElement("span");
    messageSpan.style.backgroundColor = bg;
    messageSpan.classList.add("message-content");
    messageSpan.textContent = message;

    if (counter == -1) {
        const nickNameSpan = createElement("span");
        nickNameSpan.style.color = color;
        nickNameSpan.classList.add("nick");
        nickNameSpan.textContent = nickname;
        newMessage.appendChild(nickNameSpan);
    }
    newMessage.appendChild(messageSpan);
    chatContainer.appendChild(newMessage);

    let content = null
    if (!isChat) content = messageHasCommand(message)
    if (content) {
        const commandMessage = createElement('div');
        const contentSpan = createElement("span");
        contentSpan.textContent = content;
        commandMessage.appendChild(contentSpan);
        chatContainer.appendChild(commandMessage);
    }
    scrollToBottom(chatContainer);
    // if (changingNick) $('.message-content').unemoticonize();
    $('.message-content').emoticonize();
}

export const trimMessage = (message) => {
    let copy = message;
    if (copy[copy.length - 1] === "\n") copy = copy.slice(0, -1);
    return copy;
}

const scrollToBottom = (chatContainer) => chatContainer.scrollTop = chatContainer.scrollHeight;

const separateNick = (splitted) => {
    let nick = "";
    for (let i = 1; i < splitted.length; i++) nick += splitted[i] + " "
    return nick.slice(0, -1)
}