import {
    makeBox,
    makeWrappedBox,
    materials,
    room,
    setPos,
    Size
} from "./utils.js";

const colonnaSize = new Size(.45, room.height, .4);
const fiancoSize = new Size(.03, colonnaSize.height, colonnaSize.depth);
const ripianoSize = new Size(
    colonnaSize.width - (fiancoSize.width * 2), 
    .03, 
    colonnaSize.depth
);
const sportelloSize = new Size(
    colonnaSize.width, 
    .7, 
    .03
);



const colonnaWrapper = document.createElement('a-entity');
colonnaWrapper.setAttribute("id", "colonna");

const fiancoSx = makeWrappedBox( fiancoSize, materials.col1 );
setPos(fiancoSx, [0,0,0]);
colonnaWrapper.appendChild(fiancoSx);

const fiancoDx = makeWrappedBox( fiancoSize, materials.col1 );
setPos(fiancoDx, [colonnaSize.width - fiancoSize.width, 0, 0]);
colonnaWrapper.appendChild(fiancoDx);


const ripiano1 = makeWrappedBox( ripianoSize, materials.col1 );
setPos(ripiano1, [fiancoSize.width, sportelloSize.height - ripianoSize.height, 0]);
colonnaWrapper.appendChild(ripiano1);

const ripiano2 = makeWrappedBox( ripianoSize, materials.col1 );
setPos(ripiano2, [fiancoSize.width, colonnaSize.height - ripianoSize.height, 0]);
colonnaWrapper.appendChild(ripiano2);

const sportello1 = makeWrappedBox( sportelloSize, materials.col1 );
sportello1.setAttribute("position", `0, 0, ${colonnaSize.depth}`);
colonnaWrapper.appendChild(sportello1);

const sportello2 = makeWrappedBox( sportelloSize, materials.col1 );
sportello2.setAttribute("position", `0, 1.2, ${colonnaSize.depth}`);
colonnaWrapper.appendChild(sportello2);

const sportello3 = makeWrappedBox( sportelloSize, materials.col1 );
sportello3.setAttribute("position", `0, 1.9, ${colonnaSize.depth}`);
colonnaWrapper.appendChild(sportello3);



export { colonnaWrapper };