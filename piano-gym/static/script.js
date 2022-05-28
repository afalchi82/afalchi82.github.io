
"use strict";
// https://marcgg.com/blog/2016/11/01/javascript-audio/
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
console.clear();
const data = {
    notes: ["C", "D", "E", "F", "G", "A", "B"],
    alterations: ["", "#", "♭"],
    modes: ["", "m", "aug", "dim"],
    inversions: ["", "6", "4/3"],
};
const notes = [
    ["C", 130.8, 261.6],
    ["D", 146.8, 293.7],
    ["E", 164.8, 329.6],
    ["F", 174.6, 349.2],
    ["G", 196.0, 392.0],
    ["A", 220.0, 440.0],
    ["B", 233.1, 466.2],
];
const alterations = ["", "#", "♭"];
const freq = `
16.35	17.32	18.35	19.45	20.60	21.83	23.12	24.50	25.96	27.50	29.14	30.87
32.70	34.65	36.71	38.89	41.20	43.65	46.25	49.00	51.91	55.00	58.27	61.74
65.41	69.30	73.42	77.78	82.41	87.31	92.50	98.00	103.8	110.0	116.5	123.5
130.8	138.6	146.8	155.6	164.8	174.6	185.0	196.0	207.7	220.0	233.1	246.9
261.6	277.2	293.7	311.1	329.6	349.2	370.0	392.0	415.3	440.0	466.2	493.9
523.3	554.4	587.3	622.3	659.3	698.5	740.0	784.0	830.6	880.0	932.3	987.8
1047	1109	1175	1245	1319	1397	1480	1568	1661	1760	1865	1976
2093	2217	2349	2489	2637	2794	2960	3136	3322	3520	3729	3951
4186	4435	4699	4978	5274	5588	5920	6272	6645	7040	7459	7902
`;
const modes = ["", "m", "aug", "dim"];
const inversions = ["3/5", "6", "4/3"];
const context = new AudioContext();
const buttonPlay = document.getElementById("button-play");
const buttonStop = document.getElementById("button-stop");
const inputTempo = document.getElementById("tempo");
const inputTicks = document.getElementById("ticks");
const inversionsEl = document.getElementById("inversions");
const beatsEl = document.getElementById("beats");
const optionsEl = document.getElementById("options");
const currentEl = document.getElementById("current");
const beatBallsEl = document.querySelector('.beats-balls');


const nextEl = document.getElementById("next");
let init;
let oscillator;
let current = {
    note: getRandom(notes),
    mode: getRandom(modes),
    inversion: getRandom(inversions),
    tempo: inputTempo.value,
    ticks: inputTicks.value,
    tick: 1,
};
let next = {
    note: undefined,
    mode: undefined,
};
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function pickNote() {
    return getRandom(notes);
}
function pickMode() {
    return getRandom(modes);
}
function pickScale() {
    return {
        note: pickNote(),
        mode: pickMode(),
    };
}
// sound
function playSound(note = 1) {
    oscillator = context.createOscillator();
    const gainNode = context.createGain();
    gainNode.gain.value = 1;
    oscillator.connect(gainNode);
    oscillator.type = "sine"; //"triangle"
    gainNode.connect(context.destination);
    oscillator.start(0);
    var frequency = 220 * note;
    oscillator.frequency.value = frequency;
    gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        context.currentTime + 0.25
    );
    // o.stop(1);
}
function stopSound() {
    oscillator.stop();
}
function getFilteredOption(option) {
    const elem = document.getElementById(option);
    const filteredOptions = [...elem.selectedOptions].map((item) =>
        item ? item.value : []
    );
    return filteredOptions;
}
function start() {
    return setInterval(() => {
        oscillator && oscillator.stop();

        beatBallsEl.innerText = "🔴 ".repeat(current.tick);


        if (current.tick % current.ticks === 1) {
            current.note =
                next.note !== undefined
                    ? next.note
                    : getRandom(getFilteredOption("notes"));
            current.alteration =
                next.alteration !== undefined
                    ? next.alteration
                    : getRandom(getFilteredOption("alterations"));
            current.mode =
                next.mode !== undefined
                    ? next.mode
                    : getRandom(getFilteredOption("modes"));
            current.inversion =
                next.inversion !== undefined
                    ? next.inversion
                    : getRandom(getFilteredOption("inversions"));
            next.note = getRandom(getFilteredOption("notes"));
            next.alteration = getRandom(getFilteredOption("alterations"));
            next.mode = getRandom(getFilteredOption("modes"));
            next.inversion = getRandom(getFilteredOption("inversions"));
            console.table(current.inversion);



            currentEl.innerHTML =
                `${current.note[0]}${current.alteration} ${current.mode}` +
                (current.inversion ? `<sup>${current.inversion}</sup>` : "");
            currentEl.classList.add("animation-current");
            nextEl.innerHTML =
                `${next.note[0]}${next.alteration} ${next.mode}` +
                (next.inversion ? `<sup>${next.inversion}</sup>` : "");
            nextEl.classList.remove("animation-next");
            setTimeout(() => {
                document.body.style.backgroundColor = getPageBG(current.note[0], current.alteration);
                nextEl.classList.add("animation-next");
            }, 400);
            playSound(2);
        } else {
            currentEl.classList.remove("animation-current");
            playSound(1);
        }
        beatsEl.innerText = current.tick;
        current.tick < current.ticks ? current.tick++ : (current.tick = 1);
    }, current.tempo);
}

buttonPlay.addEventListener("click", function () {
    init = start();
    buttonPlay.style.display = "none";
    buttonStop.style.display = "inline";
});

buttonStop.addEventListener("click", function () {
    clearInterval(init);
    buttonPlay.style.display = "inline";
    buttonStop.style.display = "none";
});

inputTempo.addEventListener("change", function () {
    clearInterval(init);
    current.tempo = inputTempo.value;
    init = start();
});

inputTicks.addEventListener("change", function () {
    clearInterval(init);
    current.ticks = inputTicks.value;
    init = start();
});

function createOptions() {
    const types = ["notes", "alterations", "modes", "inversions"];
    types.forEach((type) => {
        const label = document.createElement("label");
        label.setAttribute("for", type);
        label.innerText = type;
        const select = document.createElement("select");
        select.setAttribute("name", type);
        select.setAttribute("id", type);
        select.setAttribute("multiple", "multiple");
        data[type].forEach((item) => {
            const option = document.createElement("option");
            option.setAttribute("value", item);
            option.setAttribute("selected", "selected");
            option.innerText = item;
            select.appendChild(option);
        });
        label.appendChild(select);
        optionsEl.appendChild(label);
    });
}

function getPageBG(note, alt) {
    const index = data.notes.indexOf(note);
    const hueSlice = (360 / notes.length);
    const altMod = (function () {
        let res = 0;
        alt === data.alterations[1] ?
            res = hueSlice / 2 :
            null;
        alt === data.alterations[1] ?
            res = -(hueSlice / 2) :
            null;

        return res;
    }());

    
    const hue = (hueSlice * index) + altMod;
    
    return `hsl(${ hue }deg, 50%, 50%)`;
}

createOptions();
buttonStop.style.display = "none";

const timestamp = document.createElement('p')
timestamp.innerText = new Date()
timestamp.classList.add('timestamp')

document.body.appendChild(timestamp)