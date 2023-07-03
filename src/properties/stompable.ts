import { Entity } from "../base/entity";

export class Stompable extends Entity {
    constructor(sprite: HTMLImageElement, x: number, y: number, width: number, height: number) {
        super(sprite, x, y, width, height);
    }
}