import * as THREE from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';

THREE.ColorManagement.enabled = false; // TODO: Confirm correct color management.

const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );

const darkMaterial = new THREE.MeshBasicMaterial(
    {
        canvas: document.querySelector('#bg'),
        color: 'black' 
    } 
);
const materials = {};

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 5;
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();

const initialZoomFactor = calculateZoomFactor();
const camera = new THREE.OrthographicCamera(
    window.innerWidth / - initialZoomFactor,
    window.innerWidth / initialZoomFactor,
    window.innerHeight / initialZoomFactor,
    window.innerHeight / - initialZoomFactor,
    -5,
    1000);
// const camera = new THREE.OrthographicCamera( -10, 10, 10, -10, -5, 1000);
camera.position.z = 10;
camera.position.y = 0;


// const controls = new OrbitControls( camera, renderer.domElement );
// controls.minDistance = 5;
// controls.maxDistance = 50;
// controls.maxPolarAngle = Math.PI / 2 - 0.1;
// controls.enableZoom = false
// // controls.enablePan = !isMobileDevice;
// controls.enablePan = false;
// controls.enableRotate = false;
// controls.addEventListener( 'change', render );

// scene.add( new THREE.AmbientLight( 0xffffff ) );

const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = 0;
bloomPass.strength = 0.5;
bloomPass.radius = 0.8;

const bloomComposer = new EffectComposer( renderer );
bloomComposer.renderToScreen = false;
bloomComposer.addPass( renderScene );
bloomComposer.addPass( bloomPass );

const finalPass = new ShaderPass(
    new THREE.ShaderMaterial( {
        uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: bloomComposer.renderTarget2.texture }
        },
        vertexShader: document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
        defines: {}
    } ), 'baseTexture'
);
finalPass.needsSwap = true;

const finalComposer = new EffectComposer( renderer );
finalComposer.addPass( renderScene );
finalComposer.addPass( finalPass );

const boxGeometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color(0x00ffff)

//cubes
const cube1 = new THREE.Mesh(boxGeometry, material);
scene.add(cube1);
cube1.layers.enable( BLOOM_SCENE );

const cube2 = new THREE.Mesh(boxGeometry, material);
scene.add(cube2);
cube2.layers.enable( BLOOM_SCENE );

const cube3 = new THREE.Mesh(boxGeometry, material);
scene.add(cube3);
cube3.layers.enable( BLOOM_SCENE );

const cube4 = new THREE.Mesh(boxGeometry, material);
scene.add(cube4);
cube4.layers.enable( BLOOM_SCENE );

const cube5 = new THREE.Mesh(boxGeometry, material);
scene.add(cube5);
cube5.layers.enable( BLOOM_SCENE );

const cube6 = new THREE.Mesh(boxGeometry, material);
scene.add(cube6);
cube6.layers.enable( BLOOM_SCENE );

cube1.position.y = 10;
cube2.position.y = 10;
cube3.position.y = 10;
cube4.position.y = 10;
cube5.position.y = 10;
cube6.position.y = 10;

cube1.position.x = -60;
cube2.position.x = -45;
cube3.position.x = -30;
cube4.position.x = -15;
cube5.position.x =  0;
cube6.position.x =  15;

cube1.scale.x = 10;
cube2.scale.x = 10;
cube3.scale.x = 10;
cube4.scale.x = 10;
cube5.scale.x = 10;
cube6.scale.x = 10;


const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load( './images/city.png' );
const cloud = textureLoader.load('./images/cloud1cropped.png');
const cloud2 = textureLoader.load('./images/cloud2cropped.png');
const cloud3 = textureLoader.load('./images/cloud3cropped.png');
const cloud4 = textureLoader.load('./images/cloud4cropped.png');
const building1 = textureLoader.load('./images/building1.png');
const building2 = textureLoader.load('./images/building2.png');
const building3 = textureLoader.load('./images/building3.png');
const building4 = textureLoader.load('./images/building4.png');
const building5 = textureLoader.load('./images/building5.png');
const building6 = textureLoader.load('./images/building6.png');
const building7 = textureLoader.load('./images/building7.png');

