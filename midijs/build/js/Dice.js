export default class Dice {
    notes = "cdefgab".toUpperCase().split("");
    root;
    constructor() {
        this.root = this.getRndNote();
    }
    rndIndex() {
        return Math.floor(Math.random() * this.notes.length);
    }
    nextInt(int) {
        const rootIndex = this.notes.indexOf(this.root);
        const nextIndex = (rootIndex + int) % this.notes.length;
        return this.notes[nextIndex];
    }
    getRndNote() {
        return this.notes[this.rndIndex()];
    }
    getRndChord() {
        this.root = this.getRndNote();
        return [this.root, this.nextInt(2), this.nextInt(4)];
    }
}
