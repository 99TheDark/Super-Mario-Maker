import { Level } from "./base/level";
import { Goomba } from "./base/objects/goomba";
import { Ground } from "./base/objects/ground";
import { setup } from "./constants";
import { Renderer } from "./base/renderer";
import { Player } from "./base/objects/player";
import { Brick } from "./base/objects/brick";

let deltaTime = 0;

export function dt(): number {
	return deltaTime * 0.001;
};

window.addEventListener("DOMContentLoaded", async () => {
	const canvas = document.getElementById("main") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

	const resize = () => {
		[canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
		ctx.imageSmoothingEnabled = false;
	};

	window.addEventListener("resize", resize);
	resize();

	const renderer = new Renderer(ctx, 3);

	const level = new Level(24, 13);
	level.set(0, 0, new Ground());
	level.set(1, 0, new Ground());
	level.set(2, 0, new Ground());
	level.set(3, 0, new Ground());
	level.set(4, 0, new Ground());
	level.set(5, 0, new Ground());
	level.set(6, 0, new Ground());
	level.set(7, 0, new Ground());
	level.set(8, 0, new Ground());
	level.set(9, 0, new Ground());
	level.set(10, 0, new Ground());
	level.set(10, 1, new Ground());
	level.set(0, 1, new Ground());
	level.set(0, 2, new Ground());
	level.set(0, 3, new Ground());
	level.set(1, 3, new Ground());
	level.set(0, 4, new Ground());
	level.set(1, 4, new Ground());
	level.set(5, 6, new Ground());
	level.set(4, 7, new Ground());
	level.set(4, 6, new Ground());
	level.spawn(new Goomba(5, 8));
	level.spawn(new Goomba(9, 6));
	level.spawn(new Player(11, 2));
	for(let i = 11; i <= 23; i++) {
		level.set(i, 0, new Ground());
		level.set(i, 1, new Ground());
	}
	level.set(17, 5, new Brick());
	for(let i = 2; i <= 12; i++) {
		level.set(23, i, new Ground());
	}

	await Promise.all(setup);

	let last = performance.now();
	let wasHidden = true;
	const draw = () => {
		if(wasHidden) {
			last = performance.now();
			wasHidden = false;
		}

		deltaTime = performance.now() - last;
		last = performance.now();

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		level.run(renderer);

		requestAnimationFrame(draw);
	};

	window.addEventListener("visibilitychange", () => {
		if(document.visibilityState == "hidden") wasHidden = true;
	});

	requestAnimationFrame(draw);
});