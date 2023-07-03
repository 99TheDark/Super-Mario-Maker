import { TILE_SIZE } from "../constants";
import { Renderer } from "./renderer";

export class Block {
    sprite: HTMLImageElement;

    constructor(sprite: HTMLImageElement) {
        this.sprite = sprite;
    }

    draw(renderer: Renderer, x: number, y: number): void {
        renderer.image(this.sprite, x * TILE_SIZE, y * TILE_SIZE);
    }
}