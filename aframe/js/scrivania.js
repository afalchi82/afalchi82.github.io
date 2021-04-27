import {
    makeBox,
    makeWrappedBox,
    materials,
    room,
    setPos,
    Size
} from "./utils.js";


/* ----------------------------------------------------
    scrivania
---------------------------------------------------- */
const scrivaniaWrapper = document.createElement('a-entity');

const ponteWrapper = document.createElement('a-entity');

const scrittoio = {
    width: 1.5,
    height: .03,
    depth: .60,
    x: 0,
    y: .78,
    z: 0
};
const scrittoioEl = document.createElement('a-box');
scrittoioEl.setAttribute('material', 'src: #mandorlo; roughness: 1; repeat: 5 2');
scrittoioEl.setAttribute("shadow", "cast: true; receive: true");
scrittoioEl.setAttribute("width", scrittoio.width);
scrittoioEl.setAttribute("height", scrittoio.height);
scrittoioEl.setAttribute("depth", scrittoio.depth);
setPos(scrittoioEl, [0, scrittoio.y, 0]);



{
    /* ----------------------------------------------------
        gamba
    ---------------------------------------------------- */
    const gambaSize = new Size(.05, scrittoio.y, .02);
    const gamba1 = makeWrappedBox(
        gambaSize,
        materials.chiaro
    );
    gamba1.setAttribute("id", `gamba1`);
    gamba1.setAttribute("position", `0, 0, ${scrittoio.depth - gambaSize.depth}`);

    const gamba2 = makeWrappedBox(gambaSize, materials.chiaro);
    gamba2.setAttribute("id", `gamba2`);
    gamba2.setAttribute("position", `${scrittoio.width - gambaSize.width}, 0, ${scrittoio.depth - gambaSize.depth}`);
    
    scrivaniaWrapper.appendChild(gamba1);
    scrivaniaWrapper.appendChild(gamba2);
}


const ripianoScrivaniaEl = makeBox(
    {width: scrittoio.width, height: scrittoio.height, depth: .3},
    materials.chiaro
);
setPos(ripianoScrivaniaEl, [0, 1.2, 0]);
ponteWrapper.appendChild(ripianoScrivaniaEl);


const ponteSide = {
    width: .03,
    height: 2.2,
    depth: .30
};
const ponteSxEl = document.createElement('a-box');
ponteSxEl.setAttribute('material', materials.chiaro);
ponteSxEl.setAttribute("shadow", "cast: true; receive: true");
ponteSxEl.setAttribute("width", ponteSide.width);
ponteSxEl.setAttribute("height", ponteSide.height);
ponteSxEl.setAttribute("depth", ponteSide.depth);
setPos(ponteSxEl, [-ponteSide.width, 0, 0]);
ponteWrapper.appendChild(ponteSxEl);

const ponteDxEl = document.createElement('a-box');
ponteDxEl.setAttribute('material', materials.chiaro);
ponteDxEl.setAttribute("shadow", "cast: true; receive: true");
ponteDxEl.setAttribute("width", ponteSide.width);
ponteDxEl.setAttribute("height", ponteSide.height);
ponteDxEl.setAttribute("depth", ponteSide.depth);
setPos(ponteDxEl, [scrittoio.width, 0, 0]);
ponteWrapper.appendChild(ponteDxEl);

// cassone
const cassone = {
    height: .6
};
const ponteCassone = document.createElement('a-box');
ponteCassone.setAttribute('material', materials.chiaro);
ponteCassone.setAttribute("shadow", "cast: true; receive: true");
ponteCassone.setAttribute("width", scrittoio.width);
ponteCassone.setAttribute("height", cassone.height);
ponteCassone.setAttribute("depth", ponteSide.depth);
setPos(ponteCassone, [0, ponteSide.height - cassone.height, 0]);
ponteWrapper.appendChild(ponteCassone);

// schienale
{
    const schienaleEl = makeBox({
        width: scrittoio.width,
        height: ponteSide.height,
        depth: .01
    }, materials.chiaro);
    setPos(schienaleEl, [0, 0, 0]);
    ponteWrapper.appendChild(schienaleEl);
}



// maniglie
{
    const manigliaScrivania = {
        width: .05,
        height: .1,
        depth: .02,
        y: ponteSide.height - cassone.height,
        z: ponteSide.depth
    };
    const manigliaScrivania1El = makeBox(manigliaScrivania, materials.col1);
    setPos(manigliaScrivania1El, [
        scrittoio.width / 3 - manigliaScrivania.width,
        manigliaScrivania.y, 
        manigliaScrivania.z
    ]);
    const manigliaScrivania2El = makeBox(manigliaScrivania, materials.col1);
    setPos(manigliaScrivania2El, [
        scrittoio.width / 3,
        manigliaScrivania.y,
        manigliaScrivania.z
    ]);
    const manigliaScrivania3El = makeBox(manigliaScrivania, materials.col1);
    setPos(manigliaScrivania3El, [
        (scrittoio.width / 3) * 2,
        manigliaScrivania.y,
        manigliaScrivania.z
    ]);

    // scrivaniaWrapper.appendChild(manigliaScrivania1El);
    // scrivaniaWrapper.appendChild(manigliaScrivania2El);
    // scrivaniaWrapper.appendChild(manigliaScrivania3El);
}

{
    /* ----------------------------------------------------
        mensola
    ---------------------------------------------------- */
    const mensolaSize = new Size(scrittoio.width, .03, .2);
    const mensola = makeWrappedBox(
        mensolaSize,
        materials.chiaro
    );
    mensola.setAttribute("id", `mensola`);
    mensola.setAttribute("position", `0, 1.35, 0`);
    scrivaniaWrapper.appendChild(mensola);
}

// append
setPos(scrivaniaWrapper, [
    room.width, 
    0, 
    room.depth - (scrittoio.width + ponteSide.width) - .45
]); 
scrivaniaWrapper.setAttribute("rotation", "0 -90 0");

// scrivaniaWrapper.appendChild(ponteWrapper);
scrivaniaWrapper.appendChild(scrittoioEl);


export { scrivaniaWrapper };