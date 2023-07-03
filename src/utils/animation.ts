import { dt } from "../main";

export class Animation {
    private static ANIMATIONS: Animation[] = [];

    private covered: number;
    frames: HTMLImageElement[];
    time: number;
    speed: number;

    constructor(frames: HTMLImageElement[], time: number) {
        this.covered = 0;
        this.frames = frames;
        this.time = time;
        this.speed = 1;

        Animation.ANIMATIONS.push(this);
    }

    restart(): void {
        this.covered = 0;
    }

    update(): void {
        this.covered += this.speed * dt();
    }

    frame(): HTMLImageElement {
        const frameNum = Math.floor(this.covered / this.time) % this.frames.length;
        return this.frames[frameNum];
    }

    static all(): void {
        Animation.ANIMATIONS.forEach(animation => animation.update());
    }
}