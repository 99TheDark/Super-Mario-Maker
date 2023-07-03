import { TILE_SIZE } from "../constants";
import { MovementDirection } from "../utils/direction";

export class Renderer {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private scale: number;

    constructor(ctx: CanvasRenderingContext2D, scale: number) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scale = scale;
    }

    image(image: HTMLImageElement, x: number, y: number, direction: MovementDirection = -1): void {
        this.ctx.save();
        if(direction == 1) {
            this.ctx.scale(-1, 1);
        }
        this.ctx.drawImage(
            image,
            (direction == 1 ? - (x + image.width / 2 + TILE_SIZE / 2) : (x - image.width / 2 + TILE_SIZE / 2)) * this.scale,
            this.canvas.height - (y + image.height) * this.scale,
            image.width * this.scale,
            image.height * this.scale
        );
        this.ctx.restore();
    }
}