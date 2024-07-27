import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import * as THREE from 'three';
import './style.css';

import p5FrameLoop from './p5FrameLoop.js';
import threeFrameLoop from './threeFrameLoop.js';

function threeSetup() {
	const threeCanvasElement = document.querySelector('#canvas-THREE');

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	const renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2));
	renderer.setSize(window.innerWidth, window.innerHeight);
	threeCanvasElement.appendChild(renderer.domElement);

	return { scene, camera, renderer };
}

function p5Setup(p5) {
	const p5CanvasElement = document.querySelector('#canvas-P5');

	p5.createCanvas(window.innerWidth, window.innerHeight).parent(
		p5CanvasElement
	);
}

const sketch = (p5) => {
	let { scene, camera, renderer } = threeSetup();
	let p5FL, threeFL;

	p5.setup = () => {
		p5Setup(p5);

		p5FL = p5FrameLoop(p5);
		threeFL = threeFrameLoop(scene, camera, renderer, p5);

		p5FL.setup();
		threeFL.setup();
	};

	p5.draw = () => {
		p5FL.draw();
		threeFL.draw();
	};

	p5.windowResized = () => {
		p5.resizeCanvas(window.innerWidth, window.innerHeight);
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	};
};

new p5(sketch);
