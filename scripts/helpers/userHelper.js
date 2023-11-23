import { getRandomColor, setUserColor} from "./helperImports.js";

export const setUserName = (nickname) =>  localStorage.setItem('username', nickname);
export const getSavedUser = () =>  localStorage.getItem('username');

export const initializeNewUser = () =>{
    let nickname = prompt("Please enter your nickname");
    if (nickname != null) setUserName(nickname);
    setUserColor(getRandomColor());
    return nickname;
};