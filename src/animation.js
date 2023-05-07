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
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10);

const geometry = new THREE.BoxGeometry();

const cube1 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
scene.add(cube1);

const cube2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
scene.add(cube2);

const cube3 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
scene.add(cube3);

const cube4 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
scene.add(cube4);

const cube5 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
scene.add(cube5);

const cube6 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
scene.add(cube6);

// Create wireframe edges
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
// const wireframe = new THREE.LineSegments(edges, lineMaterial);
//cube.add(new THREE.LineSegments(edges, lineMaterial));
//pube.add(new THREE.LineSegments(edges, lineMaterial));
//skewb.add(new THREE.LineSegments(edges, lineMaterial));

// Set the position of the cube
cube1.position.x = -4.25;
cube2.position.x = -2.40;
cube3.position.x = -0.75;
cube4.position.x =  0.75;
cube5.position.x =  2.40;
cube6.position.x =  4.25;

// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

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
const animate = () => {

    handleOrientationChange();

    x = clock.getElapsedTime();

    cube1.scale.y = (sum1 / 6000) ** 2 / 2;
    cube2.scale.y = (sum2 / 6000) ** 2 / 2;
    cube3.scale.y = (sum3 / 6000) ** 2 / 2;
    cube4.scale.y = (sum4 / 6000) ** 2 / 2;
    cube5.scale.y = (sum5 / 6000) ** 2 / 2;
    cube6.scale.y = (sum6 / 6000) ** 2 / 2;

    requestAnimationFrame(animate);



    // Render the scene with the camera
    controls.update();
    composer.render(scene, camera);
};

// Start the animation loop
animate();

renderer.render(scene, camera);