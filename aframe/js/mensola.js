import {
    makeBox,
    materials,
    room,
    setPos
} from "./utils.js";

const mensola = {
    width: .6,
    height: .03,
    depth: .3
};

const mensolaWrapper = document.createElement('a-entity');
mensolaWrapper.setAttribute("id", "mensola");



const mensolaEl = makeBox(mensola, materials.ciliegia)
setPos(mensolaEl, [0, 0, 0]);


setPos(mensolaWrapper, [0, 0, 2.8]);
mensolaWrapper.setAttribute("rotation", "0 -90 0");

mensolaWrapper.appendChild(mensolaEl);

export { mensolaWrapper };