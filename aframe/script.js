

function setPos (el, position, noScale) {

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


function makeRoom (val) {
   
}





AFRAME.registerComponent('scene-init', {
    init () {
        const roomW = 3.73;
        const roomD = 3.73;



        const sceneEl = this.el;

        sceneEl.setAttribute("color", "#cccccc")

        const cameraWrapper = document.createElement('a-entity');
        setPos(cameraWrapper, [0, 0, 0]);

        const cameraEl = document.createElement('a-camera');
        cameraEl.setAttribute("wasd-controls", "acceleration: 40");
        cameraEl.setAttribute("fov", "40");
        setPos(cameraEl, [ roomW / 2, 1.7, 8]);
        cameraWrapper.appendChild(cameraEl);
        sceneEl.appendChild(cameraWrapper);


        /* ----------------------------------------------------
            lampadario
        ---------------------------------------------------- */
        const lightEl = document.createElement('a-entity');
        lightEl.setAttribute('light', {
            angle: 120,
            type: "spot",
            intensity: .96,
            penumbra: .6,  
            castShadow: true
        });
        lightEl.setAttribute('rotation', "-90");
        setPos(lightEl, [
            roomW / 2,
            2.8,
            roomD / 2
        ], true);
        sceneEl.appendChild(lightEl);


        /* ----------------------------------------------------
            luce finestra
        ---------------------------------------------------- */
        const lightWindow = document.createElement('a-entity');
        lightWindow.setAttribute('light', {
            angle: 120,
            type: "spot",
            intensity: .46,
            penumbra: .8,  
            castShadow: true
        });
        setPos(lightWindow, [ roomW - .7, 2, roomD]);
        sceneEl.appendChild(lightWindow);


        /* ----------------------------------------------------
            luce porta
        ---------------------------------------------------- */
        const lightDoor = document.createElement('a-entity');
        lightDoor.setAttribute('light', {
            angle: 120,
            type: "spot",
            intensity: .16,
            penumbra: .8,  
            castShadow: true
        });
        lightEl.setAttribute('rotation', "-180");
        setPos(lightDoor, [ roomW - .45, 1.5, .1]);
        sceneEl.appendChild(lightDoor);


        // stanza
        const room = document.createElement('a-box');
        room.setAttribute("width", roomW);
        room.setAttribute("height", "2.8");
        room.setAttribute("depth", roomD);
        setPos(room, [0, -.001, 0]);
        room.setAttribute('material', {
            src: "#stucco", 
            metalness: 0,
            normalMap: "#stucco-nrm", 
            normalTextureRepeat: "1 1", 
            normalScale: "-.1 -.1",
            repeat: "1 1", 
            roughness: .5,
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
        for (let i=0; i<3; i++) {
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
        comodinoEl.setAttribute('material', 'src: #zenzero; roughness: 1;');
        comodinoEl.setAttribute("shadow", "cast: true; receive: true");
        comodinoEl.setAttribute("width", comodino.width);
        comodinoEl.setAttribute("height", comodino.height);
        comodinoEl.setAttribute("depth", comodino.depth);
        setPos(comodinoEl, [0, 0, 0]);
        

        // cassetti
        for (let i=0; i<2; i++) {
            const cassettoEl = document.createElement('a-box');
            cassettoEl.setAttribute('material', 'src: #zenzero;');
            cassettoEl.setAttribute("width", comodino.width);
            cassettoEl.setAttribute("height", cassetto.height);
            cassettoEl.setAttribute("depth", cassetto.depth);
            cassettoEl.setAttribute("shadow", "cast: true; receive: true");
            cassettoEl.object3D.scale.set(.99, .99, 1);
            
            comodinoWrapper.appendChild(cassettoEl);
            setPos(cassettoEl, [0, cassetto.height * i, comodino.depth]);
        }
        
        setPos(comodinoWrapper, [ 0, 0, 2]);        
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
            depth: .70,
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

        
        const ponteSide = {
            width: .03,
            height: 2,
            depth: .30
        };
        const ponteSxEl = document.createElement('a-box');
        ponteSxEl.setAttribute('material', 'src: #olmo; roughness: 1;');
        ponteSxEl.setAttribute("shadow", "cast: true; receive: true");
        ponteSxEl.setAttribute("width", ponteSide.width);
        ponteSxEl.setAttribute("height", ponteSide.height);
        ponteSxEl.setAttribute("depth", ponteSide.depth);
        setPos(ponteSxEl, [-ponteSide.width, 0, 0]);
        ponteWrapper.appendChild(ponteSxEl);

        const ponteDxEl = document.createElement('a-box');
        ponteDxEl.setAttribute('material', 'src: #olmo; roughness: 1;');
        ponteDxEl.setAttribute("shadow", "cast: true; receive: true");
        ponteDxEl.setAttribute("width", ponteSide.width);
        ponteDxEl.setAttribute("height", ponteSide.height);
        ponteDxEl.setAttribute("depth", ponteSide.depth);
        setPos(ponteDxEl, [(scrittoio.width + ponteSide.width), 0, 0]);
        ponteWrapper.appendChild(ponteDxEl);

        // cassone
        const cassone = {
            height: .6
        };
        const ponteCassone = document.createElement('a-box');
        ponteCassone.setAttribute('material', 'src: #olmo; roughness: 1;');
        ponteCassone.setAttribute("shadow", "cast: true; receive: true");
        ponteCassone.setAttribute("width", scrittoio.width);
        ponteCassone.setAttribute("height", cassone.height);
        ponteCassone.setAttribute("depth", ponteSide.depth);
        setPos(ponteCassone, [0, ponteSide.height - cassone.height, 0]);
        ponteWrapper.appendChild(ponteCassone);
        
       
        setPos(scrivaniaWrapper, [roomW, 0, roomD - (scrittoio.width + (ponteSide.width * 2))]); 
        scrivaniaWrapper.setAttribute("rotation", "0 -90 0");

        scrivaniaWrapper.appendChild(ponteWrapper);
        scrivaniaWrapper.appendChild(scrittoioEl);
        sceneEl.appendChild(scrivaniaWrapper);


        /* ----------------------------------------------------
            letto
        ---------------------------------------------------- */
        const lettoWrapper = document.createElement('a-entity');
        lettoWrapper.setAttribute("id", "letto");

        const letto = {
            width: .8,
            height: .2,
            depth: 1.9
        };
        const lettoEl = document.createElement('a-box');
        lettoEl.setAttribute('material', 'src: #papaya;');
        lettoEl.setAttribute("shadow", "cast: true; receive: true");
        lettoEl.setAttribute("width", letto.width);
        lettoEl.setAttribute("height", letto.height);
        lettoEl.setAttribute("depth", letto.depth);
        setPos(lettoEl, [0, .2, 0]);
        
        setPos(lettoWrapper, [0, 0, roomD]);
        lettoWrapper.setAttribute("rotation", "0 90 0");

        lettoWrapper.appendChild(lettoEl);
        sceneEl.appendChild(lettoWrapper);

    }
});

