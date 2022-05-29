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
    getRndChord() {
        this.root = this.getRndNote();
        return [this.root, this.nextInt(2), this.nextInt(4)];
    }
    getRndChordName() {
        const newChord = rndFromArr(Notes) + rndFromArr(ChordTypes) + rndFromArr(Alterations);
        return newChord;
    }
}
