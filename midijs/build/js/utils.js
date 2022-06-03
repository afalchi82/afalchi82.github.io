// @ts-ignore
import { Utilities } from "/node_modules/webmidi/dist/esm/webmidi.esm.min.js";
import { Notes } from "./enums.js";
export const keys = "cdefgab".toUpperCase().split("");
export const keyNameToMusicName = (keyName) => {
    if (keyName.search(/[#b]/) === -1) {
        return keyName;
    }
    const oldIndex = Notes.indexOf(keyName[0]);
    if (keyName.includes("#")) {
        if (keyName.search(/[BE]/) === -1) {
            return keyName;
        }
        else {
            const newIndex = oldIndex === (Notes.length - 1) ? 0 : oldIndex + 1;
            return Notes[newIndex];
        }
    }
    if (keyName.includes("b")) {
        const newIndex = oldIndex === 0 ? (Notes.length - 1) : oldIndex - 1;
        const newNote = Notes[newIndex];
        const newNoteWithAccident = keyName.search(/[CF]/) >= 0 ? newNote : `${newNote}#`;
        return newNoteWithAccident;
    }
};
export const noteCodeToKey = (noteIndex) => {
    return Notes[noteIndex % 12];
};
export const rndFromArr = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};
export const toAbsNote = (noteName) => Utilities.toNoteNumber(noteName);
