import { load } from "../../utils/images";
import { Block } from "../block";

export class Brick extends Block {
    static readonly SPRITE = load("blocks/brick");

    constructor() {
        super(Brick.SPRITE);
    }
}