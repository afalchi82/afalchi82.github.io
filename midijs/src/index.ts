// @ts-ignore
import { WebMidi } from "https://cdn.jsdelivr.net/npm/webmidi/dist/esm/webmidi.esm.js";

// @ts-ignore
import Alpine from "../lib/alpinejs/module.esm.js";

import Dice from "./Dice.js";
import Score from "./Score.js";


// TODO in standby
// Alpine.data("info", () => ({
//     chordName: "",
//     init,
//     log: "stacippa"
// }));
// 
// Alpine.start();



let note: string;
let chordArray: string[];
let played: string[];
let chordName: string;
let success: boolean = false;

const questionEl = document.getElementById("question");
const playedEl = document.getElementById("played");
const logEl = document.getElementById("log");
const scoreEl = document.getElementById("score");
const chordEl = document.getElementById("chord");
const noteEl = document.getElementById("note");

const score = new Score;

function init() {
    WebMidi.enable()
        .then(onEnabled)
        .catch((err) => {
            // alert(err)
        });

}

function onEnabled(): void {

    if (WebMidi.inputs.length < 1) {
        logEl.innerHTML += "No device detected.";
    } else {
        WebMidi.inputs.forEach((device, index) => {
            logEl.innerHTML += `${index}: ${device.name} <br>`;
        });

        newQuestion();

        const mySynth = WebMidi.inputs[0];
        //  const mySynth = WebMidi.getInputByName("TYPE NAME HERE!")

        mySynth.channels[1].addListener("noteon", noteOnHandler);
        mySynth.channels[1].addListener("noteoff", noteOffHandler);

    }

}

function noteOnHandler(e): void {
    played.push(`${e.note.name}${e.note.accidental ? e.note.accidental : ''}`);
    played = [...new Set(played)];

    playedEl.innerHTML = `Played: ${played}`;


    
    if (chordArray.every((r) => played.includes(r))) {
        score.addResult(Date.now(), true);
        logEl.innerHTML = `<p>${e.note.name} <span class="success">Correct!</span></p>`;        
        success = true;   
        
    } else {
        score.addResult(Date.now(), false);
        logEl.innerHTML = `<p>${e.note.name} <span class="error">Error!</span></p>`;
    }
    scoreEl.innerHTML = `${score.getScore().score} (${score.getScore().correct}/${score.getScore().total})`;
}

function noteOffHandler(e): void {
    const playedNoteIndex = played.indexOf(e.note.name);
    played.splice(playedNoteIndex, 1);
    playedEl.innerHTML = `Played: ${played}`;

    if (played.length === 0 && success) {

        setTimeout(() => {
            success = false;
            newQuestion();
        }, 1000);
    }
}

function newQuestion(): void {
    const dice = new Dice();

    score.newQuestion();

    note = dice.root;
    chordArray = dice.chordArray;
    chordName = dice.chordName;
    played = [];

    questionEl.innerHTML = `Find: ${chordArray}`;
    playedEl.innerHTML = `Played: ${played}`;
    noteEl.innerHTML = `Note: ${note}`;
    chordEl.innerHTML = `Chord: ${chordName}`;
    logEl.innerHTML = "";
}


init();