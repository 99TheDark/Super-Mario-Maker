import { DRAG, EPSILON, FRICTION, GRAVITY, TILE_SIZE } from "../constants";
import { Collider, applyFriction, rectCollision } from "../utils/collision";
import { Direction, MovementDirection, RectangularDirection, normalizeDirection, splitDir } from "../utils/direction";
import { Renderer } from "./renderer";
import { Animatable } from "./animatable";
import { dt } from "../main";

export interface EntityFlags {
    againstWall: boolean;
    onGround: boolean;
}

export class Entity extends Animatable {
    private flags: EntityFlags;
    width: number;
    height: number;
    x: number;
    y: number;
    xv: number;
    yv: number;
    facing: MovementDirection;
    static: boolean;
    dead: boolean;

    constructor(sprite: HTMLImageElement, x: number, y: number, width: number, height: number) {
        super(sprite, null);

        this.x = x;
        this.y = y;
        this.xv = 0;
        this.yv = 0;
        this.width = width;
        this.height = height;
        this.facing = -1;
        this.static = false;
        this.dead = false;

        this.flags = {
            onGround: false,
            againstWall: false
        };
    }

    update(direction: Direction): void {
        splitDir(direction,
            () => {
                this.xv = applyFriction(this.xv, FRICTION);
                this.x += this.xv;
            },
            () => {
                this.yv -= GRAVITY * dt();

                this.yv = applyFriction(this.yv, DRAG);
                this.y += this.yv * dt();
            }
        );
    }

    collide(surrounding: Collider[], direction: Direction): void {
        splitDir(direction, () => this.flags.againstWall = false, () => this.flags.onGround = false);

        surrounding.forEach(other => {
            const src = other.source;
            if(this != src) {
                const colliding = rectCollision(
                    this.x, this.y, this.width, this.height,
                    other.x, other.y, other.width, other.height
                );
                if(colliding) {
                    const collider = {
                        source: this,
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height
                    };

                    splitDir(direction,
                        () => {
                            this.flags.againstWall = true;

                            this.resolve(this.xv > 0 ? "left" : "right", other);
                            if(src instanceof Entity) {
                                src.resolve(this.xv > 0 ? "right" : "left", collider);
                            }
                        },
                        () => {
                            if(this.yv < 0) this.flags.onGround = true;

                            this.resolve(this.yv > 0 ? "bottom" : "top", other);
                            if(src instanceof Entity) {
                                src.resolve(this.yv > 0 ? "top" : "bottom", collider);
                            }
                        }
                    );
                }
            }
        });
    }

    resolve(direction: RectangularDirection, other: Collider) {
        splitDir(normalizeDirection(direction),
            () => {
                this.x = other.x - (this.width / 2 + other.width / 2 + EPSILON) * Math.sign(this.xv);
                this.xv *= 0.7;
            },
            () => {
                this.y = other.y - (this.height / 2 + other.height / 2 + EPSILON) * Math.sign(this.yv);
                this.yv *= 0.7;
            }
        );
    }

    draw(rednerer: Renderer): void {
        rednerer.image(this.getFrame(), this.x * TILE_SIZE, this.y * TILE_SIZE, this.facing);
    }

    kill(): void {
        this.dead = true;
    }

    get onGround(): boolean {
        return this.flags.onGround;
    }

    get againstWall(): boolean {
        return this.flags.againstWall;
    }
}