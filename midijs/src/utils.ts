// @ts-ignore
import { Utilities } from "https://cdn.jsdelivr.net/npm/webmidi/dist/esm/webmidi.esm.js";
import { 
    ChordIntervals,
    Notes 
} from "./enums.js";

export const keys: string[] = "cdefgab".toUpperCase().split("");

export function chordNameToKeysArray (chordName: string): string[] {
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


export function noteMusicNameTokey(keyName: string): string {
    
    if (keyName.search(/[#b]/) === -1) {
        return keyName; 
    }

    const oldIndex: number = Notes.indexOf(keyName[0]);

    if (keyName.includes("#")) {
        if (keyName.search(/[BE]/) === -1) {
            return keyName;
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
}


export function noteCodeToKey( noteIndex: number ): string {
    return Notes[noteIndex % 12];
}


export function rndFromArr(arr): any {
    return arr[Math.floor(Math.random() * arr.length)];
}


export function absKeyFromCode(noteCode: number): string {
    return Utilities.toNoteIdentifier(noteCode).replace(/\d/g, "");
}
