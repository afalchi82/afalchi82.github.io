console.clear();

class Dice {
  constructor() {
    this.notes = "cdefgab".toUpperCase().split("");
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

const note = "C";
let chord;
const questionEl = document.getElementById("question");
const playedEl = document.getElementById("played");
const logEl = document.getElementById("log");
let played = [];

// Enable WebMidi.js and trigger the onEnabled() function when ready
WebMidi.enable()
  .then(onEnabled)
  .catch((err) => {
    // alert(err)
  });
function onEnabled() {
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
    console.log(e);
    // Release
    if (e.note.attack > 0) {
      played.push(e.note.name);
      played = [...new Set(played)];
      playedEl.innerHTML = `Played: ${played}`;
      // document.body.innerHTML = `
      //   <pre>${ JSON.stringify(e.note, null, 2) }</pre>
      //   <br>
      //   ${ document.body.innerHTML }
      // `;
      if (chord.every((r) => played.includes(r))) {
        logEl.innerHTML = `<p>${e.note.name} <span class="success">Correct!</span></p>`;
        setTimeout(newQuestion, 1000);
      } else {
        logEl.innerHTML = `<p>${e.note.name} <span class="error">Error!</span></p>`;
      }
    } else {
      const playedNoteIndex = played.indexOf(e.note.name);
      played.splice(playedNoteIndex, 1);
      playedEl.innerHTML = `Played: ${played}`;
    }
    // if (chord.includes(e.note.name)) {
    //   logEl.innerHTML = `<p>${e.note.name} <span class="success">Correct!</span></p>`;
    // } else {
    //   logEl.innerHTML = `<p>${e.note.name} <span class="error">Error!</span></p>`;
    // }
    //document.body.innerHTML += `<br> <pre>${ e.note.name   }${ e.note.octave }</pre>`;
  });
}



function newQuestion() {
  const dice = new Dice();
  chord = dice.getRndChord();
  played = [];
  questionEl.innerHTML = `Find: ${chord}`;
  playedEl.innerHTML = `Played: ${played}`;
  logEl.innerHTML = "";
}
