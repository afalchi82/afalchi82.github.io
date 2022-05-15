console.clear();

class Note {
    chords = {
        maj: [2, 4]
    };

    notes = "cdefgab".toUpperCase().split("");

    constructor(note, oct = 4) {
        this.oct = oct;
        this.note = note || this.rnd();
    }

    rnd() {
        const root = this.notes[Math.round(Math.random() * 7) % 7];
        console.log(this.oct);
        return `${root}/${this.oct}`;
    }

    next(interval) {
        const note = this.note[0];
        const index = this.notes.indexOf(note);
        const nNote = this.notes[(index + interval) % 7];
        const nOctave =
            +this.note.replace(/[^\d]/g, "") +
            (Math.floor((index + interval) / 7) % 7);
        console.log(`${nNote}/${nOctave}`);
        return `${nNote}/${nOctave}`;
    }

    chord() {
        const chord = [this.note, this.next(2), this.next(4)];
        console.log(chord);
        return chord;
    }
}

function emptyBody() {
    document.getElementById("output").innerHTML = "";
}

function initES() {
    const { Formatter, Renderer, Stave, StaveNote, System, Voice } = Vex.Flow;



    // Create an SVG renderer and attach it to the DIV element named "boo".
    const div = document.getElementById("output");
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 500);
    const ctx = renderer.getContext();

    // Create a stave of width 10000 at position 10, 40 on the canvas.
    const stave = new Stave(10, 10, 10000).addClef("treble");

    // Connect it to the rendering context and draw!
    stave.setContext(ctx).draw();

    return;

    const n = new Note();
    const nF = new Note();

    // Create the notes
    const notesG = [
        // A quarter-note C.
        new StaveNote({
            keys: [n.rnd(), n.rnd()],
            duration: "q"
        }),

        // A quarter-note D.
        new StaveNote({
            keys: [n.rnd()],
            duration: "q"
        }),

        new StaveNote({
            keys: n.chord(),
            duration: "q"
        }),

        // A quarter-note rest. Note that the key (b/4) specifies the vertical
        // position of the rest.
        // new StaveNote({
        //   keys: ["b/4"],
        //   duration: "qr"
        // }),

        // A C-Major chord.
        new StaveNote({
            keys: n.chord(),
            duration: "q"
        })
    ];
    const notesF = [
        // A quarter-note C.
        new StaveNote({
            keys: [n.rnd(), n.rnd()],
            duration: "q"
        }),

        // A quarter-note D.
        new StaveNote({
            keys: [n.rnd()],
            duration: "q"
        }),

        new StaveNote({
            keys: new Note().chord(),
            duration: "q"
        }),

        // A quarter-note rest. Note that the key (b/4) specifies the vertical
        // position of the rest.
        // new StaveNote({
        //   keys: ["b/4"],
        //   duration: "qr"
        // }),

        // A C-Major chord.
        new StaveNote({
            keys: nF.chord(),
            duration: "q"
        })
    ];






    const system = new System({
        autowidth: true,
        factory: {
            renderer
        }
    }); //



    // Create a stave of width 400 at position 10, 40 on the canvas.
    // const staveF = new Stave(10, 140, 400);

    // Add a clef and time signature.
    staveG.addClass("ciccio").addClef("treble").addTimeSignature("4/4");
    // .setText("ciccio", 0)
    // .setTempo({
    //   bpm: 110,
    //   duration: "duration",
    //   name: "name"
    // })

    staveG.setText("ciccio", 3, {
        justification: 0,
        // shift_x: number;
        shift_y: 40
    });

    staveG.onRegister((arg) => {
        console.info(arg);
    });

    //staveG.setRepetitionType(0)

    // Add a clef and time signature.
    // staveF.addClef("bass").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    staveG.setContext(context).draw();

    // Connect it to the rendering context and draw!
    // staveF.setContext(context).draw();

    // Create a voice in 4/4 and add above notesG
    const voiceG = new Voice({
        num_beats: 4,
        beat_value: 4
    });
    voiceG.addTickables(notesG);

    // Create a voice in 4/4 and add above notesG
    // const voiceF = new Voice({
    //   num_beats: 4,
    //   beat_value: 4
    // });
    // voiceF.addTickables(notesF);

    // Format and justify the notes to 400 pixels.
    new Formatter().joinVoices([voiceG]).format([voiceG], 350);

    system
        .addStave({
            voices: [voiceG]
        })
        .addClef("treble");

    // const system = new System();

    // system.addStave(voiceG);

    // new Formatter().joinVoices([voiceF]).format([voiceF], 350);

    // Render voiceG
    voiceG.draw(context, staveG);
    // voiceF.draw(context, staveF);
}

function init() {
    emptyBody();
    setTimeout(initES, 100);
}

document.body.addEventListener("click", init);

init();
