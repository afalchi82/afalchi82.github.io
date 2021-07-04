import {
    makeBox,
    makeWrappedBox,
    materials,
    setPos,
    Size
} from "./utils.js";



export function wallBox () {

    const wallBoxEl = document.createElement('a-entity');
    wallBoxEl.setAttribute('material', materials.ciliegia); 

    const boxPianoH = new Size(.9, .02, .3);
    const boxPianoV = new Size(.02, .3, .3);


    // box 
    const boxT = makeWrappedBox(
        boxPianoH,
        materials.canapa 
    );
    // boxT.setAttribute("id", "boxT");
    setPos(boxT, [0, boxPianoH.height + boxPianoV.height, 0]);
    wallBoxEl.appendChild(boxT);


    const boxB = makeWrappedBox( 
        boxPianoH, 
        materials.canapa 
    );
    // boxB.setAttribute("id", "boxB");
    setPos(boxB, [0, 0, 0]); 
    wallBoxEl.appendChild(boxB);


    const boxR = makeWrappedBox(
        boxPianoV,
        materials.canapa 
    );
    // boxR.setAttribute("id", "boxR");
    setPos(boxR, [boxPianoH.width - boxPianoV.width, boxPianoH.height, 0]);
    wallBoxEl.appendChild(boxR);

    const boxL = makeWrappedBox(
        boxPianoV,
        materials.canapa 
    );
    // boxL.setAttribute("id", "boxL");
    setPos(boxL, [0, boxPianoH.height, 0]);
    wallBoxEl.appendChild(boxL);

    return wallBoxEl;
}


