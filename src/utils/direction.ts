export type Direction = "x" | "y";
export type MovementDirection = -1 | 1;
export type RectangularDirection = "left" | "right" | "top" | "bottom";

export function splitDir(direction: Direction, xCallback: Function, yCallback: Function): void {
    switch(direction) {
        case "x":
            xCallback();
            break;
        case "y":
            yCallback();
            break;
    }
}

export function normalizeDirection(direction: RectangularDirection): Direction {
    switch(direction) {
        case "left":
        case "right":
            return "x";
        case "bottom":
        case "top":
            return "y";
    }
}

export interface Collidable {
    getHitbox: () => number[];
}