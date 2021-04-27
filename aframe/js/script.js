import { 
    makeBox,
    makeWrappedBox,
    materials,
    room,
    setPos,
    Size
} from "./utils.js";
import { comodinoWrapper } from "./comodino.js";
import { scrivaniaWrapper } from "./scrivania.js";
import { mensolaWrapper } from "./mensola.js";







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
        setPos(cameraEl, [0, 1.4, 0]);

        setPos(cameraWrapper, [ room.width / 2, 0, room.depth / 2]);
        cameraWrapper.appendChild(cameraEl);
        sceneEl.appendChild(cameraWrapper);


        /* ----------------------------------------------------
            lampadario
        ---------------------------------------------------- */
        const lampadarioWrapper = document.createElement('a-entity');
        const lightEl = document.createElement('a-light');
        lampadarioWrapper.setAttribute('id', "lampadario");
        lightEl.setAttribute('light', {
            angle: 120,
            type: "spot",
            intensity: .7,
            penumbra: 0,  
            castShadow: true
        });
        
        setPos(lampadarioWrapper, [
            room.width / 2,
            3,
            room.depth / 2
        ]);
        lampadarioWrapper.setAttribute('rotation', "-90 0 0");
        lampadarioWrapper.appendChild(lightEl);
        sceneEl.appendChild(lampadarioWrapper);


        /* ----------------------------------------------------
            luce finestra
        ---------------------------------------------------- */
        const lightWindow = document.createElement('a-entity');
        lightWindow.setAttribute('id', "luce-finestra");
        lightWindow.setAttribute('light', {
            angle: 100,
            type: "spot",
            intensity: .8,
            penumbra: 1,  
            castShadow: true
        });
        setPos(lightWindow, [ room.width - .7, 2, room.depth]);
        sceneEl.appendChild(lightWindow);


        /* ----------------------------------------------------
            luce porta
        ---------------------------------------------------- */
        const lightDoor = document.createElement('a-entity');
        lightDoor.setAttribute('id', "luce-porta");
        lightDoor.setAttribute('rotation', "0 -180 0");
        lightDoor.setAttribute('light', {
            type: "spot",
            intensity: 1,
            penumbra: 1,  
        });
        setPos(lightDoor, [ room.width - .45, 1.5, 0]);
        sceneEl.appendChild(lightDoor);


        /* ----------------------------------------------------
            stanza
        ---------------------------------------------------- */
        const roomEl = document.createElement('a-box');
        roomEl.setAttribute("width", room.width);
        roomEl.setAttribute("height", "2.8");
        roomEl.setAttribute("depth", room.depth);
        setPos(roomEl, [0, -.001, 0]);
        roomEl.setAttribute('material', {
            src: "#stucco", 
            normalMap: "#stucco-nrm", 
            normalTextureRepeat: "1 1", 
            normalScale: "-.1 -.1",
            repeat: "1 1", 
            roughness: .9,
            side: "back"
        });
        roomEl.object3D.scale.set(-1, 1, 1);
        roomEl.setAttribute("shadow", "receive: true");
        sceneEl.appendChild(roomEl);


        /* ----------------------------------------------------
            Cassa Serranda
        ---------------------------------------------------- */
        const serranda = new Size(1.5, .29, .12);
        const serrandaEl = makeWrappedBox(
            serranda,
            "src: #stucco"
        );
        serrandaEl.setAttribute("id", `serranda`);
        serrandaEl.setAttribute("rotation", `0 180 0`);
        serrandaEl.setAttribute("position", `${room.width - .5}, ${room.height - serranda.height}, ${room.depth}`);
        sceneEl.appendChild(serrandaEl);



        /* ----------------------------------------------------
            parquet
        ---------------------------------------------------- */
        const floorEl = document.createElement('a-box');
        floorEl.setAttribute("width", room.width);
        floorEl.setAttribute("height", ".1");
        floorEl.setAttribute("depth", room.depth);
        floorEl.setAttribute('material', 'src: #parquet; roughness: .5; side: double');
        floorEl.setAttribute("shadow", "cast: false; receive: true");
        setPos(floorEl, [0, -.1, 0]);
        sceneEl.appendChild(floorEl);

       


        /* ----------------------------------------------------
            armadio
        ---------------------------------------------------- */
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
            (cestone.height * 2) + (cassetto.height * 2), 
            manigliaSettimino.z
        ]);
        const manigliaSettimino2El = makeBox(manigliaSettimino, materials.col1);
        setPos(manigliaSettimino2El, [
            manigliaSettimino.x,
            (cestone.height * 2) + (cassetto.height * 2) - manigliaSettimino.height,  
            manigliaSettimino.z
        ]);
        const manigliaSettimino3El = makeBox(manigliaSettimino, materials.col1);
        setPos(manigliaSettimino3El, [
            manigliaSettimino.x,
            (cestone.height * 2), 
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



        
        setPos(settiminoWrapper, [ room.width, 0, .88]);        
        settiminoWrapper.setAttribute("rotation", "0 -90 0");

        settiminoWrapper.appendChild(settiminoEl);
        sceneEl.appendChild(settiminoWrapper);
        

        /* ----------------------------------------------------
            Comodino
        ---------------------------------------------------- */
        sceneEl.appendChild(comodinoWrapper);



        /* ----------------------------------------------------
            prese a muro sx
        ---------------------------------------------------- */
        const preseMuroSx = new Size(.26, .08, .01);
        const preseMuroSxWrapper = document.createElement('a-entity'); 
        preseMuroSxWrapper.setAttribute('rotation', "0 -90 0"); 
        preseMuroSxWrapper.setAttribute('id', "prese-muro-sx"); 
        setPos(preseMuroSxWrapper, [ room.width, .26, room.depth - 1.97 - preseMuroSx.width]);

        const preseMuroSxEl = makeBox(
            preseMuroSx,
            materials.chiaro
        );
        setPos(preseMuroSxEl, [0, 0, 0]);
        
        preseMuroSxWrapper.appendChild(preseMuroSxEl);
        sceneEl.appendChild(preseMuroSxWrapper);






        /* ----------------------------------------------------
            scrivania
        ---------------------------------------------------- */
        sceneEl.appendChild(scrivaniaWrapper);


        /* ----------------------------------------------------
            Colonna
        ---------------------------------------------------- */
        const colonnaSize = new Size(.45, 2.1, .4);
        const colonna = makeWrappedBox(
            colonnaSize,
            materials.chiaro
        );
        colonna.setAttribute("id", `colonna`);
        colonna.setAttribute("position", `${room.width}, 0, ${room.depth - colonnaSize.width}`);
        colonna.setAttribute("rotation", "0 -90 0");
        sceneEl.appendChild(colonna);


        


        /* ----------------------------------------------------
            blocco1
        ---------------------------------------------------- */
        const bloccoSize = new Size(.9, .3, .3);
        const blocco1el = makeWrappedBox(
            bloccoSize,
            materials.col1
        );
        blocco1el.setAttribute("id", `blocco1el`);
        blocco1el.setAttribute("position", `${room.width}, 1.70, ${room.depth - colonnaSize.width - bloccoSize.width}`);
        blocco1el.setAttribute("rotation", "0 -90 0");
        sceneEl.appendChild(blocco1el);


        /* ----------------------------------------------------
            mensola
        ---------------------------------------------------- */
        mensolaWrapper.setAttribute("position", `3.73, 2, 1`);
        sceneEl.appendChild(mensolaWrapper);






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
            room.width - .85 - radiator.width, 
            radiator.y, 
            room.depth - radiator.depth
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
                    //console.log(node.material)
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


AFRAME.registerGeometry('example', {
    schema: {
        vertices: {
            default: ['-10 10 0', '-10 -10 0', '10 -10 0', '10 -10 0'],
        }
    },

    init: function (data) {
        var geometry = new THREE.BufferGeometry();


        geometry.vertices = data.vertices.map(function (vertex) {
            var points = vertex.split(' ').map(function (x) { return parseInt(x); });
            return new THREE.Vector3(points[0], points[1], points[2]);
        });
        geometry.computeBoundingBox();
        geometry.faces.push(new THREE.Face3(0, 1, 2));
        geometry.faces.push(new THREE.Face3(0, 2, 3));
        geometry.mergeVertices();
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        this.geometry = geometry;
    }
});


AFRAME.registerComponent('couch', {
    init: function () {
      console.log('Hello, World!');
    }
});
