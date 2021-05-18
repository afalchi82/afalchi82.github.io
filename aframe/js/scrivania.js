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
ponteWrapper.setAttribute('material', materials.ciliegia); 

const scrittoio = {
    width: 1.5,
    height: .03,
    depth: .60,
    x: 0,
    y: .78,
    z: 0 
};
const scrittoioEl = document.createElement('a-box');
scrittoioEl.setAttribute('material', materials.mandorlo); 
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
        materials.olmo
    );
    gamba1.setAttribute("id", `gamba1`);
    gamba1.setAttribute("position", `0, 0, ${scrittoio.depth - gambaSize.depth}`);

    const gamba2 = makeWrappedBox(gambaSize, materials.olmo);
    gamba2.setAttribute("id", `gamba2`);
    gamba2.setAttribute("position", `${scrittoio.width - gambaSize.width}, 0, ${scrittoio.depth - gambaSize.depth}`);
    
    scrivaniaWrapper.appendChild(gamba1);
    scrivaniaWrapper.appendChild(gamba2);
}

// mensola
const ripianoScrivaniaEl = makeBox(
    new Size(scrittoio.width, scrittoio.height, .2),
    materials.olmo 
);
ripianoScrivaniaEl.setAttribute("id", "mensola");
setPos(ripianoScrivaniaEl, [0, 1.3, 0]);
ponteWrapper.appendChild(ripianoScrivaniaEl);




const ponteSide = {
    width: .03,
    height: 2.2,
    depth: .30
};
const ponteSxEl = document.createElement('a-box');
ponteSxEl.setAttribute("shadow", "cast: true; receive: true");
ponteSxEl.setAttribute("material", materials.chiaro);
ponteSxEl.setAttribute("width", ponteSide.width); 
ponteSxEl.setAttribute("height", ponteSide.height);
ponteSxEl.setAttribute("depth", ponteSide.depth);
setPos(ponteSxEl, [-ponteSide.width, 0, 0]);
ponteWrapper.appendChild(ponteSxEl);

const ponteDxEl = document.createElement('a-box');
ponteDxEl.setAttribute("shadow", "cast: true; receive: true");
ponteDxEl.setAttribute("material", materials.chiaro);
ponteDxEl.setAttribute("width", ponteSide.width);
ponteDxEl.setAttribute("height", ponteSide.height);
ponteDxEl.setAttribute("depth", ponteSide.depth);
setPos(ponteDxEl, [scrittoio.width, 0, 0]);
ponteWrapper.appendChild(ponteDxEl);


const ponteTop = makeBox(
    new Size(scrittoio.width, scrittoio.height, .3),
    materials.chiaro
);
setPos(ponteTop, [0, ponteSide.height - scrittoio.height, 0]);
// ponteWrapper.appendChild(ponteTop);
 
  

// cassone
const cassone = {
    height: .6,
    y: 1.6
};
const ponteCassone = document.createElement('a-box');
ponteCassone.setAttribute("shadow", "cast: true; receive: true");
ponteCassone.setAttribute("material", materials.chiaro);
ponteCassone.setAttribute("width", scrittoio.width);
ponteCassone.setAttribute("height", cassone.height);
ponteCassone.setAttribute("depth", ponteSide.depth);
setPos(ponteCassone, [0, cassone.y, 0]);
ponteWrapper.appendChild(ponteCassone);

// schienale 
{
    const schienaleEl = makeBox({
        width: scrittoio.width,
        height: ponteSide.height,
        depth: .01
    }, materials.mandorlo);
    setPos(schienaleEl, [0, 0, 0]);
    ponteWrapper.appendChild(schienaleEl);
}  



// maniglie
{
    const manigliaScrivania = {
        width: .05,
        height: .1,
        depth: .02,
        y: cassone.y,
        z: ponteSide.depth
    };
    const manigliaScrivania1El = makeBox(manigliaScrivania, materials.mirtillo);
    setPos(manigliaScrivania1El, [
        scrittoio.width / 3 - manigliaScrivania.width,
        manigliaScrivania.y, 
        manigliaScrivania.z
    ]);
    const manigliaScrivania2El = makeBox(manigliaScrivania, materials.mirtillo);
    setPos(manigliaScrivania2El, [
        scrittoio.width / 3,
        manigliaScrivania.y,
        manigliaScrivania.z
    ]);
    const manigliaScrivania3El = makeBox(manigliaScrivania, materials.mirtillo);
    setPos(manigliaScrivania3El, [
        (scrittoio.width / 3) * 2,
        manigliaScrivania.y,
        manigliaScrivania.z
    ]);

    scrivaniaWrapper.appendChild(manigliaScrivania1El);
    scrivaniaWrapper.appendChild(manigliaScrivania2El);
    scrivaniaWrapper.appendChild(manigliaScrivania3El); 
}

 

// append
setPos(scrivaniaWrapper, [
    room.width, 
    0, 
    room.depth - (scrittoio.width) - .45 - .20
]); 
scrivaniaWrapper.setAttribute("rotation", "0 -90 0"); 

scrivaniaWrapper.appendChild(ponteWrapper);
scrivaniaWrapper.appendChild(scrittoioEl);

Array.from(ponteWrapper.children).forEach(child => {
    child.setAttribute("change-color", "0");
    child.setAttribute("data-raycastable", "true");
});
Array.from(scrivaniaWrapper.children).forEach(child => {
    child.setAttribute("change-color", "0");
    child.setAttribute("data-raycastable", "true");
});



export { scrivaniaWrapper };