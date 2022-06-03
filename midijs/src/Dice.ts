import { 
  Notes,
  ChordTypes, 
  Alterations
} from "./enums.js";

import {
  rndFromArr
} from "./utils.js";

type ChordArray = [
  string, 
  string, 
  string, 
];

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

  public getRndChord(): ChordArray {
    this.root = this.getRndNote();
    return [this.root, this.nextInt(2), this.nextInt(4)];
  }

  public getRndChordName(): string {
    const newChord = rndFromArr(Notes) + rndFromArr(Alterations) + rndFromArr(ChordTypes);
    return newChord;
  }

  public getRndChord2(): object {
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