// import { WebMidi } from "webmidi";
import Dice from "./Dice.js";

console.clear();

const note = "C";
let chord;
const questionEl = document.getElementById("question");
const playedEl = document.getElementById("played");
const logEl = document.getElementById("log");
let played = [];


const dice = new Dice();

console.log(dice.getRndNote())