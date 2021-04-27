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

const comodinoWrapper = document.createElement('a-entity');
comodinoWrapper.setAttribute("id", "comodino");



const comodinoEl = document.createElement('a-box');
comodinoEl.setAttribute('material', materials.col2);
comodinoEl.setAttribute("shadow", "cast: true; receive: true");
comodinoEl.setAttribute("width", comodino.width);
comodinoEl.setAttribute("height", comodino.height);
comodinoEl.setAttribute("depth", comodino.depth);
setPos(comodinoEl, [0, 0, 0]);


// cassetti
for (let i = 0; i < 2; i++) {
    const cassettoEl = document.createElement('a-box');
    cassettoEl.setAttribute('material', materials.col2);
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

export { comodinoWrapper };