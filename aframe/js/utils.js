export const materials = {
    nuvola: "src: #nuvola; roughness: .5;",
    olmo: "src: #olmo; roughness: .5;",
    col1: 'src: #mirtillo; roughness: .1;',
    col2: 'src: #ciliegia; roughness: 1;', 
    zenzero: 'src: #zenzero; roughness: 1;', 
    col3: 'src: #pino; roughness: .45;',
    chiaro: 'src: #nuvola; roughness: .2;',
    mandorlo: 'src: #mandorlo; roughness: 1; repeat: 5 1',
    stucco: "src: #stucco; roughness: .5; color: #ffffff", // side: double"
        
};

export const cicleMaterials = (index) => {
    const materialsKeys = Object.keys(materials); 
    return materials[materialsKeys[index]];
};

export const room = {
    width: 3.73, 
    height: 2.7, 
    depth: 3.73
};


export function makeBox (sizeObj, materialStr, shadow = true) {
    const boxEl = document.createElement('a-box');
    boxEl.setAttribute('material', materialStr);
    shadow && boxEl.setAttribute("shadow", "cast: true; receive: true");
    boxEl.setAttribute("width", sizeObj.width);
    boxEl.setAttribute("height", sizeObj.height);
    boxEl.setAttribute("depth", sizeObj.depth);

    return boxEl;
}; 


export function makeWrappedBox (sizeObj, materialStr, shadow = true) {
    const wrapper = document.createElement('a-entity');
    const boxEl = document.createElement('a-box');
    materialStr && boxEl.setAttribute('material', materialStr);
    shadow && boxEl.setAttribute("shadow", "cast: true; receive: true");
    boxEl.setAttribute("width", sizeObj.width);
    boxEl.setAttribute("height", sizeObj.height);
    boxEl.setAttribute("depth", sizeObj.depth);

    setPos(boxEl, [0,0,0]);
    wrapper.appendChild(boxEl);

    return wrapper;
};


export function setPos (el, positionArr) {

    const w = el?.getAttribute("width") || 0;
    const h = el?.getAttribute("height") || 0;
    const d = el?.getAttribute("depth") || 0;

    
    const [x, y, z] = positionArr;

    el?.object3D.position.set(
        x + (w/2),
        y + (h/2),
        z + (d/2)
    ); 
}

export class Size {
    constructor (width = 1, height = 1, depth = 1) {
        this.width = width;
        this.height = height;
        this.depth = depth;
    }
};