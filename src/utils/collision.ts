import { Block } from "../base/block";
import { Entity } from "../base/entity";
import { dt } from "../main";

export function rectCollision(
    x1: number, y1: number, width1: number, height1: number,
    x2: number, y2: number, width2: number, height2: number
): boolean {
    return Math.abs(x1 - x2) * 2 < width1 + width2 && Math.abs(y1 - y2) * 2 < height1 + height2;
};

export function applyFriction(velocity: number, friction: number): number {
    return velocity * (1 - friction * dt());
}

export interface Collider {
    source: Block | Entity;
    x: number;
    y: number;
    width: number;
    height: number;
}