import {getUsernameColor} from "./helpers/colorHelper.js";
import {writeMessage} from "./helpers/messageHelper.js";
import {getSavedUser, setUserName} from "./helpers/userHelper.js";

const bg = "rgb(128, 191, 255)";

loadMessages(Date.now());

export async function loadMessages(lastSync) {
    try {
        const response = await fetch('php/getMessages.php?lastSync=' + lastSync, {
            method: "GET"
        });
        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`)
            setTimeout(async () => await loadMessages(Date.now()), 1000); // 1 second
        }
        const messages = await response.json();
        // console.table(lastSync,messages)
        for (let i = 0; i < messages.length; i++) {
            const isCurrentUser = messages[i].username == getSavedUser();
            const prevUser = sessionStorage.getItem('prev-username') || false;
            let isPrevUser = false;
            if (prevUser) {
                isPrevUser = messages[i].username == prevUser;
                sessionStorage.removeItem('prev-username')
            }
            if (!isCurrentUser && !isPrevUser) writeMessage(messages[i].username, messages[i].message, messages[i].color, bg, true);
        }
        if (messages.length !== 0) lastSync = Date.now();
        setTimeout(async () => await loadMessages(lastSync), 500)
    } catch (error) {
        console.error('There has been a problem with your fetch operation: ', error);
        //setTimeout(async()=>await loadMessages(Date.now()+1000), 1000); // 1 second
    }
}

export async function sendMessageToDb(username, message, color) {
    if (username && message) {
        try {
            const body = `username=${username}&message=${message}&color=${color}`;
            const response = await fetch('php/sendMessage.php', {
                method: 'POST', headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }, body: body
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation: ', error);
        }
    }
}


// remove old messages from database

async function removeOldMessages() {
    try {

    } catch (error) {
        console.error('There has been a problem with your fetch operation: ', error);
    }
}