texture.encoding = THREE.sRGBEncoding;
cloud.encoding = THREE.sRGBEncoding;
cloud2.encoding = THREE.sRGBEncoding;
cloud3.encoding = THREE.sRGBEncoding;
cloud4.encoding = THREE.sRGBEncoding;

building1.encoding = THREE.sRGBEncoding;
building2.encoding = THREE.sRGBEncoding;
building3.encoding = THREE.sRGBEncoding;
building4.encoding = THREE.sRGBEncoding;
building5.encoding = THREE.sRGBEncoding;
building6.encoding = THREE.sRGBEncoding;
building7.encoding = THREE.sRGBEncoding;

const planeGeometry = new THREE.PlaneGeometry( 273.8, 139.32 );
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.position.z = -60
scene.add(plane);

const cloudGeometry = new THREE.PlaneGeometry( 85, 15 );
const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: cloud, transparent: true, opacity: 1 });
const cloud2Material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: cloud2, transparent: true, opacity: 1 });
const cloud3Material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: cloud3, transparent: true, opacity: 1 });
const cloud4Material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: cloud4, transparent: true, opacity: 1 });
const cloudMesh = new THREE.Mesh( cloudGeometry, cloudMaterial );
const cloud2Mesh = new THREE.Mesh( cloudGeometry, cloud2Material );
const cloud3Mesh = new THREE.Mesh( cloudGeometry, cloud3Material );
const cloud4Mesh = new THREE.Mesh( cloudGeometry, cloud4Material );

const building1Geometry = new THREE.PlaneGeometry( 35, 79 );
const building1Material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: building1, transparent: true, opacity: 1 });
const building2Geometry = new THREE.PlaneGeometry( 28, 45 );
const building2Material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: building2, transparent: true, opacity: 1 });
const building3Geometry = new THREE.PlaneGeometry( 36, 88 );
const building3Material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: building3, transparent: true, opacity: 1 });
const building4Geometry = new THREE.PlaneGeometry( 21, 86 );
const building4Material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: building4, transparent: true, opacity: 1 });
const building5Geometry = new THREE.PlaneGeometry( 34, 81 );
const building5Material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: building5, transparent: true, opacity: 1 });
const building6Geometry = new THREE.PlaneGeometry( 44, 107 );
const building6Material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: building6, transparent: true, opacity: 1 });
const building7Geometry = new THREE.PlaneGeometry( 35, 56 );
const building7Material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: building7, transparent: true, opacity: 1 });
const building1Mesh = new THREE.Mesh( building1Geometry, building1Material );
const building2Mesh = new THREE.Mesh( building2Geometry, building2Material );
const building3Mesh = new THREE.Mesh( building3Geometry, building3Material );
const building4Mesh = new THREE.Mesh( building4Geometry, building4Material );
const building5Mesh = new THREE.Mesh( building5Geometry, building5Material );
const building6Mesh = new THREE.Mesh( building6Geometry, building6Material );
const building7Mesh = new THREE.Mesh( building7Geometry, building7Material );

// Cloud positions
cloudMesh.position.set(20,35,-5);
cloud2Mesh.position.set(-10,12,-20);
cloud3Mesh.position.set(50,25,-5);
cloud4Mesh.position.set(15, 45, -15);
scene.add(cloudMesh);
scene.add(cloud2Mesh);
scene.add(cloud3Mesh);
scene.add(cloud4Mesh);

building1Mesh.position.set(90, -10, -10);
building2Mesh.position.set(0, -10, -10);
building3Mesh.position.set(-30, -10 ,-10);
building4Mesh.position.set(-50, -10, -10);
building5Mesh.position.set(130, -10, -10);
building6Mesh.position.set(60, -10, -10);
building7Mesh.position.set(-110, -10, -10);
scene.add(building1Mesh);
scene.add(building2Mesh);
scene.add(building3Mesh);
scene.add(building4Mesh);
scene.add(building5Mesh);
scene.add(building6Mesh);
scene.add(building7Mesh);



