import { 
    makeBox,
    makeWrappedBox,
    materials,
    room,
    setPos,
    Size
} from "./utils.js";
import { armadioWrapper } from "./armadio.js";
import { colonnaWrapper } from "./colonna.js";
import { comodinoWrapper } from "./comodino.js";
import { scrivaniaWrapper } from "./scrivania.js";




AFRAME.registerGeometry('tenda', {
    init () {
        const w = .1 //.025;

        const tenda = new THREE.Shape();

        tenda.moveTo( 0, 0 );
        for (let i=0; i<1; i++) {
            if (i % 2 === 0) {
                tenda.bezierCurveTo( 
                    // w * i, w, 
                    // w * i, w, 
                    // w * i, w
                    0, .2,
                    .2, .2,
                    .2, 0,
                );
                tenda.bezierCurveTo( 
                    // w * i, w, 
                    // w * i, w, 
                    // w * i, w
                    .2, -.2,
                    .4, -.2,
                    .4, 0,
                );
            } else {
                tenda.bezierCurveTo( 
                    w * i, w * -1, 
                    w * i, w * -1, 
                    w * i, w
                );
            }
        }

        

        const extrudeSettings = { depth: 2.2, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0, bevelThickness: 0 };

        const geometry = new THREE.ExtrudeGeometry( tenda, extrudeSettings );
        geometry.computeFaceNormals();

        this.geometry = geometry;

    }
});

AFRAME.registerGeometry('muro-finestra', {
    init: function (data) {

        const finestraSize = new Size(1.5, 1.5, .3);
        const finestraX = room.width - .5 - finestraSize.width;

        const muro = new THREE.Shape();

        muro.moveTo( 0, 0 );
        muro.lineTo( 0, room.height );
        muro.lineTo( room.width, room.height );
        muro.lineTo( room.width, 0 );

        const hole = new THREE.Shape();
        hole.moveTo( finestraX, .95 );
        hole.lineTo( finestraX, .95 + finestraSize.height );
        hole.lineTo( finestraX + finestraSize.width, .95 + finestraSize.height );
        hole.lineTo( finestraX + finestraSize.width, .95 );


        muro.holes.push(hole);

        const extrudeSettings = { depth: .2, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0, bevelThickness: 0 };

        const geometry = new THREE.ExtrudeGeometry( muro, extrudeSettings );
        geometry.computeFaceNormals();

        this.geometry = geometry;

    }
});


AFRAME.registerGeometry('muro-porta', {
    init: function () {

        const portaSize = new Size(.83, 2.1, .3);
        const portaX = room.width - 1;

        const muro = new THREE.Shape();

        muro.moveTo( 0, 0 );
        muro.lineTo( 0, room.height );
        muro.lineTo( room.width, room.height );
        muro.lineTo( room.width, 0 );

        const hole = new THREE.Shape();
        hole.moveTo( portaX, 0 );
        hole.lineTo( portaX, portaSize.height );
        hole.lineTo( portaX + portaSize.width, portaSize.height );
        hole.lineTo( portaX + portaSize.width, 0 );


        muro.holes.push(hole);

        const extrudeSettings = { depth: .2, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0, bevelThickness: 0 };

        const geometry = new THREE.ExtrudeGeometry( muro, extrudeSettings );
        geometry.computeFaceNormals();

        this.geometry = geometry;

    }
});



