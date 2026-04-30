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
  
  // Box types
  private pushbox: Phaser.Physics.Arcade.Body;
  private hurtbox: Phaser.GameObjects.Rectangle;
  private hitbox: Phaser.GameObjects.Rectangle;

  private fighterState: FighterState = FighterState.IDLE;
  private speed: number = 400;
  private jumpVelocity: number = -900;
  private isFacingRight: boolean = true;

  constructor(scene: Phaser.Scene, x: number, y: number, color: number) {
    super(scene, x, y, 50, 100, color);
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    this.pushbox = this.body;
    this.pushbox.setCollideWorldBounds(true);
    this.pushbox.setBounce(0.0);
    this.pushbox.setGravityY(1200);

    // Initialize Hurtbox (Area where fighter takes damage)
    // It's slightly wider than the pushbox for easier hitting
    this.hurtbox = scene.add.rectangle(x, y, 60, 110, 0x00ff00, 0.2);
    scene.physics.add.existing(this.hurtbox);
    (this.hurtbox.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

    // Initialize Hitbox (Area where fighter deals damage)
    // Hidden by default, only active during attacks
    this.hitbox = scene.add.rectangle(x, y, 40, 40, 0xff0000, 0.5);
    scene.physics.add.existing(this.hitbox);
    (this.hitbox.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    this.hitbox.setVisible(false);
    (this.hitbox.body as Phaser.Physics.Arcade.Body).enable = false;

    this.isFacingRight = x < 500; // Face center by default
  }

  public update(controls: { left: boolean; right: boolean; up: boolean; attack: boolean }) {
    if (this.fighterState === FighterState.DEAD) return;

    this.body.setVelocityX(0);

    // Movement
    if (controls.left) {
      this.body.setVelocityX(-this.speed);
      this.fighterState = FighterState.MOVING;
      this.isFacingRight = false;
    } else if (controls.right) {
      this.body.setVelocityX(this.speed);
      this.fighterState = FighterState.MOVING;
      this.isFacingRight = true;
    } else if (this.fighterState !== FighterState.ATTACKING) {
      this.fighterState = FighterState.IDLE;
    }

    // Jump
    if (controls.up && this.body.touching.down) {
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

    // Sync Boxes
    this.syncBoxes();
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
    // Sync Hurtbox (Centered on fighter)
    this.hurtbox.setPosition(this.x, this.y);

    // Sync Hitbox (In front of fighter)
    const offsetX = this.isFacingRight ? 50 : -50;
    this.hitbox.setPosition(this.x + offsetX, this.y);
  }

  public getHurtbox() {
      return this.hurtbox;
  }

  public getHitbox() {
      return this.hitbox;
  }
}
