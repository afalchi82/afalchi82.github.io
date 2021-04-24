import { 
    makeBox,
    materials,
    room
} from "./const.js";


const roomW = room.width;
const roomD = room.depth;



function setPos (el, position) {

    const w = el?.getAttribute("width") || 0;
    const h = el?.getAttribute("height") || 0;
    const d = el?.getAttribute("depth") || 0;

    
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


AFRAME.registerComponent('letto', {
    schema: {
        width: {type: "number", default: .8},
        height: {type: "number", default: .2},
        depth: {type: "number", default: 1.9},
    }
});



AFRAME.registerComponent('scene-init', {
    init () {
        



        const sceneEl = this.el;

        sceneEl.setAttribute("color", "#cccccc")


        /* ----------------------------------------------------
            camera
        ---------------------------------------------------- */
        const cameraWrapper = document.createElement('a-entity');
        

        const cameraEl = document.createElement('a-camera');
        cameraEl.setAttribute("wasd-controls", "acceleration: 40");
        cameraEl.setAttribute("fov", "60");
        setPos(cameraEl, [0, 0, 0]);

        setPos(cameraWrapper, [ roomW / 2, 0, roomD / 2]);
        cameraWrapper.appendChild(cameraEl);
        sceneEl.appendChild(cameraWrapper);


        /* ----------------------------------------------------
            lampadario
        ---------------------------------------------------- */
        const lampadarioWrapper = document.createElement('a-entity');
        const lightEl = document.createElement('a-light');
        lightEl.setAttribute('id', "lampadario");
        lightEl.setAttribute('light', {
            angle: 120,
            type: "spot",
            intensity: .40,
            penumbra: .6,  
            castShadow: true
        });
        
        setPos(lampadarioWrapper, [
            roomW / 2,
            2.8,
            roomD / 2
        ]);
        lampadarioWrapper.setAttribute('rotation', "90 0 0");
        lampadarioWrapper.appendChild(lightEl);
        sceneEl.appendChild(lampadarioWrapper);


        /* ----------------------------------------------------
            luce a
        ---------------------------------------------------- */
        const lightWindow = document.createElement('a-entity');
        lightWindow.setAttribute('id', "luce-finestra");
        lightWindow.setAttribute('light', {
            angle: 100,
            type: "spot",
            intensity: .76,
            penumbra: .8,  
            castShadow: true
        });
        setPos(lightWindow, [ roomW - .7, 2, roomD]);
        sceneEl.appendChild(lightWindow);


        /* ----------------------------------------------------
            luce ambientale
        ---------------------------------------------------- */
        const lightDoor = document.createElement('a-entity');
        lightDoor.setAttribute('id', "luce-ambient");
        lightDoor.setAttribute('light', {
            type: "ambient",
            intensity: .2
        });
        setPos(lightDoor, [ roomW - .45, 1.5, roomD / 2]);
        sceneEl.appendChild(lightDoor);


        // stanza
        const room = document.createElement('a-box');
        room.setAttribute("width", roomW);
        room.setAttribute("height", "2.8");
        room.setAttribute("depth", roomD);
        setPos(room, [0, -.001, 0]);
        room.setAttribute('material', {
            src: "#stucco", 
            normalMap: "#stucco-nrm", 
            normalTextureRepeat: "1 1", 
            normalScale: "-.1 -.1",
            repeat: "1 1", 
            roughness: .9,
            side: "back"
        });
        room.object3D.scale.set(-1, 1, 1);
        room.setAttribute("shadow", "receive: true");
        sceneEl.appendChild(room);


        // pavimento
        const floorEl = document.createElement('a-box');
        floorEl.setAttribute("width", roomW);
        floorEl.setAttribute("height", ".1");
        floorEl.setAttribute("depth", roomD);
        floorEl.setAttribute('material', 'src: #parquet; roughness: .1; side: double');
        floorEl.setAttribute("shadow", "cast: false; receive: true");
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
        armadioEl.setAttribute('material', materials.chiaro);
        armadioEl.setAttribute('color', 'white');
        ["width", "height", "depth"].forEach(p => {
            armadioEl.setAttribute(p, armadio[p]);
        });
        setPos(armadioEl, [0, 0, 0]);
        
        // ante h 100%
        for (let i=0; i<3; i++) {
            const antaWrapper = document.createElement('a-box');
            antaWrapper.setAttribute('material', materials.chiaro);
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
            antaWrapper.setAttribute('material', materials.chiaro);
            antaWrapper.setAttribute("width", antaNotFull.width);
            antaWrapper.setAttribute("height", antaNotFull.height);
            antaWrapper.setAttribute("depth", antaNotFull.depth);
            antaWrapper.object3D.scale.set(.99, 1, 1);
            setPos(antaWrapper, [(antaFull.width * 3) + antaNotFull.width * i, cassettiTotalH, armadio.depth]);
            
            armadioWrapper.appendChild(antaWrapper);
        }

        // maniglie ante
        const maniglia = {
            width: .05,
            height: .1,
            depth: .02,
            y: 1.2,
            z: armadio.depth + antaFull.depth
        };
        const maniglia1El = makeBox(maniglia, materials.col1);
        setPos(maniglia1El, [
            antaFull.width - maniglia.width, 
            maniglia.y, 
            maniglia.z
        ]);
        const maniglia2El = makeBox(maniglia, materials.col1);
        setPos(maniglia2El, [
            antaFull.width, 
            maniglia.y, 
            maniglia.z
        ]);
        const maniglia3El = makeBox(maniglia, materials.col1);
        setPos(maniglia3El, [
            (antaFull.width * 3) - maniglia.width, 
            maniglia.y, 
            maniglia.z
        ]);
        const maniglia4El = makeBox(maniglia, materials.col1);
        setPos(maniglia4El, [
            (antaFull.width * 4) - maniglia.width, 
            maniglia.y, 
            maniglia.z
        ]);
        const maniglia5El = makeBox(maniglia, materials.col1);
        setPos(maniglia5El, [
            (antaFull.width * 4), 
            maniglia.y, 
            maniglia.z
        ]);

        armadioWrapper.appendChild(maniglia1El);
        armadioWrapper.appendChild(maniglia2El);
        armadioWrapper.appendChild(maniglia3El);
        armadioWrapper.appendChild(maniglia4El);
        armadioWrapper.appendChild(maniglia5El);


        // cassetti
        for (let i=0; i<2; i++) {
            const cassettoEl = document.createElement('a-box');
            cassettoEl.setAttribute('material', materials.col1);
            cassettoEl.setAttribute("width", cassetto.width);
            cassettoEl.setAttribute("height", cassetto.height);
            cassettoEl.setAttribute("depth", cassetto.depth);
            cassettoEl.setAttribute("shadow", "cast: true; receive: true");
            cassettoEl.object3D.scale.set(.99, .99, 1);
            setPos(cassettoEl, [antaFull.width * 3, cestone.height + (cassetto.height * i), armadio.depth]);
            
            armadioWrapper.appendChild(cassettoEl);
        }


        const manigliaHor = {
            width: .1,
            height: .05,
            depth: .02,
            z: armadio.depth + antaFull.depth
        };
        const manigliaCass1El = makeBox(manigliaHor, materials.chiaro);
        setPos(manigliaCass1El, [
            (antaFull.width * 4) - (manigliaHor.width / 2), 
            cestone.height + cassetto.height * 2 - manigliaHor.height, 
            manigliaHor.z
        ]);
        const manigliaCass2El = makeBox(manigliaHor, materials.chiaro);
        setPos(manigliaCass2El, [
            (antaFull.width * 4) - (manigliaHor.width / 2), 
            cestone.height + cassetto.height - manigliaHor.height, 
            manigliaHor.z
        ]);
        const manigliaCass3El = makeBox(manigliaHor, materials.chiaro);
        setPos(manigliaCass3El, [
            (antaFull.width * 4) - (manigliaHor.width / 2), 
            cestone.height - manigliaHor.height, 
            manigliaHor.z
        ]);

        armadioWrapper.appendChild(manigliaCass1El);
        armadioWrapper.appendChild(manigliaCass2El);
        armadioWrapper.appendChild(manigliaCass3El);



        // cestone
        const cestoneEl = document.createElement('a-box');
        cestoneEl.setAttribute('material', materials.col1);
        cestoneEl.setAttribute("shadow", "cast: true; receive: true");
        cestoneEl.setAttribute("width", cestone.width);
        cestoneEl.setAttribute("height", cestone.height);
        cestoneEl.setAttribute("depth", cestone.depth);
        cestoneEl.object3D.scale.set(.99, .99, 1);
        setPos(cestoneEl, [antaFull.width * 3, 0, armadio.depth]);
        
        armadioWrapper.appendChild(cestoneEl);



        


        // append 
        armadioWrapper.appendChild(armadioEl);
        sceneEl.appendChild(armadioWrapper);


        
        /* ----------------------------------------------------
            settimino
        ---------------------------------------------------- */
        const settiminoWrapper = document.createElement('a-entity');
        settiminoWrapper.setAttribute("id", "settimino");
        

        const settimino = {
            width: .6,
            height: (cassetto.height * 3) + (cestone.height * 2),
            depth: .4
        };
        const settiminoEl = document.createElement('a-box');
        settiminoEl.setAttribute('material', materials.chiaro);
        settiminoEl.setAttribute("shadow", "cast: true; receive: true");
        settiminoEl.setAttribute("width", settimino.width);
        settiminoEl.setAttribute("height", settimino.height);
        settiminoEl.setAttribute("depth", settimino.depth);
        setPos(settiminoEl, [0, 0, 0]);
        

        // cestoni
        for (let i=0; i<2; i++) {
            const cestoneEl = document.createElement('a-box');
            cestoneEl.setAttribute('material', materials.col1);
            cestoneEl.setAttribute("width", settimino.width);
            cestoneEl.setAttribute("height", cestone.height);
            cestoneEl.setAttribute("depth", cestone.depth);
            cestoneEl.setAttribute("shadow", "cast: true; receive: true");
            cestoneEl.object3D.scale.set(.99, .99, 1);
            
            settiminoWrapper.appendChild(cestoneEl);
            setPos(cestoneEl, [0, (cestone.height * i), settimino.depth]);
        }

        // cassetti
        for (let i=0; i<3; i++) {
            const cassettoEl = document.createElement('a-box');
            cassettoEl.setAttribute('material', materials.chiaro);
            cassettoEl.setAttribute("width", settimino.width);
            cassettoEl.setAttribute("height", cassetto.height);
            cassettoEl.setAttribute("depth", cassetto.depth);
            cassettoEl.setAttribute("shadow", "cast: true; receive: true");
            cassettoEl.object3D.scale.set(.99, .99, 1);
            
            settiminoWrapper.appendChild(cassettoEl);
            setPos(cassettoEl, [0, (cestone.height * 2) + (cassetto.height * i), settimino.depth]);
        }

        const manigliaSettimino = {
            width: .1,
            height: .05,
            depth: .02,
            x: (settimino.width / 2) - .05,
            z: settimino.depth + cassetto.depth
        };
        const manigliaSettimino1El = makeBox(manigliaSettimino, materials.col1);
        setPos(manigliaSettimino1El, [
            manigliaSettimino.x,
            (cestone.height * 2) + (cassetto.height * 3) - manigliaSettimino.height, 
            manigliaSettimino.z
        ]);
        const manigliaSettimino2El = makeBox(manigliaSettimino, materials.col1);
        setPos(manigliaSettimino2El, [
            manigliaSettimino.x,
            (cestone.height * 2) + cassetto.height, 
            manigliaSettimino.z
        ]);
        const manigliaSettimino3El = makeBox(manigliaSettimino, materials.col1);
        setPos(manigliaSettimino3El, [
            manigliaSettimino.x,
            (cestone.height * 2) + cassetto.height - manigliaSettimino.height, 
            manigliaSettimino.z
        ]);
        const manigliaSettimino4El = makeBox(manigliaSettimino, materials.chiaro);
        setPos(manigliaSettimino4El, [
            manigliaSettimino.x,
            (cestone.height * 2) - manigliaSettimino.height, 
            manigliaSettimino.z
        ]);
        const manigliaSettimino5El = makeBox(manigliaSettimino, materials.chiaro);
        setPos(manigliaSettimino5El, [
            manigliaSettimino.x,
            cestone.height - manigliaSettimino.height, 
            manigliaSettimino.z
        ]);

        settiminoWrapper.appendChild(manigliaSettimino1El);
        settiminoWrapper.appendChild(manigliaSettimino2El);
        settiminoWrapper.appendChild(manigliaSettimino3El);
        settiminoWrapper.appendChild(manigliaSettimino4El);
        settiminoWrapper.appendChild(manigliaSettimino5El);



        
        setPos(settiminoWrapper, [ roomW, 0, 1]);        
        settiminoWrapper.setAttribute("rotation", "0 -90 0");

        settiminoWrapper.appendChild(settiminoEl);
        sceneEl.appendChild(settiminoWrapper);
        

        /* ----------------------------------------------------
            comodino
        ---------------------------------------------------- */
        const comodinoWrapper = document.createElement('a-entity');
        comodinoWrapper.setAttribute("id", "comodino");
        

        const comodino = {
            width: .45,
            height: (cassetto.height * 2),
            depth: .482
        };
        const comodinoEl = document.createElement('a-box');
        comodinoEl.setAttribute('material', materials.col1);
        comodinoEl.setAttribute("shadow", "cast: true; receive: true");
        comodinoEl.setAttribute("width", comodino.width);
        comodinoEl.setAttribute("height", comodino.height);
        comodinoEl.setAttribute("depth", comodino.depth);
        setPos(comodinoEl, [0, 0, 0]);
        

        // cassetti
        for (let i=0; i<2; i++) {
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
        
        setPos(comodinoWrapper, [ 0, 0, 2.8]);        
        comodinoWrapper.setAttribute("rotation", "0 90 0");

        comodinoWrapper.appendChild(comodinoEl);
        sceneEl.appendChild(comodinoWrapper);



        /* ----------------------------------------------------
            scrivania
        ---------------------------------------------------- */
        const scrivaniaWrapper = document.createElement('a-entity');
        const ponteWrapper = document.createElement('a-entity');
    
        const scrittoio = {
            width: 1.5,
            height: .03,
            depth: .60,
            x: 0,
            y: .63,
            z: 0
        };
        const scrittoioEl = document.createElement('a-box');
        scrittoioEl.setAttribute('material', 'src: #mandorlo; roughness: 1; repeat: 5 2');
        scrittoioEl.setAttribute("shadow", "cast: true; receive: true");
        scrittoioEl.setAttribute("width", scrittoio.width);
        scrittoioEl.setAttribute("height", scrittoio.height);
        scrittoioEl.setAttribute("depth", scrittoio.depth);
        setPos(scrittoioEl, [0, scrittoio.y, 0]);

        const ripianoScrivaniaEl = makeBox(
            {width: scrittoio.width, height: scrittoio.height, depth: .3},
            materials.chiaro
        );
        setPos(ripianoScrivaniaEl, [0, 1.2, 0]);
        ponteWrapper.appendChild(ripianoScrivaniaEl);

        
        const ponteSide = {
            width: .03,
            height: 2.2,
            depth: .30
        };
        const ponteSxEl = document.createElement('a-box');
        ponteSxEl.setAttribute('material', materials.chiaro);
        ponteSxEl.setAttribute("shadow", "cast: true; receive: true");
        ponteSxEl.setAttribute("width", ponteSide.width);
        ponteSxEl.setAttribute("height", ponteSide.height);
        ponteSxEl.setAttribute("depth", ponteSide.depth);
        setPos(ponteSxEl, [-ponteSide.width, 0, 0]);
        ponteWrapper.appendChild(ponteSxEl);

        const ponteDxEl = document.createElement('a-box');
        ponteDxEl.setAttribute('material', materials.chiaro);
        ponteDxEl.setAttribute("shadow", "cast: true; receive: true");
        ponteDxEl.setAttribute("width", ponteSide.width);
        ponteDxEl.setAttribute("height", ponteSide.height);
        ponteDxEl.setAttribute("depth", ponteSide.depth);
        setPos(ponteDxEl, [scrittoio.width, 0, 0]);
        ponteWrapper.appendChild(ponteDxEl);

        // cassone
        const cassone = {
            height: .6
        };
        const ponteCassone = document.createElement('a-box');
        ponteCassone.setAttribute('material', materials.chiaro);
        ponteCassone.setAttribute("shadow", "cast: true; receive: true");
        ponteCassone.setAttribute("width", scrittoio.width);
        ponteCassone.setAttribute("height", cassone.height);
        ponteCassone.setAttribute("depth", ponteSide.depth);
        setPos(ponteCassone, [0, ponteSide.height - cassone.height, 0]);
        ponteWrapper.appendChild(ponteCassone);

        // maniglie
        const manigliaScrivania = {
            width: .05,
            height: .1,
            depth: .02,
            y: ponteSide.height - cassone.height,
            z: ponteSide.depth
        };
        const manigliaScrivania1El = makeBox(manigliaScrivania, materials.col1);
        setPos(manigliaScrivania1El, [
            scrittoio.width / 3 - manigliaScrivania.width,
            manigliaScrivania.y, 
            manigliaScrivania.z
        ]);
        const manigliaScrivania2El = makeBox(manigliaScrivania, materials.col1);
        setPos(manigliaScrivania2El, [
            scrittoio.width / 3,
            manigliaScrivania.y,
            manigliaScrivania.z
        ]);
        const manigliaScrivania3El = makeBox(manigliaScrivania, materials.col1);
        setPos(manigliaScrivania3El, [
            (scrittoio.width / 3) * 2,
            manigliaScrivania.y,
            manigliaScrivania.z
        ]);

        scrivaniaWrapper.appendChild(manigliaScrivania1El);
        scrivaniaWrapper.appendChild(manigliaScrivania2El);
        scrivaniaWrapper.appendChild(manigliaScrivania3El);
        
       
        // append
        setPos(scrivaniaWrapper, [roomW, 0, roomD - (scrittoio.width + ponteSide.width)]); 
        scrivaniaWrapper.setAttribute("rotation", "0 -90 0");

        scrivaniaWrapper.appendChild(ponteWrapper);
        scrivaniaWrapper.appendChild(scrittoioEl);
        sceneEl.appendChild(scrivaniaWrapper);





        /* ----------------------------------------------------
            radiator
        ---------------------------------------------------- */
        const radiator = {
            width: .8,
            height: .7,
            depth: .12,
            y: .06
        };

        const radiatorWrapper = document.createElement('a-entity');
        radiatorWrapper.setAttribute("id", "radiator");

        const radiatorEl = document.createElement('a-box');
        radiatorEl.setAttribute("shadow", "cast: true; receive: true");
        radiatorEl.setAttribute("width", radiator.width);
        radiatorEl.setAttribute("height", radiator.height);
        radiatorEl.setAttribute("depth", radiator.depth);
        setPos(radiatorEl, [0, 0, 0]);

        setPos(radiatorWrapper, [
            roomW - .85 - radiator.width, 
            radiator.y, 
            roomD - radiator.depth
        ]);

        radiatorWrapper.appendChild(radiatorEl);
        sceneEl.appendChild(radiatorWrapper);


    }
});



AFRAME.registerComponent('modify-materials', {
    init: function () {
        // Wait for model to load.
        this.el.addEventListener('model-loaded', () => {
            // Grab the mesh / scene.
            const obj = this.el.getObject3D('mesh');
            // Go over the submeshes and modify materials we want.

            

            obj.traverse(node => {
                // console.log(node.material)
                if (node.name.indexOf('M') !== -1) { 
                    console.log(node.material)
                    // node.material.map.image.set("#nuvola");
                    // node.material.map.repeat = "2 1 0";
                    node.material.color.set('#ffffff');
                    // node.material.opacity = 0;
                }
            });
        });
    },

    multiple: true,
});