AFRAME.registerGeometry('maniglia-triangolo', {
    schema: {
        depth: {default: 1, min: 0},
        height: {default: 1, min: 0},
        width: {default: 1, min: 0}
    },
    init: function (data) {

        const shape = new THREE.Shape();
        shape.moveTo( 0, .05 );
        shape.lineTo( .05, 0 );
        shape.lineTo( 0, -.05 );
        shape.lineTo( 0, .05 );
        
        
        const extrudeSettings = { depth: .01, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0, bevelThickness: 0 };

        const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

        this.geometry = geometry;

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
        cameraWrapper.setAttribute("id", "camera");
        

        const cameraEl = document.createElement('a-camera');
        cameraEl.setAttribute("wasd-controls", "acceleration: 20");
        cameraEl.setAttribute("spectator", "true");
        cameraEl.setAttribute("fov", "60");
        cameraWrapper.setAttribute("rotation", "0 -60 0");
        //setPos(cameraEl, [0, 1.4, 0]);

        setPos(cameraWrapper, [1.475, 0, 2.634]);
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
            intensity: 7,
            penumbra: 0,  
            castShadow: true
        });
        
        setPos(lampadarioWrapper, [
            room.width / 2,
            2.667,
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
            intensity: 4,
            penumbra: 1,  
            castShadow: true
        });
        setPos(lightWindow, [ room.width - 1.5, 2, 5]);
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
        roomEl.setAttribute("height", room.height);
        roomEl.setAttribute("depth", room.depth);
        setPos(roomEl, [0, -.001, 0]);
        roomEl.setAttribute('material', {
            src: "#stucco", 
            normalMap: "#stucco-nrm", 
            normalTextureRepeat: "2 2", 
            normalScale: "-.01 -.01",
            repeat: "2 2", 
            roughness: .99,
            side: "back"
        });
        roomEl.object3D.scale.set(-1, 1, 1);
        roomEl.setAttribute("shadow", "receive: true");
        // sceneEl.appendChild(roomEl);

        const muroFinestra = document.createElement('a-entity');
        muroFinestra.setAttribute("id", "muro-finestra");
        muroFinestra.setAttribute("geometry", "primitive: muro-finestra");
        muroFinestra.setAttribute("position", `0, 0, ${room.depth}`);
        muroFinestra.setAttribute("material", {
            src: "#stucco", 
            normalMap: "#stucco-nrm", 
            normalTextureRepeat: "2 2", 
            normalScale: "-.01 -.01",
            repeat: "2 2", 
            roughness: .99,
            side: "double"
        });
        sceneEl.appendChild(muroFinestra);

        const muroPorta = document.createElement('a-entity');
        muroPorta.setAttribute("id", "muro-porta");
        muroPorta.setAttribute("geometry", "primitive: muro-porta");
        muroPorta.setAttribute("position", "0, -.001, 0");
        muroPorta.setAttribute("material", {
            src: "#stucco", 
            normalMap: "#stucco-nrm", 
            normalTextureRepeat: "2 2", 
            normalScale: "-.01 -.01",
            repeat: "2 2", 
            roughness: .99,
            side: "double" 
        });  
        sceneEl.appendChild(muroPorta);


        const muroScrivania = makeWrappedBox(
            new Size(.2, room.height, room.depth),
            "src: #stucco"
        );
        setPos(muroScrivania, [room.width, 0, 0]);
        sceneEl.appendChild(muroScrivania);

        const muroletti = makeWrappedBox(
            new Size(.2, room.height, room.depth),
            //"src: #stucco; color: #50a7d3"
            "src: #carta-parati; repeat: 2 2;"
        );
        setPos(muroletti, [-.2, 0, 0]);
        sceneEl.appendChild(muroletti);

        const soffitto = makeWrappedBox(
            new Size(room.width, .2, room.depth),
            "src: #stucco; roughness: .5; side: double"
        );
        setPos(soffitto, [0, room.height, 0]);
        sceneEl.appendChild(soffitto);


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
        floorEl.setAttribute("height", ".001");
        floorEl.setAttribute("depth", room.depth);
        floorEl.setAttribute('material', 'src: #parquet; roughness: .5; side: double');
        floorEl.setAttribute("shadow", "cast: false; receive: true");
        setPos(floorEl, [0, -.001, 0]);
        sceneEl.appendChild(floorEl);



        /* ----------------------------------------------------
            armadio
        ---------------------------------------------------- */
        sceneEl.appendChild(armadioWrapper);


        
        /* ----------------------------------------------------
            settimino
        ---------------------------------------------------- */
        const settiminoWrapper = document.createElement('a-entity');
        settiminoWrapper.setAttribute("id", "settimino");
        
        const cassetto = {
            height: .18,
            depth: .03
        };   
        const cestone = {
            height: cassetto.height * 2,
            depth: .03
        };   
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
        const colonnaSize = new Size(.4, 2.1, .4);
        
        
        colonnaWrapper.setAttribute("position", `${room.width}, 0, ${room.depth - colonnaSize.width - .01}`);
        colonnaWrapper.setAttribute("rotation", "0 -90 0");
        sceneEl.appendChild(colonnaWrapper);

        const fianco2 = makeWrappedBox(
            new Size(.03, room.height, .3),
            materials.col3
        );
        fianco2.setAttribute("id", "fianco2");
        fianco2.setAttribute("position", `${room.width}, 0, 1.75`);
        fianco2.setAttribute("rotation", "0 -90 0");
        // sceneEl.appendChild(fianco2);



        


        /* ----------------------------------------------------
            blocchi
        ---------------------------------------------------- */
        const bloccoSize = new Size(.75, .6, .3);
        const blocco1el = makeWrappedBox(
            bloccoSize,
            materials.col3
        );
        blocco1el.setAttribute("id", `blocco1el`);
        blocco1el.setAttribute("position", `${room.width}, 1.70, ${room.depth - colonnaSize.width - bloccoSize.width}`);
        blocco1el.setAttribute("rotation", "0 -90 0");
       //  sceneEl.appendChild(blocco1el);


        const blocco2el = makeWrappedBox(
            bloccoSize,
            materials.col3
        );
        blocco2el.setAttribute("id", `blocco2el`);
        blocco2el.setAttribute("position", `${room.width}, 1.70, ${room.depth - colonnaSize.width - (bloccoSize.width * 2)}`);
        blocco2el.setAttribute("rotation", "0 -90 0");
       //  sceneEl.appendChild(blocco2el);


        


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


        /* ----------------------------------------------------
            guida tenda
        ---------------------------------------------------- */
        const guidaTendaSize = new Size(1.9, .05, .015);
        const guidaTenda = makeWrappedBox(
            guidaTendaSize,
            materials.chiaro
        );
        setPos(guidaTenda, [
            room.width - guidaTendaSize.width - .3, 
            room.height - guidaTendaSize.height, 
            room.depth - .16
        ]);
        sceneEl.appendChild(guidaTenda);

        const tenda = makeWrappedBox(
            new Size(guidaTendaSize.width - .3, room.height - guidaTendaSize.height, .002), 
            'src: #tenda; roughness: .45; opacity: .7; repeat: 2 6'
        );
        tenda.setAttribute('id', "tenda");
        tenda.setAttribute("position", `${room.width - guidaTendaSize.width - .2}, 0, ${room.depth - .16}`);
        sceneEl.appendChild(tenda);


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

AFRAME.registerGeometry('example1', {
    schema: {
        vertices: {
            default: ['-10 10 0', '-10 -10 0', '10 -10 0'],
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
        geometry.mergeVertices();
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        this.geometry = geometry;
    }
});

