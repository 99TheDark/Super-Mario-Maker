import { load } from "../../utils/images";
import { Variation } from "../../utils/variation";
import { Block } from "../block";

export class Ground extends Block {
    static readonly DEFAULT: HTMLImageElement = load("ground/default");
    static readonly VARIATIONS: Variation[] = [
        {
            pattern: [
                0, -1, 0,
                1, 1,
                1, 1, 1
            ],
            sprite: load("ground/top")
        }, {
            pattern: [
                1, 1, 1,
                1, 1,
                0, -1, 0
            ],
            sprite: load("ground/bottom")
        }, {
            pattern: [
                0, 1, 1,
                -1, 1,
                0, 1, 1
            ],
            sprite: load("ground/left")
        }, {
            pattern: [
                1, 1, 0,
                1, -1,
                1, 1, 0
            ],
            sprite: load("ground/right")
        }, {
            pattern: [
                0, -1, 0,
                -1, 1,
                0, 1, 1
            ],
            sprite: load("ground/top_left")
        }, {
            pattern: [
                0, -1, 0,
                1, -1,
                1, 1, 0
            ],
            sprite: load("ground/top_right")
        }, {
            pattern: [
                0, 1, 1,
                -1, 1,
                0, -1, 0
            ],
            sprite: load("ground/bottom_left")
        }, {
            pattern: [
                1, 1, 0,
                1, -1,
                0, -1, 0
            ],
            sprite: load("ground/bottom_right")
        }, {
            pattern: [
                -1, 1, 1,
                1, 1,
                1, 1, 1,
            ],
            sprite: load("ground/corner_top_left")
        }, {
            pattern: [
                1, 1, -1,
                1, 1,
                1, 1, 1,
            ],
            sprite: load("ground/corner_top_right")
        }, {
            pattern: [
                1, 1, 1,
                1, 1,
                -1, 1, 1,
            ],
            sprite: load("ground/corner_bottom_left")
        }, {
            pattern: [
                1, 1, 1,
                1, 1,
                1, 1, -1,
            ],
            sprite: load("ground/corner_bottom_right")
        }, {
            pattern: [
                0, -1, 0,
                1, 1,
                0, -1, 0,
            ],
            sprite: load("ground/thin_horizontal")
        }, {
            pattern: [
                0, -1, 0,
                -1, 1,
                0, -1, 0,
            ],
            sprite: load("ground/thin_left")
        }, {
            pattern: [
                0, -1, 0,
                1, -1,
                0, -1, 0,
            ],
            sprite: load("ground/thin_right")
        }, {
            pattern: [
                0, 1, 0,
                -1, -1,
                0, 1, 0,
            ],
            sprite: load("ground/thin_vertical")
        }, {
            pattern: [
                0, -1, 0,
                -1, -1,
                0, 1, 0,
            ],
            sprite: load("ground/thin_top")
        }, {
            pattern: [
                0, 1, 0,
                -1, -1,
                0, -1, 0,
            ],
            sprite: load("ground/thin_bottom")
        }, {
            pattern: [
                -1, 1, -1,
                1, 1,
                -1, 1, -1,
            ],
            sprite: load("ground/cross")
        }, {
            pattern: [
                0, -1, 0,
                -1, 1,
                0, 1, 0,
            ],
            sprite: load("ground/thin_corner_top_left")
        }, {
            pattern: [
                0, -1, 0,
                1, -1,
                -1, 1, 0,
            ],
            sprite: load("ground/thin_corner_top_right")
        }, {
            pattern: [
                0, 1, -1,
                -1, 1,
                0, -1, 0,
            ],
            sprite: load("ground/thin_corner_bottom_left")
        }, {
            pattern: [
                -1, 1, 0,
                1, -1,
                0, -1, 0,
            ],
            sprite: load("ground/thin_corner_bottom_right")
        }, {
            pattern: [
                -1, 1, -1,
                1, 1,
                -1, 1, 1,
            ],
            sprite: load("ground/junction_top_left")
        }, {
            pattern: [
                -1, 1, -1,
                1, 1,
                1, 1, -1,
            ],
            sprite: load("ground/junction_top_right")
        }, {
            pattern: [
                -1, 1, 1,
                1, 1,
                -1, 1, -1,
            ],
            sprite: load("ground/junction_bottom_left")
        }, {
            pattern: [
                1, 1, -1,
                1, 1,
                -1, 1, -1,
            ],
            sprite: load("ground/junction_bottom_right")
        }, {
            pattern: [
                -1, 1, -1,
                1, 1,
                0, 1, 0,
            ],
            sprite: load("ground/junction_top")
        }, {
            pattern: [
                0, 1, 0,
                1, 1,
                -1, 1, -1,
            ],
            sprite: load("ground/junction_bottom")
        }, {
            pattern: [
                -1, 1, 0,
                1, 1,
                -1, 1, 0,
            ],
            sprite: load("ground/junction_left")
        }, {
            pattern: [
                0, 1, -1,
                1, 1,
                0, 1, -1,
            ],
            sprite: load("ground/junction_right")
        }, {
            pattern: [
                -1, 1, -1,
                1, 1,
                0, -1, 0,
            ],
            sprite: load("ground/thin_junction_top")
        }, {
            pattern: [
                0, -1, 0,
                1, 1,
                -1, 1, -1,
            ],
            sprite: load("ground/thin_junction_bottom")
        }, {
            pattern: [
                -1, 1, 0,
                1, -1,
                -1, 1, 0,
            ],
            sprite: load("ground/thin_junction_left")
        }, {
            pattern: [
                0, 1, -1,
                -1, 1,
                0, 1, -1,
            ],
            sprite: load("ground/thin_junction_right")
        }, {
            pattern: [
                -1, 1, 1,
                1, 1,
                0, -1, 0,
            ],
            sprite: load("ground/junction_horizontal_top_left")
        }, {
            pattern: [
                1, 1, -1,
                1, 1,
                0, -1, 0,
            ],
            sprite: load("ground/junction_horizontal_top_right")
        }, {
            pattern: [
                0, -1, 0,
                1, 1,
                -1, 1, 1,
            ],
            sprite: load("ground/junction_horizontal_bottom_left")
        }, {
            pattern: [
                0, -1, 0,
                1, 1,
                1, 1, -1,
            ],
            sprite: load("ground/junction_horizontal_bottom_right")
        }, {
            pattern: [
                -1, 1, 0,
                1, -1,
                1, 1, 0,
            ],
            sprite: load("ground/junction_vertical_top_left")
        }, {
            pattern: [
                0, 1, -1,
                -1, 1,
                0, 1, 1,
            ],
            sprite: load("ground/junction_vertical_top_right")
        }, {
            pattern: [
                1, 1, 0,
                1, -1,
                -1, 1, 0,
            ],
            sprite: load("ground/junction_vertical_bottom_left")
        }, {
            pattern: [
                0, 1, 1,
                -1, 1,
                0, 1, -1,
            ],
            sprite: load("ground/junction_vertical_bottom_right")
        }, {
            pattern: [
                -1, 1, 1,
                1, 1,
                1, 1, -1
            ],
            sprite: load("ground/double_junction_top")
        }, {
            pattern: [
                1, 1, -1,
                1, 1,
                -1, 1, 1
            ],
            sprite: load("ground/double_junction_bottom")
        }, {
            pattern: [
                0, 1, 0,
                1, 1,
                0, 1, 0
            ],
            sprite: load("ground/middle")
        }
    ];

    constructor() {
        super(Ground.DEFAULT);
    }

    variation(edges: (Block | null)[]): HTMLImageElement {
        outer:
        for(const variation of Ground.VARIATIONS) {
            for(let i = 0; i < 8; i++) {
                const [pattern, edge] = [variation.pattern[i], edges[i]];
                if(
                    (pattern == 1 && !(edge instanceof Ground)) ||
                    (pattern == -1 && edge instanceof Ground)
                ) {
                    continue outer;
                }
            }
            return variation.sprite;
        };
        return Ground.DEFAULT;
    }
}