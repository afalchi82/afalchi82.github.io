import { Notes } from "./enums.js";

export const keys: string[] = "cdefgab".toUpperCase().split("");

export const noteCodeToKey = ( noteIndex: number ): string => {
    return Notes[noteIndex % 12];
};

export const rndFromArr = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}