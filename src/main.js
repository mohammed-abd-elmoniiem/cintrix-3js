

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './style.css'

import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/examples/jsm/Addons.js'



const gui = new GUI()










// import canvas element  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const canvasElement = document.getElementById('canvas');
const canvasAspect ={
  width:function(){return canvasElement.getBoundingClientRect().width},
  height:function(){return canvasElement.getBoundingClientRect().height},
  ascpect:function(){return this.width()/this.height()}

}

console.log(canvasAspect.ascpect())

// -----------------------------------------------------------------------------------------------------



// initialization => scene , renderer , camera +++++++++++++++++++++++++++++++++++++++++++++++

const scene = new THREE.Scene()
scene.fog = new THREE.Fog(0x000000,0.1,20);

const setFog= {
  far:15,
  existing:true
}

gui.add(setFog,'far',1,200,1).name('far fog').onChange(value=>{scene.fog = setFog.existing ?  new THREE.Fog(0x000000,0.1,value) : null;
})

gui.add(setFog,'existing').name('enable fog').onChange(value=>{scene.fog = value? new THREE.Fog(0x000000,0.1,setFog.far):null;
})



// scene.environment = enviroment
// scene.background = enviroment

const camera = new THREE.PerspectiveCamera(75,canvasAspect.ascpect(),0.1,3000);

camera.position.set(-3,-3,-3)



const renderer = new THREE.WebGLRenderer({canvas:canvasElement,antialias:true});
renderer.setSize(canvasAspect.width(),canvasAspect.height());
renderer.setPixelRatio(Math.min(2,window.devicePixelRatio));




renderer.render(scene,camera)





// ----------------------------------------------------------------------------------------------


// objects +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


const geocube = new THREE.BoxGeometry(200,200,200)
const mat = new THREE.MeshPhysicalMaterial({color:0xffffff,side:THREE.DoubleSide})


const enviroment = new THREE.Mesh(geocube,mat)


// scene.add(enviroment)

// cintrix

const count = 10

const cintrix = createCintrix(count);
// cintrix.position.x = -3

// cintrix.geometry.center();
//   cintrix.geometry?.center()

// gsap.to(cintrix.rotation,{
//   duration:15,
//   x:3.14,
//   repeat:-1,
//   ease:'linear'
// })

scene.add(cintrix)



// ground 











// postprocessing ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\



// ------------------------------------------------------------------------------------------------postProcessing
// controls +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


const controller = new OrbitControls(camera,canvasElement)
controller.update()
// ---------------------------------------------------------------------------------------------------control


// lights ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


const dirLight = new THREE.DirectionalLight(0xffffff,2);

dirLight.position.set(-3,-3,-3);

const pointLight = new THREE.PointLight(0xff00ff,300,100,1);
const pointLight2 = new THREE.PointLight(0xffff00,300,100,1);
const pointLight3 = new THREE.PointLight(0x00ff00,300,100,1);
const pointLight4 = new THREE.PointLight(0x00ffcc,300,100,1);



const pointLightHelper2 = new THREE.PointLightHelper(pointLight2)
const pointLightHelper3 = new THREE.PointLightHelper(pointLight3)
const pointLightHelper4 = new THREE.PointLightHelper(pointLight4)

const lightFolder = gui.addFolder('lights');

lightFolder.add(pointLight,'intensity',0,10,0.2).name('point light ')
lightFolder.add(pointLight2,'intensity',0,10,0.2).name('point light 2')
lightFolder.add(pointLight3,'intensity',0,10,0.2).name('point light 3 ')
lightFolder.add(pointLight4,'intensity',0,10,0.2).name('point light 4')

// animation on light

gsap.to(pointLight,{
  duration:5,
  intensity:0,
  repeat:-1,
  yoyo:true
})

gsap.to(pointLight2,{
  duration:5,
  intensity:0,
  repeat:-1,
  yoyo:true
})
gsap.to(pointLight3,{
  duration:5,
  intensity:0,
  repeat:-1,
  yoyo:true
})
gsap.to(pointLight4,{
  duration:5,
  intensity:0,
  repeat:-1,
  yoyo:true
})





pointLight.position.set(-10,5,-10);
pointLight2.position.set(-8,5,5);
pointLight3.position.set(-8,-5,5);
pointLight4.position.set(-8,-5,-5);


const pointLightHelper = new THREE.PointLightHelper(pointLight)


const amLight = new THREE.AmbientLight(0xffffff,2);

const hemiLight = new THREE.HemisphereLight(0xff00ff,0xffff00,2)

scene.add(pointLight,pointLight2,pointLight3,pointLight4);

// -------------------------------------------------------------------------------------------------------


//  animation +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const clock = new THREE.Clock();
let time= 0;

