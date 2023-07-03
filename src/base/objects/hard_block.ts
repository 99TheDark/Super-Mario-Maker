import { load } from "../../utils/images";
import { Block } from "../block";

export class HardBlock extends Block {
    static readonly SPRITE = load("blocks/hard_block");

    constructor() {
        super(HardBlock.SPRITE);
    }
}