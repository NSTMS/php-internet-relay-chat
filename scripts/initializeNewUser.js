import { getRandomColor, setUserColor } from "./helpers/colorHelper";
import { setNewUser } from "./helpers/userHelper";

export const initalizeNewUser = () =>{
    let nickname = prompt("Please enter your nickname");
    if (nickname != null) setNewUser(nickname);
    setUserColor(getRandomColor());
}