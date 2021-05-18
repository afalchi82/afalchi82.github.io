import {
    makeBox,
    makeWrappedBox,
    materials,
    room,
    setPos,
    Size
} from "./utils.js";

const colonnaSize = new Size(.45, 2.2, .3);
const fiancoSize = new Size(.03, colonnaSize.height, colonnaSize.depth);
const ripianoSize = new Size(
    colonnaSize.width - (fiancoSize.width * 2), 
    .03, 
    colonnaSize.depth
); 
const sportelloTopSize = new Size(
    colonnaSize.width,  
    .6, 
    .03
);
const sportelloSize = new Size(
    colonnaSize.width,  
    .78, 
    .03
);



const colonnaWrapper = document.createElement('a-entity');
colonnaWrapper.setAttribute("id", "colonna");

const fiancoSx = makeWrappedBox( fiancoSize, materials.olmo );
setPos(fiancoSx, [0,0,0]);
colonnaWrapper.appendChild(fiancoSx);

const fiancoDx = makeWrappedBox( fiancoSize, materials.olmo );
setPos(fiancoDx, [colonnaSize.width - fiancoSize.width, 0, 0]);
colonnaWrapper.appendChild(fiancoDx);


const ripiano1 = makeWrappedBox( ripianoSize, materials.olmo );
setPos(ripiano1, [fiancoSize.width, sportelloSize.height - ripianoSize.height, 0]);
colonnaWrapper.appendChild(ripiano1);

const ripiano2 = makeWrappedBox( ripianoSize, materials.olmo );
setPos(ripiano2, [fiancoSize.width, colonnaSize.height - ripianoSize.height, 0]);
colonnaWrapper.appendChild(ripiano2);

const ripiano3 = makeWrappedBox( ripianoSize, materials.olmo );
setPos(ripiano3, [fiancoSize.width, 1.3, 0]);
colonnaWrapper.appendChild(ripiano3);

const sportello1 = makeWrappedBox( sportelloSize, materials.mirtillo );
sportello1.setAttribute("position", `0, 0, ${colonnaSize.depth}`);
colonnaWrapper.appendChild(sportello1);

const sportello2 = makeWrappedBox( sportelloTopSize, materials.olmo );
sportello2.setAttribute("position", `0, ${colonnaSize.height - sportelloTopSize.height}, ${colonnaSize.depth}`);
colonnaWrapper.appendChild(sportello2);

const sportello3 = makeWrappedBox( sportelloSize, materials.mirtillo );
sportello3.setAttribute("position", `0, 1.7, ${colonnaSize.depth}`); 
// colonnaWrapper.appendChild(sportello3);

const schienale = makeWrappedBox( new Size(colonnaSize.width, colonnaSize.height, .001), materials.mirtillo );
colonnaWrapper.appendChild(schienale);

const manigliaScrivania = {
    width: .05,
    height: .1,
    depth: .02,
    z: colonnaSize.depth + .02
};
const maniglia1 = makeWrappedBox( manigliaScrivania, materials.mirtillo );
maniglia1.setAttribute("position", `0, ${colonnaSize.height - sportelloTopSize.height}, ${manigliaScrivania.z}`);
colonnaWrapper.appendChild(maniglia1);

const maniglia2 = makeWrappedBox( manigliaScrivania, materials.olmo );
maniglia2.setAttribute("position", `0, ${sportelloSize.height - manigliaScrivania.height}, ${manigliaScrivania.z}`);
colonnaWrapper.appendChild(maniglia2);

Array.from(colonnaWrapper.children).forEach(child => {
    Array.from(child.children).forEach(box => {
        box.setAttribute("change-color", "0");
        box.setAttribute("data-raycastable", "true");
    });
});


 
export { colonnaWrapper };