const clock = new THREE.Clock();
let curr = 0;
let prev = 0;
let diff = 0;

var red = r1;
var green = g1;
var blue = b1;

const updateColor = (time) => {
    // Only shows cyan/magenta/yellow on the cubes; they don't mix 
    material.color.setRGB(red / 255, green / 255, blue / 255);
}

animate();

function calculateZoomFactor() {

    return window.innerHeight / 100 + 7;

}

window.onresize = function () {

    // Get the new size of the window
    let width = window.innerWidth;
    let height = window.innerHeight;

    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    let params = new URLSearchParams(document.location.search);
    const mode = params.get("mode")

    if (isIOS) {
        if (mode && mode === "pwa") {
            width = width * 2
        }
    }


    const zoomFactor = calculateZoomFactor();


    // Update the camera's parameters with the new aspect ratio
    camera.left = width / - zoomFactor;
    camera.right = width / zoomFactor;
    camera.top = height / zoomFactor;
    camera.bottom = height / -zoomFactor;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

    bloomComposer.setSize( width, height );
    finalComposer.setSize( width, height );

    render();

};


function render() {

    renderBloom();
    finalComposer.render();

}

var beat = b;

let speaker = document.getElementById("speaker-image")

function animate() {

    if (beat !== b) {
        if (b) {
          flipColors();
          speaker.classList.add("speaker-beat");
          setTimeout(() => {
              speaker.classList.remove("speaker-beat")
          }, 150)
        }
    }
    beat = b;

    curr = clock.getElapsedTime();
    diff = curr - prev;
    prev = curr;

    cube1.scale.y = ((sum1 / 1200) * 2 / 3) ** 1.5 + 1;
    cube2.scale.y = ((sum2 / 1200) * 2 / 3) ** 1.5 + 1;
    cube3.scale.y = ((sum3 / 1200) * 2 / 3) ** 1.5 + 1;
    cube4.scale.y = ((sum4 / 1200) * 2 / 3) ** 1.5 + 1;
    cube5.scale.y = ((sum5 / 1200) * 2 / 3) ** 1.5 + 1;
    cube6.scale.y = ((sum6 / 1200) * 2 / 3) ** 1.5 + 1;

    if (cloudMesh.position.x < -170) {
        cloudMesh.position.x = 170;
    }
    if (cloud2Mesh.position.x < -170) {
        cloud2Mesh.position.x = 170;
    }
    if (cloud3Mesh.position.x < -170) {
        cloud3Mesh.position.x = 170;
    }
    if (cloud4Mesh.position.x < -170) {
        cloud4Mesh.position.x = 170;
    }


    if (!document.hidden) {
        cloudMesh.position.x -= diff * 1.3;
        cloud2Mesh.position.x -= diff * 2.3;
        cloud3Mesh.position.x -= diff * 1.8;
        cloud4Mesh.position.x -= diff * 2.9;
    } else {
        console.log("hidden");
    }
    // controls.update();
    // Change cube color
    updateColor(curr);

    render();
    requestAnimationFrame(animate);

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

function renderBloom() {

    scene.traverse( darkenNonBloomed );
    bloomComposer.render();
    scene.traverse( restoreMaterial );

}

function darkenNonBloomed( obj ) {

    if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {

        materials[ obj.uuid ] = obj.material;
        obj.material = darkMaterial;

    }

}

function restoreMaterial( obj ) {

    if ( materials[ obj.uuid ] ) {

        obj.material = materials[ obj.uuid ];
        delete materials[ obj.uuid ];

    }

}

function updateCameraOnResize() {
    // Get the new size of the window
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Calculate the new aspect ratio based on the new size
    const aspectRatio = width / height;

    // Update the camera's parameters with the new aspect ratio
    camera.left = width / - 15;
    camera.right = width / 15;
    camera.top = height / 15;
    camera.bottom = height / -15;

    // Update the camera's projection matrix
    camera.updateProjectionMatrix();

    // Update the renderer's size to match the new window size
    renderer.setSize(width, height);
}

//window.addEventListener('resize', updateCameraOnResize)