import { load } from "../../utils/images";

export class Mario {
    static readonly WALK_1 = load("mario/walk1");
    static readonly WALK_2 = load("mario/walk2");
    static readonly JUMP = load("mario/jump");
    static readonly FALL = load("mario/fall");
    static readonly RUN_JUMP = load("mario/run_jump");
    static readonly SKID = load("mario/skid");
    static readonly CROUCH = load("mario/crouch");
}