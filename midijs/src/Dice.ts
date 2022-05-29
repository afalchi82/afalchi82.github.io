import { notes } from "./utils.js";

export default class Dice {

  private notes: string[] = notes;
  private root: string;

  constructor() {
    this.root = this.getRndNote();
  }

  private rndIndex(): number {
    return Math.floor(Math.random() * this.notes.length);
  }

  private nextInt(int: number): string {
    const rootIndex: number = this.notes.indexOf(this.root);
    const nextIndex: number = (rootIndex + int) % this.notes.length;
    return this.notes[nextIndex];
  }

  public getRndNote(): string {
    return this.notes[this.rndIndex()];
  }

  public getRndChord(): string[] {
    this.root = this.getRndNote();
    return [this.root, this.nextInt(2), this.nextInt(4)];
  }
}


