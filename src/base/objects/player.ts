import { load } from "../../utils/images";
import { Animation } from "../../utils/animation";
import { Entity } from "../entity";
import { Keyboard } from "../../utils/keyboard";
import { RectangularDirection } from "../../utils/direction";
import { Collider, applyFriction } from "../../utils/collision";
import { dt } from "../../main";
import { absConstrain } from "../../utils/constain";

export class Player extends Entity {
    static readonly WIDTH = 0.75;
    static readonly HEIGHT = 1;
    static readonly WALKING_SPEED = 0.2;
    static readonly RUNNING_SPEED = 0.4;
    static readonly DECELERATION = 3;
    static readonly MIN_SPEED = 0.02;
    static readonly MAX_SPEED = 0.32;
    static readonly RUNNING_THRESHOLD = 0.27;
    static readonly JUMP_POWER = 24;
    static readonly BOUNCE_POWER = 16;
    static readonly MOVEMENT_SPEED_UP = 5;

    static readonly WALK_1 = load("mario/walk1");
    static readonly WALK_2 = load("mario/walk2");
    static readonly JUMP = load("mario/jump");
    static readonly FALL = load("mario/fall");
    static readonly RUN_JUMP = load("mario/run_jump");
    static readonly SKID = load("mario/skid");
    static readonly CROUCH = load("mario/crouch");

    static readonly WALK_ANIMATION = new Animation([Player.WALK_1, Player.WALK_2], 0.1);

    keyboard: Keyboard;

    constructor(x: number, y: number) {
        super(Player.WALK_1, x, y, Player.WIDTH, Player.HEIGHT);

        this.keyboard = new Keyboard();
    }

    private getSpeed(): number {
        return (this.keyboard.down("m") ? Player.RUNNING_SPEED : Player.WALKING_SPEED) * dt();
    }

    run(): void {
        if(this.keyboard.down("a")) {
            this.facing = -1;
            this.xv -= this.getSpeed();
        } else if(this.keyboard.down("d")) {
            this.facing = 1;
            this.xv += this.getSpeed();
        } else {
            this.xv = applyFriction(this.xv, Player.DECELERATION);
        }

        if(this.onGround && this.keyboard.down("w")) {
            this.yv = Player.JUMP_POWER;
        }

        this.xv = absConstrain(this.xv, Player.MAX_SPEED);

        if(!this.onGround) {
            if(Math.abs(this.xv) >= Player.RUNNING_THRESHOLD) {
                this.setAnimation(Player.RUN_JUMP);
            } else {
                if(this.yv > 0) {
                    this.setAnimation(Player.JUMP);
                } else {
                    this.setAnimation(Player.FALL);
                }
            }
        } else if(this.keyboard.down("m") && this.keyboard.down("a") && this.xv >= 0) {
            this.facing = 1;
            this.setAnimation(Player.SKID);
        } else if(this.keyboard.down("m") && this.keyboard.down("d") && this.xv <= 0) {
            this.facing = -1;
            this.setAnimation(Player.SKID);
        } else if(Math.abs(this.xv) > Player.MIN_SPEED) {
            this.setAnimation(Player.WALK_ANIMATION);
        } else {
            this.setAnimation(null);
        }

        this.setSpeed(Math.abs(this.xv) * Player.MOVEMENT_SPEED_UP);
    }

    resolve(direction: RectangularDirection, other: Collider): void {
        const src = other.source;
        if(src instanceof Entity) {
            if(!src.static) {
                if(direction == "top") {
                    src.kill();
                    this.yv = Player.BOUNCE_POWER;
                } else {
                    this.kill();
                }
            }
        } else {
            super.resolve(direction, other);
        }
    }
}