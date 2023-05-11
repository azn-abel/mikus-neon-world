import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

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

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 200 );
camera.position.z = 10;


const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 5;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2 - 0.1;
// controls.enableZoom = !isMobileDevice;
// controls.enablePan = !isMobileDevice;
// controls.enablePan = false;
// controls.enableRotate = false;
controls.addEventListener( 'change', render );

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

cube1.position.x = -4.25;
cube2.position.x = -2.40;
cube3.position.x = -0.75;
cube4.position.x =  0.75;
cube5.position.x =  2.40;
cube6.position.x =  4.25;

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load( './images/city.png' );
const cloud = textureLoader.load('./images/cloud.png');
texture.encoding = THREE.sRGBEncoding;
cloud.encoding = THREE.sRGBEncoding;

const planeGeometry = new THREE.PlaneGeometry( 192, 108 );
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.position.z = -50
scene.add(plane);

const cloudGeometry = new THREE.PlaneGeometry( 10.24, 5.76 );
const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: cloud, transparent: true, opacity: 1 });
const cloudMesh = new THREE.Mesh( cloudGeometry, cloudMaterial );
const cloudMesh2 = new THREE.Mesh( cloudGeometry, cloudMaterial );
cloudMesh.position.z = 0;
cloudMesh.position.x = 20;
cloudMesh2.position.z = -10;
cloudMesh2.position.x = -10;
scene.add(cloudMesh);
scene.add(cloudMesh2);

const clock = new THREE.Clock();
var curr = 0;
var prev = 0;
var diff = 0;

animate();

window.onresize = function () {

    const width = window.innerWidth;
    const height = window.innerHeight;

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


function animate() {

    curr = clock.getElapsedTime();
    diff = curr - prev;
    prev = curr;

    cube1.scale.y = ((sum1 / 6000) * 2 / 3) ** 1.5;
    cube2.scale.y = ((sum2 / 6000) * 2 / 3) ** 1.5;
    cube3.scale.y = ((sum3 / 6000) * 2 / 3) ** 1.5;
    cube4.scale.y = ((sum4 / 6000) * 2 / 3) ** 1.5;
    cube5.scale.y = ((sum5 / 6000) * 2 / 3) ** 1.5;
    cube6.scale.y = ((sum6 / 6000) * 2 / 3) ** 1.5;

    if (cloudMesh.position.x < -20) {
        cloudMesh.position.x = 20;
    }

    if (cloudMesh2.position.x < -30) {
        cloudMesh2.position.x = 30;
    }

    if (!document.hidden) {
        cloudMesh.position.x -= diff * 0.8;
        cloudMesh2.position.x -= diff * 0.8;
    } else {
        console.log("hidden");
    }
    // controls.update();

    render();
    requestAnimationFrame(animate);

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