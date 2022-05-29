import { WebMidi } from "/node_modules/webmidi/dist/esm/webmidi.esm.min.js";
import Dice from "./Dice.js";

let chord: string[];
let played: string[];

const questionEl = document.getElementById("question");
const playedEl = document.getElementById("played");
const logEl = document.getElementById("log");

// Enable WebMidi.js and trigger the onEnabled() function when ready
WebMidi.enable()
  .then(onEnabled)
  .catch((err) => {
    // alert(err)
  });

function onEnabled(): void {
  newQuestion();

  if (WebMidi.inputs.length < 1) {
    logEl.innerHTML += "No device detected.";
  } else {
    WebMidi.inputs.forEach((device, index) => {
      logEl.innerHTML += `${index}: ${device.name} <br>`;
    });
  }

  const mySynth = WebMidi.inputs[0];
  // const mySynth = WebMidi.getInputByName("TYPE NAME HERE!")

  mySynth.channels[1].addListener("noteon", (e) => {
    console.log(e.note);

    played.push(e.note.name);
    played = [...new Set(played)];

    playedEl.innerHTML = `Played: ${played}`;

    if (chord.every((r) => played.includes(r))) {
      logEl.innerHTML = `<p>${e.note.name} <span class="success">Correct!</span></p>`;
      setTimeout(newQuestion, 1000);
    } else {
      logEl.innerHTML = `<p>${e.note.name} <span class="error">Error!</span></p>`;
    }
    
  });

  mySynth.channels[1].addListener("noteoff", (e) => {
    console.log(e.note);

    const playedNoteIndex = played.indexOf(e.note.name);
    played.splice(playedNoteIndex, 1);
    playedEl.innerHTML = `Played: ${played}`;
  });
}

function newQuestion(): void {
  const dice = new Dice();

  chord = dice.getRndChord();
  played = [];
  questionEl.innerHTML = `Find: ${chord}`;
  playedEl.innerHTML = `Played: ${played}`;
  logEl.innerHTML = "";
}
