import {colors} from "../consts/colors.js"

const randomValueFromList = (list) => list[Math.floor(Math.random() * list.length)];
export const getRandomColor = () => randomValueFromList(colors);
export const getUsernameColor = () => localStorage.getItem("username-color");
export const setUserColor = (color) => localStorage.setItem("username-color", color);
export const isValidColor = (color) => CSS.supports('color',color);
