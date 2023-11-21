import {colors} from "../consts/colors.js"

const randomValueFromList = (list) => list[Math.floor(Math.random() * list.length)];

export const getRandomColor = () => randomValueFromList(colors)
export const getSavedColor = () => localStorage.getItem("color");
export const setUserColor = (color) => localStorage.setItem("color", color);
