export const materials = {
    col1: 'src: #papaya; roughness: .45;',
    col2: 'src: #zenzero; roughness: 1;',
    chiaro: 'src: #nuvola; roughness: .45;'
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