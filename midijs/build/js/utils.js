// @ts-ignore
import { Utilities } from "https://cdn.jsdelivr.net/npm/webmidi/dist/esm/webmidi.esm.js";
import { ChordIntervals, Notes } from "./enums.js";
export const keys = "cdefgab".toUpperCase().split("");
export function chordNameToKeysArray(chordName) {
    const defaultOctave = 4;
    // Transform root note to key
    const rootKey = noteMusicNameTokey(chordName.split(" ")[0]);
    // Get code number from key
    const rootCode = Utilities.toNoteNumber(rootKey + defaultOctave);
    const chordType = chordName.split(" ")[1];
    return [
        rootKey,
        absKeyFromCode(rootCode + ChordIntervals[chordType][0]),
        absKeyFromCode(rootCode + ChordIntervals[chordType][1]),
    ];
}
export function noteMusicNameTokey(keyName) {
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
}
export function noteCodeToKey(noteIndex) {
    return Notes[noteIndex % 12];
}
export function rndFromArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
export function absKeyFromCode(noteCode) {
    return Utilities.toNoteIdentifier(noteCode).replace(/\d/g, "");
}