function animate(){
  time  = clock.getElapsedTime();

  // cintrix.rotation.set(time,0,0)
  
  // cube.scale.z = Math.sin(time)+0.2
  // cube.scale.x = Math.sin(time)+0.2
  // cube.scale.y = Math.sin(time)+0.2
  camera.lookAt(cintrix.position)



  renderer.render(scene,camera)
  requestAnimationFrame(animate)
}

animate();

camera.position.set(-count/2 -1 , -count/2-1 , -count/2 -1)

const duration = 3;
const timingFN = 'linear'

const cameraTimeLine = gsap.timeline({
  yoyo:true,
  repeat:-1,
  repeatDelay:15,
  defaults:{
    duration:3,
    ease:'linear'
  }
});

cameraTimeLine.to(camera.position,{
  z:count,
  x:-count,
  y:-count,
  // duration:duration,
  //  ease:timingFN,
  delay:3,
  // repeat:-1,
  // yoyo:true,
 
})
cameraTimeLine.to(camera.position,{
  z:count,
  x:-count,
  y:count,
  //   duration:duration,
  //  ease:timingFN,
  delay:3,
  // repeat:-1,
  // yoyo:true,
 
})

cameraTimeLine.to(camera.position,{
  z:count,
  x:count,
  y:count,
  //  duration:duration,
  //  ease:timingFN,
  delay:3,
  // repeat:-1,
  // yoyo:true,

})

cameraTimeLine.to(camera.position,{
  z:count,
  x:count,
  y:-count,
  // duration:10,
  delay:3,
  // repeat:-1,
  // yoyo:true,
  // ease:'elastic'
})

cameraTimeLine.to(camera.position,{
  z:-count,
  x:count,
  y:-count,
  // duration:10,
  delay:3,
  // repeat:-1,
  // yoyo:true,
  // ease:'elastic'
})

cameraTimeLine.to(camera.position,{
  z:-count,
  x:count,
  y:count,
  // duration:10,
  delay:3,
  // repeat:-1,
  // yoyo:true,
  // ease:'elastic'
})
cameraTimeLine.to(camera.position,{
  z:-count,
  x:-count,
  y:count,
  // duration:10,
  delay:3,
  // repeat:-1,
  // yoyo:true,
  // ease:'elastic'
})

cameraTimeLine.to(camera.position,{
  z:-count,
  x:-count,
  y:-count,
  // duration:10,
  // delay:3,
  // repeat:-1,
  // yoyo:true,
  // ease:'elastic'
})

// ------------------------------------------------------------------------------------------------


// resizing windwo +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

window.addEventListener('resize',(e)=>{
  canvasElement.style.cssText = 'width:100%; height:100vh;'

  camera.aspect = canvasAspect.ascpect()
  camera.updateProjectionMatrix();

  renderer.setSize(canvasAspect.width() , canvasAspect.height());
  renderer.setPixelRatio(Math.min(2,window.devicePixelRatio));

})

// --------------------------------------------------------------------------------------------------------

function createBox(x,y,z,geo , mat , matWire){

  

  const box= new THREE.Mesh(geo,mat);

  const wire = new THREE.Mesh(geo,matWire)

  box.position.set(x,y,z);
  box.add(wire)
  box.geometry.center()
  const scale = 0.2

  const cubesTL= gsap.timeline()
  cubesTL.to(box.scale,{
    
    x:scale,
    y:scale,
    z:scale,
    duration:15,
    delay: x *0.1 + z *0.3 + y*0.2 ,
    repeat:-1,
    yoyo:true,
    ease:'elastic'
  })

    cubesTL.to(box.rotation,{
    
    x:Math.PI,
    y:Math.PI,
    z:Math.PI,
    duration:15,
    delay: x *0.1 + z *0.3 + y*0.2 ,
    repeat:-1,
    yoyo:true,
    ease:'bounce'
  })

  return box
}

function createCintrix(count = 5){



  const cintrixGroub = new THREE.Group() ;

  // cintrixGroub.position.set(0,0,0)


  const geo = new THREE.BoxGeometry(1,1,1);
  const matWire = new THREE.MeshPhongMaterial({color:0x000000,wireframe:true,emissive:0xffffff , intensity:10})
  const mat = new THREE.MeshPhysicalMaterial({color:0xffd700,roughness:0.2 , metalness:1.0,envMapIntensity:1.5,clearcoat:1.0,clearcoatRoughness:0.1,transparent:true});

  for(let y = -count/2 ; y< count/2 ; y++){
    for(let z = -count/2 ; z < count/2 ; z++){
      for(let x = -count/2; x < count/2 ; x++){

        const box = createBox(x+0.5,y+0.5,z+0.5,geo ,mat,matWire);
        // box.position.set(x,y,z);
        cintrixGroub.add(box)
    
      }
    }
  }

  // gsap.to(mat,{opacity:0,
  //   duration:2,repeat:-1,yoyo:true
  // })

  return cintrixGroub
}