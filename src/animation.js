import "./style.css"

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as detectIt from 'detect-it';

const isMobileDevice = () => {
    return detectIt.primaryInput === "touch";
}

console.log("hello");
console.log(currentIdx); 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(20);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// My Cube
const pube = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x0000ff }));
scene.add(pube);

const skewb = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
scene.add(skewb);

// Create wireframe edges
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
// const wireframe = new THREE.LineSegments(edges, lineMaterial);
cube.add(new THREE.LineSegments(edges, lineMaterial));
pube.add(new THREE.LineSegments(edges, lineMaterial));
skewb.add(new THREE.LineSegments(edges, lineMaterial));

// Set the position of the cube
cube.position.x = 0;
cube.position.y = 0;
cube.position.z = 0;

// Set the position of the pube
pube.position.x = 1.5;
pube.position.y = 0;
pube.position.z = 0;

// Set the position of the pube
skewb.position.x = -1.5;
skewb.position.y = 0;
skewb.position.z = 0;

const gridHelper = new THREE.GridHelper(200, 200);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 20;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2 - 0.1;
controls.enableZoom = !isMobileDevice;
controls.enablePan = !isMobileDevice;

const handleOrientationChange = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', handleOrientationChange);

const clock = new THREE.Clock();
var x = 0;
const animate = () => {

    handleOrientationChange();

    x = clock.getElapsedTime();

    cube.scale.y = sum /  25000;

    requestAnimationFrame(animate);



    // Render the scene with the camera
    controls.update();
    renderer.render(scene, camera);
};

// Start the animation loop
animate();

renderer.render(scene, camera);