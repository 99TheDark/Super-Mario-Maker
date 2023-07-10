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
    static readonly CROUCH_HEIGHT = 0.5;

    static readonly WALKING_SPEED = 6;
    static readonly RUNNING_SPEED = 12;
    static readonly DECELERATION = 3;
    static readonly MIN_SPEED = 0.005;
    static readonly MAX_SPEED = 0.32;
    static readonly RUNNING_THRESHOLD = 0.22;
    static readonly JUMP_POWER = 10;
    static readonly HELD_JUMP_POWER = 100;
    static readonly BOUNCE_POWER = 16;
    static readonly MAX_JUMP = 15;
    static readonly MOVEMENT_SPEED_UP = 5;
    static readonly MIN_MOVEMENT_SPEED = 0.5;

    static readonly WALK_1 = load("mario/walk1");
    static readonly WALK_2 = load("mario/walk2");
    static readonly JUMP = load("mario/jump");
    static readonly FALL = load("mario/fall");
    static readonly RUNNING = load("mario/running");
    static readonly SKID = load("mario/skid");
    static readonly CROUCH = load("mario/crouch");

    static readonly WALK_ANIMATION = new Animation([Player.WALK_1, Player.WALK_2], 0.1);

    private jumpTimer: number;
    private running: boolean;
    state: PlayerState | null;
    keyboard: Keyboard;

    constructor(x: number, y: number) {
        super(Player.WALK_1, x, y, Player.WIDTH, Player.HEIGHT);

        this.jumpTimer = -1;
        this.running = false;
        this.state = null;
        this.keyboard = new Keyboard();
    }

    private getSpeed(): number {
        return (this.keyboard.down("m") ? Player.RUNNING_SPEED : Player.WALKING_SPEED) * dt();
    }

    private get stopped(): boolean {
        return this.keyboard.down("s") && this.onGround;
    }

    control(): void {
        if(this.keyboard.down("a")) {
            this.facing = -1;
        } else if(this.keyboard.down("d")) {
            this.facing = 1;
        }

        if(!this.stopped && this.keyboard.down("a")) {
            this.xv -= this.getSpeed() * dt();
        } else if(!this.stopped && this.keyboard.down("d")) {
            this.xv += this.getSpeed() * dt();
        } else {
            this.xv = applyFriction(this.xv, Player.DECELERATION);
        }

        if(this.keyboard.down("w")) {
            if(this.onGround) {
                this.yv = Player.JUMP_POWER;
                this.jumpTimer = 0;
            } else if(this.jumpTimer != -1 && this.jumpTimer < Player.MAX_JUMP) {
                const power = Player.HELD_JUMP_POWER * dt();
                this.yv += power;
                this.jumpTimer += power;
            }
        } else {
            this.jumpTimer = -1;
        }

        if(this.onGround) this.running = Math.abs(this.xv) >= Player.RUNNING_THRESHOLD;

        this.xv = absConstrain(this.xv, Player.MAX_SPEED);

        this.height = this.keyboard.down("s") ? Player.CROUCH_HEIGHT : Player.HEIGHT;
    }

    animate(): void {
        if(this.keyboard.down("s")) {
            this.state = "crouch";
        } else if(this.state != "crouch" || this.yv < 0) {
            if(this.onGround) {
                if(
                    !this.stopped && this.keyboard.down("m") &&
                    (
                        (this.keyboard.down("a") && this.xv >= 0) ||
                        (this.keyboard.down("d") && this.xv <= 0)
                    )
                ) {
                    this.state = "skid";
                } else if(Math.abs(this.xv) >= Player.MIN_SPEED) {
                    this.state = "walk";
                } else {
                    this.state = null;
                }
            } else if(this.running) {
                this.state = "run";
            } else if(this.state != "run") {
                if(this.yv > 0) {
                    this.state = "jump";
                } else {
                    this.state = "fall";
                }
            } else {
                this.state = null;
            }
        }

        switch(this.state) {
            case null: this.setAnimation(null); break;
            case "walk": this.setAnimation(Player.WALK_ANIMATION); break;
            case "run": this.setAnimation(Player.RUNNING); break;
            case "skid": this.setAnimation(Player.SKID); break;
            case "jump": this.setAnimation(Player.JUMP); break;
            case "fall": this.setAnimation(Player.FALL); break;
            case "crouch": this.setAnimation(Player.CROUCH); break;
        }

        this.setSpeed(Math.max(Math.abs(this.xv) * Player.MOVEMENT_SPEED_UP, Player.MIN_MOVEMENT_SPEED));
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

export type PlayerState = "walk" | "run" | "skid" | "jump" | "fall" | "crouch";