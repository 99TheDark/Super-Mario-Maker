import { setup } from "../constants";

export function load(location: string): HTMLImageElement {
    const img = new Image();
    img.src = `src/assets/${location}.png`;

    setup.push(new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = err => reject(err);
    }));

    return img;
}