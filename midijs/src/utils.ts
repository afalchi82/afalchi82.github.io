// @ts-ignore
import { Utilities } from "/node_modules/webmidi/dist/esm/webmidi.esm.min.js";
import { Notes } from "./enums.js";

export const keys: string[] = "cdefgab".toUpperCase().split("");

export const keyNameToMusicName = (keyName: string): string => {
    
    if (keyName.search(/[#b]/) === -1) {
        return keyName;
    }

    const oldIndex: number = Notes.indexOf(keyName[0]);

    if (keyName.includes("#")) {
        if (keyName.search(/[BE]/) === -1) {
            return keyName
        } else {
            const newIndex: number = oldIndex === (Notes.length - 1) ? 0 : oldIndex + 1;
            return Notes[newIndex];
        }
    }

    if (keyName.includes("b")) {
        const newIndex: number = oldIndex === 0 ? (Notes.length - 1) : oldIndex - 1;
        const newNote: string = Notes[newIndex];
        const newNoteWithAccident: string = keyName.search(/[CF]/) >= 0 ? newNote : `${ newNote }#`;
        return newNoteWithAccident;
    }
};

export const noteCodeToKey = ( noteIndex: number ): string => {
    return Notes[noteIndex % 12];
};

export const rndFromArr = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

export const toAbsNote = (noteName: string): number => Utilities.toNoteNumber(noteName);