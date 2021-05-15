import {
    makeBox,
    materials,
    room,
    setPos
} from "./utils.js";


const comodino = {
    width: .45,
    height: .36,
    depth: .482
};
const cassetto = {
    width: comodino.width,
    height: .18,
    depth: .03
};  


const maniglia = {
    width: .1,
    height: .05,
    depth: .01,
    x: (comodino.width / 2) - .05,
    z: comodino.depth + cassetto.depth + .02
};



const comodinoWrapper = document.createElement('a-entity');
comodinoWrapper.setAttribute("id", "comodino");



const comodinoEl = document.createElement('a-box');
comodinoEl.setAttribute('material', materials.col1);
comodinoEl.setAttribute("shadow", "cast: true; receive: true");
comodinoEl.setAttribute("width", comodino.width);
comodinoEl.setAttribute("height", comodino.height);
comodinoEl.setAttribute("depth", comodino.depth);  
setPos(comodinoEl, [0, 0, 0]);


const maniglia1El = makeBox(maniglia, materials.col1);
maniglia1El.setAttribute("geometry", {
    primitive: "maniglia-triangolo"
});
maniglia1El.setAttribute("rotation", "0, 0, -90");
setPos(maniglia1El, [
    maniglia.x, 
    cassetto.height - (maniglia.height / 2), 
    maniglia.z - .005
]);
comodinoWrapper.appendChild(maniglia1El); 

const maniglia2El = makeBox(maniglia, materials.col1);
setPos(maniglia2El, [
    maniglia.x, 
    cassetto.height, 
    maniglia.z
]);
comodinoWrapper.appendChild(maniglia2El);


// cassetti
for (let i = 0; i < 2; i++) {
    const cassettoEl = document.createElement('a-box');
    cassettoEl.setAttribute('material', materials.col1);   
    cassettoEl.setAttribute("width", comodino.width);
    cassettoEl.setAttribute("height", cassetto.height);
    cassettoEl.setAttribute("depth", cassetto.depth);
    cassettoEl.setAttribute("shadow", "cast: true; receive: true");
    cassettoEl.object3D.scale.set(.99, .99, 1);

    comodinoWrapper.appendChild(cassettoEl);
    setPos(cassettoEl, [0, cassetto.height * i, comodino.depth]);
}

setPos(comodinoWrapper, [0, 0, 2.8]);
comodinoWrapper.setAttribute("rotation", "0 90 0");

comodinoWrapper.appendChild(comodinoEl);
Array.from(comodinoWrapper.children).forEach(child => {
    child.setAttribute("change-color", "0");
});

export { comodinoWrapper };