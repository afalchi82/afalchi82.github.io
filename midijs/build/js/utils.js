import { Notes } from "./enums.js";
export const keys = "cdefgab".toUpperCase().split("");
export const noteCodeToKey = (noteIndex) => {
    return Notes[noteIndex % 12];
};
export const rndFromArr = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};
