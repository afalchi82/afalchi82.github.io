import { 
  Notes,
  ChordTypes, 
  Alterations
} from "./enums.js";

import {
  chordNameToKeysArray,
  rndFromArr
} from "./utils.js";

type ChordArray = [
  string, 
  string, 
  string, 
];

export default class Dice {

  public root: string;
  public chordName: string;
  public chordArray: string[];

  constructor() {
    this.root = this.getRndNote();
    this.chordName = this.getRndChordName();
    this.chordArray = chordNameToKeysArray(this.chordName);
  }

  public getRndNote(): string {
    return rndFromArr(Notes);
  }

  public getRndNoteWithAccidental(): string {
    return rndFromArr(Notes) + rndFromArr(Alterations);
  }

  public getRndChordName(): string {
    const newChord = `${this.root}${rndFromArr(Alterations)} ${rndFromArr(ChordTypes)}`;
    return newChord;
  }
}
