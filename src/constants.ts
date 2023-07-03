export const setup: Promise<any>[] = [];

export interface StaticImageLibrary {
    readonly [name: string]: HTMLImageElement;
}

export const TILE_SIZE = 16;
export const GRAVITY = 40;
export const FRICTION = 0.4;
export const DRAG = 1.4;

export const EPSILON = 0.00001;