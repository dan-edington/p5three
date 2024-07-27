import * as THREE from 'three';

export default function (scene, camera, renderer, p5) {
	return {
		setup: function () {},
		draw: function () {
			renderer.render(scene, camera);
		},
	};
}
