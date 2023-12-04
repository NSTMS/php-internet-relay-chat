export function longPolling() {
    fetch("../php/index.php")
        .then(response => response.text())
        .then(data => {
            // Process the received messages
            if (data) {
                console.log(data);
            }
            longPolling();
        })
        .catch(error => {
            console.error(error);
            setTimeout(longPolling, 1000); // 1 second
        });
}

async function loadMessages() {
    try {
        const response = await fetch('irc.php', {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const messages = await response.json();
        const messageContainer = document.getElementById('messages');
        //clearChat()
        messageContainer.innerHTML = '';
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            // dodaj sendMessage()
            messageContainer.innerHTML += '<p><strong>' + message.username + ':</strong> ' + message.message + '</p>';
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation: ', error);
    }
}

async function sendMessageToDb() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    if (username && message) {
        try {
            const response = await fetch('irc.php', {
                method: 'POST', headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }, body: 'username=' + username + '&message=' + message,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation: ', error);
        }
    }
}
