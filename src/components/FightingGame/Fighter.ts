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

export class Fighter extends Phaser.GameObjects.Rectangle {
  public declare body: Phaser.Physics.Arcade.Body;
  private fighterState: FighterState = FighterState.IDLE;
  private speed: number = 400;
  private jumpVelocity: number = -900;

  constructor(scene: Phaser.Scene, x: number, y: number, color: number) {
    super(scene, x, y, 50, 100, color);
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setBounce(0.0);
    body.setGravityY(1200);
  }

  public update(controls: { left: boolean; right: boolean; up: boolean }) {
    if (this.fighterState === FighterState.DEAD) return;

    this.body.setVelocityX(0);

    if (controls.left) {
      this.body.setVelocityX(-this.speed);
      this.fighterState = FighterState.MOVING;
    } else if (controls.right) {
      this.body.setVelocityX(this.speed);
      this.fighterState = FighterState.MOVING;
    } else {
      this.fighterState = FighterState.IDLE;
    }

    if (controls.up && this.body.touching.down) {
      this.body.setVelocityY(this.jumpVelocity);
      this.fighterState = FighterState.JUMPING;
    }

    // Update state based on vertical velocity
    if (!this.body.touching.down) {
      if (this.body.velocity.y < 0) {
        this.fighterState = FighterState.JUMPING;
      } else {
        this.fighterState = FighterState.FALLING;
      }
    }
  }

  public getFighterState(): FighterState {
    return this.fighterState;
  }
}
