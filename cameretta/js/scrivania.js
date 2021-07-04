import {
    makeBox,
    makeWrappedBox,
    materials,
    room,
    setPos,
    Size
} from "./utils.js";

import { wallBox } from "./wallbox.js";  


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
        materials.canapa
    );
    gamba1.setAttribute("id", `gamba1`);
    gamba1.setAttribute("position", `0, 0, ${scrittoio.depth - gambaSize.depth}`);

    const gamba2 = makeWrappedBox(gambaSize, materials.canapa);
    gamba2.setAttribute("id", `gamba2`);
    gamba2.setAttribute("position", `${scrittoio.width - gambaSize.width}, 0, ${scrittoio.depth - gambaSize.depth}`);
    
    scrivaniaWrapper.appendChild(gamba1);
    scrivaniaWrapper.appendChild(gamba2);
}

// mensola
const ripianoScrivaniaEl = makeBox(  
    new Size(scrittoio.width, scrittoio.height, .2),
    materials.canapa 
);  
ripianoScrivaniaEl.setAttribute("id", "mensola");
setPos(ripianoScrivaniaEl, [0, 1.3, 0]);
ponteWrapper.appendChild(ripianoScrivaniaEl);


  
// box 1
const box1 = wallBox();
box1.setAttribute("id", "box1");
setPos(box1, [0, 1.8, 0]);


const box2 = wallBox(); 
box2.setAttribute("id", "box2");
setPos(box2, [.6, 1.5, 0]);

 
  
// append  
setPos(scrivaniaWrapper, [
    room.width, 
    0, 
    room.depth - (scrittoio.width) - .45 - .20
]);  
scrivaniaWrapper.setAttribute("rotation", "0 -90 0"); 
 
scrivaniaWrapper.appendChild(box1); 
scrivaniaWrapper.appendChild(box2);
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