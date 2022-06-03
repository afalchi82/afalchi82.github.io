import { Notes, ChordTypes, Alterations } from "./enums.js";
import { rndFromArr } from "./utils.js";
export default class Dice {
    notes = Notes;
    root;
    constructor() {
        this.root = this.getRndNote();
    }
    nextInt(int) {
        const rootIndex = this.notes.indexOf(this.root);
        const nextIndex = (rootIndex + int) % this.notes.length;
        return this.notes[nextIndex];
    }
    getRndNote() {
        return rndFromArr(this.notes);
    }
    getRndNoteWithAccidental() {
        return rndFromArr(Notes) + rndFromArr(Alterations);
    }
    getRndChord() {
        this.root = this.getRndNote();
        return [this.root, this.nextInt(2), this.nextInt(4)];
    }
    getRndChordName() {
        const newChord = rndFromArr(Notes) + rndFromArr(Alterations) + rndFromArr(ChordTypes);
        return newChord;
    }
    getRndChord2() {
        const rootIndex = Math.floor(Math.random() * 12);
        return {
            root: {
                index: rootIndex,
                name: Notes[rootIndex]
            }
        };
    }
}
/**
 * get note index 0-11
 * get accidental
 * get chord type
 *
 *
 *
 *
 */ 
