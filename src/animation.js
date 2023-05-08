import "./style.css"

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/unrealBloomPass';
import * as detectIt from 'detect-it';

const isMobileDevice = () => {
    return detectIt.primaryInput === "touch";
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
    // alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.gammaOutput = false;
camera.position.setZ(10);
barGraph(); // Sets cube positions based on screen resolution

// num = 0xff0000;
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color(0x41fcf6)

//cubes
const cube1 = new THREE.Mesh(geometry, material);
scene.add(cube1);

const cube2 = new THREE.Mesh(geometry, material);
scene.add(cube2);

const cube3 = new THREE.Mesh(geometry, material);
scene.add(cube3);

const cube4 = new THREE.Mesh(geometry, material);
scene.add(cube4);

const cube5 = new THREE.Mesh(geometry, material);
scene.add(cube5);

const cube6 = new THREE.Mesh(geometry, material);
scene.add(cube6);

// Create wireframe edges *unused*
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

/*
ooga
how to make cube array
agoo
*/

cube1.position.x = -4.25;
cube2.position.x = -2.40;
cube3.position.x = -0.75;
cube4.position.x =  0.75;
cube5.position.x =  2.40;
cube6.position.x =  4.25;

// Show grid
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load( './images/visual_2023.png' );
texture.encoding = THREE.sRGBEncoding;

const planeGeometry = new THREE.PlaneGeometry( 12.38, 20.48 );
const planeMaterial = new THREE.MeshBasicMaterial({color: 0x9f9f9f, map: texture});
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.position.z = -10
scene.add(plane);


const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 5;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2 - 0.1;
controls.enableZoom = !isMobileDevice;
// controls.enablePan = !isMobileDevice;
controls.enablePan = false;
controls.enableRotate = false;

const handleOrientationChange = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    composer.setSize(window.innerWidth, window.innerHeight);
    composer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};

window.addEventListener('resize', handleOrientationChange);

//post processing

const composer = new EffectComposer( renderer );

const renderPass = new RenderPass( scene, camera );
composer.addPass(renderPass);

//w, h, intensity, radius, threshold
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.5, .1
);

composer.addPass(bloomPass);

renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = 3;

const clock = new THREE.Clock();
var x = 0;

var red = r1;
var green = g1;
var blue = b1;

var beat = b;

const animate = () => {

    if (beat !== b) {
        if (b) {
          flipColors();
        }
    }
    beat = b;

    handleOrientationChange();

    x = clock.getElapsedTime();

    cube1.scale.y = (sum1 / 6000) * 2 / 3;
    cube2.scale.y = (sum2 / 6000) * 2 / 3;
    cube3.scale.y = (sum3 / 6000) * 2 / 3;
    cube4.scale.y = (sum4 / 6000) * 2 / 3;
    cube5.scale.y = (sum5 / 6000) * 2 / 3;
    cube6.scale.y = (sum6 / 6000) * 2 / 3;

    requestAnimationFrame(animate);

    // Change cube color
    updateColor(x);
    // material.color.setRGB(35, 123, 60);

    // Render the scene with the camera
    controls.update();
    // composer.render(scene, camera);
    renderer.render(scene, camera);
};

const updateColor = (time) => {
    // Only shows cyan/magenta/yellow on the cubes; they don't mix 
    material.color.setRGB(red / 255, green / 255, blue / 255);
}

function flipColors() {
  console.log("flipped");
  console.log( r1 / 255 + ", " + g1 / 255 + ", " + b1 / 255 );
  console.log( r2 / 255 + ", " + g2 / 255 + ", " + b2 / 255 );
  if (red == r1) {
    red = r2;
  }
  else {
    red = r1;
  }
  if (green == g1) {
    green = g2;
  }
  else {
    green = g1;
  }
  if (blue == b1) {
    blue = b2;
  }
  else {
    blue = b1;
  }
}

// Set the position of the cubes
function barGraph(){

    var position = [];
    var val = Math.floor(-1 * window.innerWidth/100);
    for(var i = 0; i < window.innerWidth; i+= 100){
        console.log(val);
        position.push(val);
        val += 1.5;
    }

    for(var i = 0; i < position.length; i ++){
        // cube.push(position[i]);
    }
}


// Start the animation loop
animate();

renderer.render(scene, camera);