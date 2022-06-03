import { 
  Notes,
  ChordTypes, 
  Alterations
} from "./enums.js";

import {
  rndFromArr
} from "./utils.js";

export default class Dice {

  private notes: string[] = Notes;
  private root: string;

  constructor() {
    this.root = this.getRndNote();
  }

  private nextInt(int: number): string {
    const rootIndex: number = this.notes.indexOf(this.root);
    const nextIndex: number = (rootIndex + int) % this.notes.length;
    return this.notes[nextIndex];
  }

  public getRndNote(): string {
    return rndFromArr(this.notes);
  }

  public getRndNoteWithAccidental(): string {
    return rndFromArr(Notes) + rndFromArr(Alterations);
  }

  public getRndChord(): string[] {
    this.root = this.getRndNote();
    return [this.root, this.nextInt(2), this.nextInt(4)];
  }

  public getRndChordName(): string {
    const newChord = rndFromArr(Notes) + rndFromArr(Alterations) + rndFromArr(ChordTypes);
    return newChord;
  }
}


