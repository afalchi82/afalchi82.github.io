

function setPos (el, position, noScale) {

    const w = el?.getAttribute("width");
    const h = el?.getAttribute("height");
    const d = el?.getAttribute("depth");

    
    const [x, y, z] = position;

    el?.object3D.position.set(
        x + (w/2),
        y + (h/2),
        z + (d/2)
    );
}


function o (val) {
    return val * .5;

}


AFRAME.registerComponent('scene-init', {
    init () {
        const roomW = 3.73;
        const roomD = 3.73;



        const sceneEl = this.el;

        sceneEl.setAttribute("color", "#cccccc")

        const cameraEl = document.createElement('a-camera');
        setPos(cameraEl, [
            roomW / 2,
            1.7,
            8
        ], true);
        sceneEl.appendChild(cameraEl);


        const lightEl = document.createElement('a-entity');
        lightEl.setAttribute('light', "type: point;  castShadow: true");
        setPos(lightEl, [
            roomW / 2,
            2.8,
            roomD / 2
        ], true);
        sceneEl.appendChild(lightEl);


        // pavimento
        const floorEl = document.createElement('a-box');
        floorEl.setAttribute("width", roomW);
        floorEl.setAttribute("height", ".1");
        floorEl.setAttribute("depth", roomD);
        floorEl.setAttribute('material', 'src: #parquet; roughness: .1; side: double');
        // floorEl.setAttribute("shadow", "receive: true");
        setPos(floorEl, [0, -.1, 0]);
        sceneEl.appendChild(floorEl);

       


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
        armadioEl.setAttribute('material', 'src: #olmo; roughness: 1; repeat: 5 2');
        armadioEl.setAttribute('color', 'white');
        ["width", "height", "depth"].forEach(p => {
            armadioEl.setAttribute(p, armadio[p]);
        });
        setPos(armadioEl, [0, 0, 0]);
        
        // ante h 100%
        for (let i=0; i<3; i++) {
            const antaWrapper = document.createElement('a-box');
            antaWrapper.setAttribute('material', 'src: #olmo; roughness: 1;');
            antaWrapper.setAttribute("width", antaFull.width);
            antaWrapper.setAttribute("height", antaFull.height);
            antaWrapper.setAttribute("depth", antaFull.depth);
            antaWrapper.object3D.scale.set(.99, 1, 1);
            setPos(antaWrapper, [antaFull.width * i, 0, armadio.depth]);
            
            armadioWrapper.appendChild(antaWrapper);
        }

        // ante h 60%
        for (let i=0; i<2; i++) {
            const antaWrapper = document.createElement('a-box');
            antaWrapper.setAttribute('material', 'src: #olmo; roughness: 1;');
            antaWrapper.setAttribute("width", antaNotFull.width);
            antaWrapper.setAttribute("height", antaNotFull.height);
            antaWrapper.setAttribute("depth", antaNotFull.depth);
            antaWrapper.object3D.scale.set(.99, 1, 1);
            setPos(antaWrapper, [(antaFull.width * 3) + antaNotFull.width * i, cassettiTotalH, armadio.depth]);
            
            armadioWrapper.appendChild(antaWrapper);
        }

        // cassetti
        for (let i=0; i<2; i++) {
            const cassettoEl = document.createElement('a-box');
            cassettoEl.setAttribute('material', 'src: #mirtillo; roughness: 1;');
            cassettoEl.setAttribute("width", cassetto.width);
            cassettoEl.setAttribute("height", cassetto.height);
            cassettoEl.setAttribute("depth", cassetto.depth);
            cassettoEl.setAttribute("shadow", "cast: true; receive: true");
            cassettoEl.object3D.scale.set(.99, .99, 1);
            setPos(cassettoEl, [antaFull.width * 3, cestone.height + (cassetto.height * i), armadio.depth]);
            
            armadioWrapper.appendChild(cassettoEl);
        }

        // cestone
        const cestoneEl = document.createElement('a-box');
        cestoneEl.setAttribute('material', 'src: #mirtillo; roughness: 1;');
        cestoneEl.setAttribute("shadow", "cast: true; receive: true");
        cestoneEl.setAttribute("width", cestone.width);
        cestoneEl.setAttribute("height", cestone.height);
        cestoneEl.setAttribute("depth", cestone.depth);
        cestoneEl.object3D.scale.set(.99, .99, 1);
        setPos(cestoneEl, [antaFull.width * 3, 0, armadio.depth]);
        
        armadioWrapper.appendChild(cestoneEl);

        armadioWrapper.appendChild(armadioEl);
        sceneEl.appendChild(armadioWrapper);


        
        // settimino
        const settiminoWrapper = document.createElement('a-entity');
        

        const settimino = {
            width: .6,
            height: 1.129,
            depth: .478
        };
        const settiminoEl = document.createElement('a-box');
        settiminoEl.setAttribute('material', 'src: #olmo; roughness: 1; repeat: 5 2');
        settiminoEl.setAttribute("shadow", "cast: true; receive: true");
        settiminoEl.setAttribute("width", settimino.width);
        settiminoEl.setAttribute("height", settimino.height);
        settiminoEl.setAttribute("depth", settimino.depth);
        setPos(settiminoEl, [0, 0, 0]);
        

        // cestoni
        for (let i=0; i<2; i++) {
            const cestoneEl = document.createElement('a-box');
            cestoneEl.setAttribute('material', 'src: #mirtillo; roughness: 1;');
            cestoneEl.setAttribute("width", settimino.width);
            cestoneEl.setAttribute("height", cestone.height);
            cestoneEl.setAttribute("depth", cestone.depth);
            cestoneEl.setAttribute("shadow", "cast: true; receive: true");
            cestoneEl.object3D.scale.set(.99, .99, 1);
            
            settiminoWrapper.appendChild(cestoneEl);
            setPos(cestoneEl, [0, (cestone.height * i), settimino.depth]);
        }

        // cassetti
        for (let i=0; i<2; i++) {
            const cassettoEl = document.createElement('a-box');
            cassettoEl.setAttribute('material', 'src: #olmo; roughness: 1;');
            cassettoEl.setAttribute("width", settimino.width);
            cassettoEl.setAttribute("height", cassetto.height);
            cassettoEl.setAttribute("depth", cassetto.depth);
            cassettoEl.setAttribute("shadow", "cast: true; receive: true");
            cassettoEl.object3D.scale.set(.99, .99, 1);
            
            settiminoWrapper.appendChild(cassettoEl);
            setPos(cassettoEl, [0, (cestone.height * 2) + (cassetto.height * i), settimino.depth]);
        }
        
        setPos(settiminoWrapper, [ roomW - settimino.depth, 0, 1.8]);        
        settiminoWrapper.setAttribute("rotation", "0 -90 0");

        settiminoWrapper.appendChild(settiminoEl);
        sceneEl.appendChild(settiminoWrapper);
        


    }
});

