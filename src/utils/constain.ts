export function constrain(value: number, min: number, max: number): number {
    return Math.max(Math.min(value, max), min);
};

export function absConstrain(value: number, constraint: number): number {
    return constrain(value, -constraint, constraint);
};