export function fill2D<T>(width: number, height: number, value: T): T[][] {
    const arr: T[][] = [];
    for(let y = 0; y < height; y++) {
        const row = [];
        for(let x = 0; x < width; x++) {
            row[x] = value;
        }
        arr.push(row);
    }
    return arr;
};

export function fillEmpty3D<T>(width: number, height: number): T[][][] {
    const arr: T[][][] = [];
    for(let y = 0; y < height; y++) {
        const row = [];
        for(let x = 0; x < width; x++) {
            row[x] = [];
        }
        arr.push(row);
    }
    return arr;
};