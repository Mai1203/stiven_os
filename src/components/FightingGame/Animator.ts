import * as Phaser from 'phaser';

export interface AnimationConfig {
  key: string;
  texture?: string; // Optional: change texture when this animation plays
  frames: number[];
  frameRate: number;
  repeat: boolean;
}

export class Animator {
  private target: Phaser.GameObjects.Sprite;
  private animations: Map<string, AnimationConfig> = new Map();
  private currentAnimation: AnimationConfig | null = null;
  private currentFrameIndex: number = 0;
  private timer: number = 0;
  private isPaused: boolean = false;

  constructor(target: Phaser.GameObjects.Sprite) {
    this.target = target;
  }

  public addAnimation(config: AnimationConfig) {
    this.animations.set(config.key, config);
  }

  public play(key: string, ignoreIfPlaying: boolean = true) {
    if (ignoreIfPlaying && this.currentAnimation?.key === key) return;

    const config = this.animations.get(key);
    if (!config) {
      console.warn(`Animation ${key} not found`);
      return;
    }

    this.currentAnimation = config;
    
    // Switch texture if specified
    if (config.texture) {
        this.target.setTexture(config.texture);
    }

    this.currentFrameIndex = 0;
    this.timer = 0;
    this.isPaused = false;
    
    // Set initial frame
    this.target.setFrame(this.currentAnimation.frames[this.currentFrameIndex]);
  }

  public update(time: number, delta: number) {
    if (!this.currentAnimation || this.isPaused) return;

    this.timer += delta;
    const msPerFrame = 1000 / this.currentAnimation.frameRate;

    if (this.timer >= msPerFrame) {
      this.timer -= msPerFrame;
      this.currentFrameIndex++;

      if (this.currentFrameIndex >= this.currentAnimation.frames.length) {
        if (this.currentAnimation.repeat) {
          this.currentFrameIndex = 0;
        } else {
          this.currentFrameIndex = this.currentAnimation.frames.length - 1;
          this.isPaused = true;
          this.target.emit('animationcomplete', this.currentAnimation.key);
        }
      }

      this.target.setFrame(this.currentAnimation.frames[this.currentFrameIndex]);
    }
  }

  public pause() {
    this.isPaused = true;
  }

  public resume() {
    this.isPaused = false;
  }

  public stop() {
    this.currentAnimation = null;
    this.isPaused = true;
  }

  public getCurrentKey(): string | undefined {
    return this.currentAnimation?.key;
  }
}
