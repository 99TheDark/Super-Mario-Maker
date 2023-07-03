import { Collider } from "../utils/collision";
import { Direction } from "../utils/direction";
import { fill2D, fillEmpty3D } from "../utils/fill";
import { Renderer } from "./renderer";
import { Vector } from "../utils/vector";
import { Block } from "./block";
import { Entity } from "./entity";
import { Ground } from "./objects/ground";
import { Animation } from "../utils/animation";

export class Level {
    private _width: number;
    private _height: number;

    private blocks: (Block | null)[][];
    private entityMap: Entity[][][];
    private entities: Entity[];

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;

        this.blocks = fill2D<Block | null>(width, height, null);
        this.entityMap = fillEmpty3D<Entity>(width, height);
        this.entities = [];
    }

    update(direction: Direction): void {
        this.sortEntities();
        this.entities.forEach(entity => !entity.static && entity.update(direction));
        this.entities.forEach(entity => !entity.static && entity.collide(this.surrounding(entity), direction));
    }

    draw(renderer: Renderer): void {
        this.forEachBlock((block, x, y) => {
            if(block instanceof Ground) {
                block.sprite = block.variation(this.edges(x, y));
            }
            block?.draw(renderer, x, y);
        });
        this.entities.forEach(entity => entity.draw(renderer));
    }

    run(renderer: Renderer): void {
        Animation.all();
        this.update("x");
        this.update("y");
        this.entities.forEach(entity => entity.run());

        this.draw(renderer);
    }

    forEachBlock(callback: (block: Block | null, x: number, y: number) => void): void {
        for(let y = 0; y < this._height; y++) {
            for(let x = 0; x < this._width; x++) {
                callback(this.blocks[y][x], x, y);
            }
        }
    }

    edges(x: number, y: number): (Block | null)[] {
        return [
            this.get(x - 1, y + 1),
            this.get(x, y + 1),
            this.get(x + 1, y + 1),
            this.get(x - 1, y),
            this.get(x + 1, y),
            this.get(x - 1, y - 1),
            this.get(x, y - 1),
            this.get(x + 1, y - 1)
        ];
    }

    surrounding(entity: Entity): Collider[] {
        const [x, y] = [Math.round(entity.x), Math.round(entity.y)];
        const positions = [
            new Vector(x - 1, y + 1),
            new Vector(x, y + 1),
            new Vector(x + 1, y + 1),
            new Vector(x - 1, y),
            new Vector(x, y),
            new Vector(x + 1, y),
            new Vector(x - 1, y - 1),
            new Vector(x, y - 1),
            new Vector(x + 1, y - 1)
        ];

        const surrounding: Collider[] = [];
        positions.forEach(pos => {
            const block = this.get(pos.x, pos.y);
            if(block) {
                surrounding.push({
                    source: block,
                    x: pos.x,
                    y: pos.y,
                    width: 1,
                    height: 1
                });
            }
        });

        this.getEntities(x, y)?.forEach(entity => {
            !entity.static && surrounding.push({
                source: entity,
                x: entity.x,
                y: entity.y,
                width: entity.width,
                height: entity.height
            });
        });

        return surrounding;
    }

    sortEntities(): void {
        for(let i = this.entities.length - 1; i >= 0; i--) {
            if(this.entities[i].dead) this.entities.splice(i, 1);
        }

        for(let y = 0; y < this._height; y++) {
            for(let x = 0; x < this._width; x++) {
                this.entityMap[y][x].length = 0;
            }
        }
        this.entities.forEach(entity => {
            const [x, y] = [Math.round(entity.x), Math.round(entity.y)];
            this.addEntity(x - 1, y + 1, entity);
            this.addEntity(x, y + 1, entity);
            this.addEntity(x, y + 1, entity);
            this.addEntity(x - 1, y, entity);
            this.addEntity(x, y, entity);
            this.addEntity(x + 1, y, entity);
            this.addEntity(x - 1, y + 1, entity);
            this.addEntity(x, y + 1, entity);
            this.addEntity(x + 1, y + 1, entity);
        });
    }

    set(x: number, y: number, block: Block): void {
        if(this.inside(x, y)) this.blocks[y][x] = block;
    }

    get(x: number, y: number): Block | null {
        return this.inside(x, y) ? this.blocks[y][x] : null;
    }

    private addEntity(x: number, y: number, entity: Entity): void {
        if(this.inside(x, y)) this.entityMap[y][x].push(entity);
    }

    private getEntities(x: number, y: number): Entity[] | null {
        return this.inside(x, y) ? this.entityMap[y][x] : null;
    }

    inside(x: number, y: number): boolean {
        return x >= 0 && y >= 0 && x < this._width && y < this._height;
    }

    spawn(entity: Entity): void {
        this.entities.push(entity);
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}