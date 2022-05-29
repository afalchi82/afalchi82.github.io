import { WebMidi } from "/node_modules/webmidi/dist/esm/webmidi.esm.min.js";
import Dice from "./Dice.js";
import Score from "./Score.js";
let chord;
let played;
let chordName;
const questionEl = document.getElementById("question");
const playedEl = document.getElementById("played");
const logEl = document.getElementById("log");
const scoreEl = document.getElementById("score");
const chordEl = document.getElementById("chord");
const score = new Score;
// Enable WebMidi.js and trigger the onEnabled() function when ready
WebMidi.enable()
    .then(onEnabled)
    .catch((err) => {
    // alert(err)
});
function onEnabled() {
    console.log('enabled');
    newQuestion();
    if (WebMidi.inputs.length < 1) {
        logEl.innerHTML += "No device detected.";
    }
    else {
        WebMidi.inputs.forEach((device, index) => {
            logEl.innerHTML += `${index}: ${device.name} <br>`;
        });
    }
    const mySynth = WebMidi.inputs[0];
    // const mySynth = WebMidi.getInputByName("TYPE NAME HERE!")
    mySynth.channels[1].addListener("noteon", noteOnHandler);
    mySynth.channels[1].addListener("noteoff", noteOffHandler);
}
function noteOnHandler(e) {
    played.push(e.note.name);
    played = [...new Set(played)];
    playedEl.innerHTML = `Played: ${played}`;
    if (chord.every((r) => played.includes(r))) {
        logEl.innerHTML = `<p>${e.note.name} <span class="success">Correct!</span></p>`;
        score.addResult(Date.now());
        scoreEl.innerHTML = score.getScore();
        setTimeout(newQuestion, 1000);
    }
    else {
        logEl.innerHTML = `<p>${e.note.name} <span class="error">Error!</span></p>`;
    }
}
function noteOffHandler(e) {
    const playedNoteIndex = played.indexOf(e.note.name);
    played.splice(playedNoteIndex, 1);
    playedEl.innerHTML = `Played: ${played}`;
}
function newQuestion() {
    const dice = new Dice();
    score.newQuestion();
    chord = dice.getRndChord();
    chordName = dice.getRndChordName();
    played = [];
    questionEl.innerHTML = `Find: ${chord}`;
    playedEl.innerHTML = `Played: ${played}`;
    chordEl.innerHTML = `Chord: ${chordName}`;
    logEl.innerHTML = "";
}
