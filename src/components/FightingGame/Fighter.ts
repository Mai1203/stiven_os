import * as Phaser from 'phaser';

export enum FighterState {
  IDLE = 'IDLE',
  MOVING = 'MOVING',
  JUMPING = 'JUMPING',
  FALLING = 'FALLING',
  ATTACKING = 'ATTACKING',
  HIT = 'HIT',
  DEAD = 'DEAD'
}

import { Animator } from './Animator';

export class Fighter extends Phaser.GameObjects.Sprite {
  public declare body: Phaser.Physics.Arcade.Body;
  
  // Box types
  private pushbox: Phaser.Physics.Arcade.Body;
  private hurtbox: Phaser.GameObjects.Rectangle;
  private hitbox: Phaser.GameObjects.Rectangle;

  private fighterState: FighterState = FighterState.IDLE;
  private animator: Animator;
  private speed: number = 400;
  private jumpVelocity: number = -900;
  private isFacingRight: boolean = true;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, color: number) {
    super(scene, x, y, texture);
    this.setTint(color);
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    this.pushbox = this.body;
    this.pushbox.setCollideWorldBounds(true);
    this.pushbox.setBounce(0.0);
    this.pushbox.setGravityY(1200);

    // Initialize Animator
    this.animator = new Animator(this);
    this.setupAnimations();

    // Initialize Hurtbox
    this.hurtbox = scene.add.rectangle(x, y, 60, 110, 0x00ff00, 0.2);
    scene.physics.add.existing(this.hurtbox);
    (this.hurtbox.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

    // Initialize Hitbox
    this.hitbox = scene.add.rectangle(x, y, 40, 40, 0xff0000, 0.5);
    scene.physics.add.existing(this.hitbox);
    (this.hitbox.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    this.hitbox.setVisible(false);
    (this.hitbox.body as Phaser.Physics.Arcade.Body).enable = false;

    this.isFacingRight = x < 500;
  }

  private setupAnimations() {
    // Placeholder animations (using frame indices)
    this.animator.addAnimation({ key: 'idle', frames: [0], frameRate: 1, repeat: true });
    this.animator.addAnimation({ key: 'move', frames: [0, 1], frameRate: 8, repeat: true });
    this.animator.addAnimation({ key: 'jump', frames: [2], frameRate: 1, repeat: false });
    this.animator.addAnimation({ key: 'fall', frames: [3], frameRate: 1, repeat: false });
    this.animator.addAnimation({ key: 'attack', frames: [4, 5], frameRate: 15, repeat: false });
    
    this.animator.play('idle');
  }

  public update(time: number, delta: number, controls: { left: boolean; right: boolean; up: boolean; attack: boolean }) {
    if (this.fighterState === FighterState.DEAD) return;

    this.body.setVelocityX(0);

    // Movement
    if (controls.left) {
      this.body.setVelocityX(-this.speed);
      if (this.fighterState !== FighterState.ATTACKING) this.fighterState = FighterState.MOVING;
      this.isFacingRight = false;
    } else if (controls.right) {
      this.body.setVelocityX(this.speed);
      if (this.fighterState !== FighterState.ATTACKING) this.fighterState = FighterState.MOVING;
      this.isFacingRight = true;
    } else if (this.fighterState !== FighterState.ATTACKING && this.body.touching.down) {
      this.fighterState = FighterState.IDLE;
    }

    // Jump
    if (controls.up && this.body.touching.down && this.fighterState !== FighterState.ATTACKING) {
      this.body.setVelocityY(this.jumpVelocity);
      this.fighterState = FighterState.JUMPING;
    }

    // Attack
    if (controls.attack && this.fighterState !== FighterState.ATTACKING) {
        this.performAttack();
    }

    // Update state based on vertical velocity
    if (!this.body.touching.down && this.fighterState !== FighterState.ATTACKING) {
      if (this.body.velocity.y < 0) {
        this.fighterState = FighterState.JUMPING;
      } else {
        this.fighterState = FighterState.FALLING;
      }
    }

    // Apply animation based on state
    this.updateAnimation();

    // Update Animator
    this.animator.update(time, delta);

    // Sync Boxes
    this.syncBoxes();

    // Flip sprite
    this.setFlipX(!this.isFacingRight);
  }

  private updateAnimation() {
    switch (this.fighterState) {
      case FighterState.IDLE:
        this.animator.play('idle');
        break;
      case FighterState.MOVING:
        this.animator.play('move');
        break;
      case FighterState.JUMPING:
        this.animator.play('jump');
        break;
      case FighterState.FALLING:
        this.animator.play('fall');
        break;
      case FighterState.ATTACKING:
        this.animator.play('attack');
        break;
    }
  }

  private performAttack() {
    this.fighterState = FighterState.ATTACKING;
    
    // Enable Hitbox
    this.hitbox.setVisible(true);
    (this.hitbox.body as Phaser.Physics.Arcade.Body).enable = true;

    // Attack Duration
    this.scene.time.delayedCall(200, () => {
        this.hitbox.setVisible(false);
        (this.hitbox.body as Phaser.Physics.Arcade.Body).enable = false;
        if (this.fighterState === FighterState.ATTACKING) {
            this.fighterState = FighterState.IDLE;
        }
    });
  }

  private syncBoxes() {
    this.hurtbox.setPosition(this.x, this.y);
    const offsetX = this.isFacingRight ? 50 : -50;
    this.hitbox.setPosition(this.x + offsetX, this.y);
  }

  public setDebug(enabled: boolean) {
    this.hurtbox.setVisible(enabled);
    this.hurtbox.alpha = enabled ? 0.5 : 0.2;
  }

  public getDebugInfo() {
    return {
      state: this.fighterState,
      vx: Math.round(this.body.velocity.x),
      vy: Math.round(this.body.velocity.y),
      facing: this.isFacingRight ? 'Right' : 'Left'
    };
  }

  public getHurtbox() { return this.hurtbox; }
  public getHitbox() { return this.hitbox; }
  public getFighterState(): FighterState { return this.fighterState; }
}
