import { Notes, ChordTypes, Alterations } from "./enums.js";
import { chordNameToKeysArray, rndFromArr } from "./utils.js";
export default class Dice {
    root;
    chordName;
    chordArray;
    constructor() {
        this.root = this.getRndNote();
        this.chordName = this.getRndChordName();
        this.chordArray = chordNameToKeysArray(this.chordName);
    }
    getRndNote() {
        return rndFromArr(Notes);
    }
    getRndNoteWithAccidental() {
        return rndFromArr(Notes) + rndFromArr(Alterations);
    }
    getRndChordName() {
        const newChord = `${this.root}${rndFromArr(Alterations)} ${rndFromArr(ChordTypes)}`;
        return newChord;
    }
}
