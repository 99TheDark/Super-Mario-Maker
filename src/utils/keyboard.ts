export class Keyboard {
    private keys: Record<string, boolean>;

    constructor() {
        this.keys = {};

        addEventListener("keydown", e => {
            this.keys[e.key] = true;
        });

        addEventListener("keyup", e => {
            this.keys[e.key] = false;
        });
    }

    down(key: string): boolean {
        return this.keys[key] ?? false;
    }

    up(key: string): boolean {
        return !this.down(key);
    }
}