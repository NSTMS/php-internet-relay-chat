import {getRandomColor, setUserColor} from "./helperImports.js";

export const setUserName = (nickname) => {
    return new Promise((resolve, reject) => {
        (async () => {
            try {
                const response = await fetch('php/usernameExist.php', {
                    method: 'POST', headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }, body: `username=${nickname}`
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const exists = await response.text();
                if (exists === "true") resolve(false);
                else {
                    sessionStorage.setItem('prev-username', getSavedUser());
                    sessionStorage.setItem('username', nickname);
                    resolve(true);
                }
            } catch (err) {
                console.log(err);
                resolve(false);
            }
        })();
    });
}


export const getSavedUser = () => sessionStorage.getItem('username');

export const initializeNewUser = () => {
    let nickname = prompt("Please enter your nickname");
    if (nickname != null) setUserName(nickname).then();
    setUserColor(getRandomColor());
    return nickname;
};