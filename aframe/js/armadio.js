import {
    makeBox,
    makeWrappedBox,
    materials,
    room,
    setPos,
    Size
} from "./utils.js";

const armadio = {
    width: 2.35,
    height: 2.6,
    depth: .6
};        

const antaFull = {
    width: armadio.width / 5,
    height: armadio.height,
    depth: .03
};  

const cassetto = {
    width: (armadio.width / 5) * 2,
    height: .18,
    depth: .03
};        

const cestone = {
    width: (armadio.width / 5) * 2,
    height: cassetto.height * 2,
    depth: .03
};        

const cassettiTotalH = cestone.height + (cassetto.height * 2);

const antaNotFull = {
    width: armadio.width / 5,
    height: armadio.height - cassettiTotalH,
    depth: .03
};  


const armadioWrapper = document.createElement('a-entity');


const armadioEl = document.createElement('a-box');
armadioEl.setAttribute('material', materials.chiaro);
armadioEl.setAttribute('color', 'white');
["width", "height", "depth"].forEach(p => {
    armadioEl.setAttribute(p, armadio[p]);
});
setPos(armadioEl, [0, 0, 0]);

// ante h 100%
for (let i=0; i<3; i++) {
    const antaWrapper = document.createElement('a-box');
    antaWrapper.setAttribute('material', materials.chiaro);
    antaWrapper.setAttribute("width", antaFull.width);
    antaWrapper.setAttribute("height", antaFull.height);
    antaWrapper.setAttribute("depth", antaFull.depth);
    antaWrapper.setAttribute("shadow", "receive: true");
    antaWrapper.object3D.scale.set(.99, 1, 1);
    setPos(antaWrapper, [antaFull.width * i, 0, armadio.depth]);
    
    armadioWrapper.appendChild(antaWrapper);
}

// ante h 60%
for (let i=0; i<2; i++) {
    const antaWrapper = document.createElement('a-box');
    antaWrapper.setAttribute('material', materials.chiaro);
    antaWrapper.setAttribute("width", antaNotFull.width);
    antaWrapper.setAttribute("height", antaNotFull.height);
    antaWrapper.setAttribute("depth", antaNotFull.depth);
    antaWrapper.setAttribute("shadow", "receive: true");
    antaWrapper.object3D.scale.set(.99, 1, 1);
    setPos(antaWrapper, [(antaFull.width * 3) + antaNotFull.width * i, cassettiTotalH, armadio.depth]);
    
    armadioWrapper.appendChild(antaWrapper);
}

// maniglie ante
const maniglia = {
    width: .05,
    height: .1,
    depth: .01,
    y: 1.2,
    z: armadio.depth + antaFull.depth + .01 
};
const manigliaWide = {
    width: .1,
    height: .1,
    depth: .01,
    y: 1.2, 
    z: armadio.depth + antaFull.depth + .01 
};

const manigliaHor = {
    width: .1,
    height: .05,
    depth: maniglia.depth,
    z: maniglia.z
};
const maniglia1El = makeBox(maniglia, materials.col1);
setPos(maniglia1El, [
    antaFull.width - maniglia.width,  
    maniglia.y, 
    maniglia.z
]);

const maniglia2El = makeWrappedBox(manigliaWide, materials.col1);
maniglia2El.setAttribute("material", materials.col1);
maniglia2El.setAttribute("shadow", "cast: true; receive: true");
setPos(maniglia2El, [
    antaFull.width + .002, 
    manigliaWide.y,  
    manigliaWide.z
]);

const maniglia3El = makeBox(maniglia, materials.col1);
setPos(maniglia3El, [
    (antaFull.width * 3) - maniglia.width, 
    maniglia.y, 
    maniglia.z
]);
const maniglia4El = makeBox(maniglia, materials.col1);
setPos(maniglia4El, [
    (antaFull.width * 4) - maniglia.width, 
    maniglia.y, 
    maniglia.z
]);
const maniglia5El = makeWrappedBox(manigliaWide, materials.col1);
maniglia5El.setAttribute("material", materials.col1);
maniglia5El.setAttribute("shadow", "cast: true; receive: true");
setPos(maniglia5El, [
    (antaFull.width * 4) + .002, 
    maniglia.y, 
    maniglia.z
]);


armadioWrapper.appendChild(maniglia1El);
armadioWrapper.appendChild(maniglia2El);
armadioWrapper.appendChild(maniglia3El);
armadioWrapper.appendChild(maniglia4El);
armadioWrapper.appendChild(maniglia5El);


// cassetti
for (let i=0; i<2; i++) {
    const cassettoEl = document.createElement('a-box');
    cassettoEl.setAttribute('material', materials.col1);
    cassettoEl.setAttribute("width", cassetto.width);
    cassettoEl.setAttribute("height", cassetto.height);
    cassettoEl.setAttribute("depth", cassetto.depth);
    cassettoEl.setAttribute("shadow", "cast: true; receive: true");
    cassettoEl.object3D.scale.set(.99, .99, 1);
    setPos(cassettoEl, [antaFull.width * 3, cestone.height + (cassetto.height * i), armadio.depth]);
    
    armadioWrapper.appendChild(cassettoEl);
}


const manigliaCass1El = makeBox(manigliaHor, materials.chiaro);
manigliaCass1El.setAttribute("geometry", {
    primitive: "maniglia-triangolo"
});
manigliaCass1El.setAttribute("rotation", "0, 0, 90");
setPos(manigliaCass1El, [
    (antaFull.width * 4) - (manigliaHor.width / 2), 
    cestone.height + cassetto.height - (manigliaHor.height / 2), 
    manigliaHor.z
]); 
const manigliaCass2El = makeBox(manigliaHor, materials.chiaro);
setPos(manigliaCass2El, [
    (antaFull.width * 4) - (manigliaHor.width / 2), 
    cestone.height + cassetto.height - manigliaHor.height, 
    manigliaHor.z
]);

const manigliaCass3El = makeBox(manigliaHor, materials.chiaro);
setPos(manigliaCass3El, [
    (antaFull.width * 4) - (manigliaHor.width / 2), 
    cestone.height - manigliaHor.height, 
    manigliaHor.z
]);

armadioWrapper.appendChild(manigliaCass1El);
armadioWrapper.appendChild(manigliaCass2El);
armadioWrapper.appendChild(manigliaCass3El);



// cestone
const cestoneEl = document.createElement('a-box');
cestoneEl.setAttribute('material', materials.col1);
cestoneEl.setAttribute("shadow", "cast: true; receive: true");
cestoneEl.setAttribute("width", cestone.width);
cestoneEl.setAttribute("height", cestone.height);
cestoneEl.setAttribute("depth", cestone.depth);
cestoneEl.object3D.scale.set(.99, .99, 1);
setPos(cestoneEl, [antaFull.width * 3, 0, armadio.depth]);

armadioWrapper.appendChild(cestoneEl);


// append 
armadioWrapper.appendChild(armadioEl);


export { armadioWrapper };