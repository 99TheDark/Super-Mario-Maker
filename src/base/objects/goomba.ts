import { Direction, RectangularDirection, normalizeDirection } from "../../utils/direction";
import { load } from "../../utils/images";
import { Entity } from "../entity";
import { Animation } from "../../utils/animation";
import { Player } from "../players/player";
import { Collider } from "../../utils/collision";
import { dt } from "../../main";

export class Goomba extends Entity {
    static readonly WIDTH = 0.9;
    static readonly HEIGHT = 1;
    static readonly SPEED = 1.5;

    static readonly IDLE = load("goomba/idle");
    static readonly WALK_1 = load("goomba/walk1");
    static readonly WALK_2 = load("goomba/walk2");
    static readonly DEAD = load("goomba/dead");

    static readonly WALK_ANIMATION = new Animation([Goomba.WALK_1, Goomba.WALK_2], 0.25);

    constructor(x: number, y: number) {
        super(Goomba.IDLE, x, y, Goomba.WIDTH, Goomba.HEIGHT);
    }

    update(direction: Direction): void {
        if(direction == "x") {
            if(this.onGround) {
                this.setAnimation(Goomba.WALK_ANIMATION);
                this.xv = this.facing * Goomba.SPEED * dt();
            } else {
                this.setAnimation(null);
            }
        }

        super.update(direction);
    }

    resolve(direction: RectangularDirection, other: Collider): void {
        if(!(other.source instanceof Player)) {
            super.resolve(direction, other);

            if(normalizeDirection(direction) == "x") this.facing *= -1;
        }
    }

    kill(): void {
        this.setAnimation(Goomba.DEAD);
        this.static = true;

        setTimeout(() => super.kill(), 500);
    }
}