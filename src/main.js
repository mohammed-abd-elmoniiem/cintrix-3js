

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './style.css'

import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'
import * as CANNON from 'cannon-es'
import { OrbitControls } from 'three/examples/jsm/Addons.js'










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
scene.fog = new THREE.Fog(0xffffff,0.1,20)



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


scene.add(enviroment)

// cintrix

const cintrix = createCintrix(20);
// cintrix.position.x = -3

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

dirLight.position.set(1,1,1);


const amLight = new THREE.AmbientLight(0xffffff,0.02);

const hemiLight = new THREE.HemisphereLight(0xff00ff,0xffff00,2)

// scene.add(hemiLight);

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



  renderer.render(scene,camera)
  requestAnimationFrame(animate)
}

animate()

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

function createBox(x,y,z,geo , mat){

  

  const box= new THREE.Mesh(geo,mat);

  box.position.set(x,y,z);
  box.geometry.center()
  const scale = 0.3
  gsap.to(box.scale,{
    
    x:scale,
    y:scale,
    z:scale,
    duration:1,
    delay: x *0.1 + z *0.3 + y*0.2 ,
    repeat:-1,
    yoyo:true
  })

  //   gsap.to(box.rotation,{
    
  //   x:Math.PI,
  //   y:Math.PI,
  //   z:Math.PI,
  //   duration:1,
  //   delay: x *0.1 + z *0.3 + y*0.2 ,
  //   repeat:-1,
  //   yoyo:true
  // })

  return box
}

function createCintrix(count = 5){

  const cintrixGroub = new THREE.Group();

  const geo = new THREE.BoxGeometry(1,1,1,4,4,4);
  const mat = new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:0.1 , metalness:0.4 });

  for(let y = 0 ; y< count ; y++){
    for(let z = 0 ; z < count ; z++){
      for(let x = 0 ; x < count ; x++){

        const box = createBox(x,y,z,geo ,mat);
        // box.position.set(x,y,z);
        cintrixGroub.add(box)
    
      }
    }
  }

  return cintrixGroub
}