import { Animation } from "../utils/animation";

export class Animatable {
    private defaultSprite: HTMLImageElement;
    private curAnimation: Animation | HTMLImageElement | null;

    constructor(defaultSprite: HTMLImageElement, curAnimation: Animation | HTMLImageElement | null) {
        this.defaultSprite = defaultSprite;
        this.curAnimation = curAnimation;
    }

    setAnimation(animation: Animation | HTMLImageElement | null): void {
        if(this.curAnimation != animation && animation instanceof Animation) {
            animation.restart();
        }
        this.curAnimation = animation;
    }

    getFrame(): HTMLImageElement {
        if(this.curAnimation == null) {
            return this.defaultSprite;
        } else if(this.curAnimation instanceof HTMLImageElement) {
            return this.curAnimation;
        } else {
            return this.curAnimation.frame();
        }
    }

    setSpeed(speed: number): void {
        if(this.curAnimation instanceof Animation)
            this.curAnimation.speed = speed;
    }
}