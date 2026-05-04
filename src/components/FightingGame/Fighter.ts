import * as Phaser from 'phaser';

export enum FighterState {
  IDLE = 'IDLE',
  WALK = 'WALK',
  RUN = 'RUN',
  JUMP = 'JUMP',
  FALL = 'FALL',
  PROTECTION = 'PROTECTION',
  ATTACK = 'ATTACK',
  SHOT = 'SHOT',
  HURT = 'HURT',
  DEAD = 'DEAD'
}

import { FighterAtlasData } from './FighterData';
import { Animator } from './Animator';
import { StateMachine } from './StateMachine';

export class Fighter extends Phaser.GameObjects.Sprite {
  public declare body: Phaser.Physics.Arcade.Body;
  
  // Box types
  private pushbox: Phaser.Physics.Arcade.Body;
  private hurtbox: Phaser.GameObjects.Rectangle;
  private hitbox: Phaser.GameObjects.Rectangle;

  public characterName: string;
  private stateMachine: StateMachine;
  private animator: Animator;
  private isDebug: boolean = false;
  private speed: number = 250;
  private runSpeed: number = 450;
  private jumpVelocity: number = -850;
  public isFacingRight: boolean = true;
  public controls: { left: boolean; right: boolean; up: boolean; down: boolean; attack: boolean; shot: boolean } = {
    left: false, right: false, up: false, down: false, attack: false, shot: false
  };
  private prevControls: any = { ...this.controls };
  
  // Double tap detection
  private lastLeftTapTime: number = 0;
  private lastRightTapTime: number = 0;
  private doubleTapThreshold: number = 250; // ms
  private isRunning: boolean = false;

  // Stats
  public health: number = 100;
  public maxHealth: number = 100;
  public energy: number = 0;
  public maxEnergy: number = 100;
  public wins: number = 0;

  // Combo system
  private attackCombo: number = 0;
  private lastAttackTime: number = 0;
  private comboWindow: number = 1000; // 1 second to continue combo
  public canHit: boolean = true;

  constructor(scene: Phaser.Scene, x: number, y: number, data: FighterAtlasData, color: number) {
    super(scene, x, y, data.textureKey);
    this.characterName = data.name;
    this.setTint(color);
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    this.pushbox = this.body;
    this.pushbox.setCollideWorldBounds(true);
    this.pushbox.setBounce(0.0);
    this.pushbox.setGravityY(1400);

    // Initialize Animator
    this.animator = new Animator(this);
    this.setupAnimationsFromData(data);

    // Set Origin to center for perfect alignment
    this.setOrigin(0.5, 0.5);

    // Set Visual Scale
    this.setScale(2.5);

    // Initialize State Machine
    this.stateMachine = new StateMachine();
    this.setupStateMachine();

    // Configure Pushbox (Physical body)
    // Arcade Physics uses unscaled coordinates for setSize/setOffset
    this.body.setSize(40, 80); 
    this.body.setOffset(44, 48);
    this.body.setDragX(10000); // High drag to stop immediately after pushing/moving

    // Initialize Hurtbox (Visible area for damage)
    this.hurtbox = scene.add.rectangle(x, y, 100, 180, 0x00ff00, 0.2);
    this.hurtbox.setOrigin(0.5, 0.5);
    this.hurtbox.setVisible(false);
    scene.physics.add.existing(this.hurtbox);
    (this.hurtbox.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);

    // Initialize Hitbox (Area for dealing damage)
    this.hitbox = scene.add.rectangle(x, y, 120, 100, 0xff0000, 0.5);
    this.hitbox.setOrigin(0.5, 0.5);
    this.hitbox.setVisible(false);
    scene.physics.add.existing(this.hitbox);
    (this.hitbox.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    (this.hitbox.body as Phaser.Physics.Arcade.Body).enable = false;

    this.isFacingRight = x < 500;
  }

  private setupAnimationsFromData(data: FighterAtlasData) {
    Object.keys(data.animations).forEach(key => {
      const anim = data.animations[key];
      this.animator.addAnimation({
        key: key,
        texture: anim.texture || data.textureKey,
        frames: anim.frames,
        frameRate: anim.frameRate,
        repeat: anim.repeat,
        offsetX: anim.offsetX,
        offsetY: anim.offsetY
      });
    });
    
    this.animator.play('idle');
  }

  private setupStateMachine() {
    this.stateMachine.addState({
      name: FighterState.IDLE,
      enter: () => {
        this.animator.play('idle');
        this.body.setVelocityX(0);
      },
      update: () => {
        if (this.controls.left || this.controls.right) this.stateMachine.transition(FighterState.WALK);
        if (this.controls.up && this.body.touching.down) this.stateMachine.transition(FighterState.JUMP);
        if (this.controls.down && this.body.touching.down) this.stateMachine.transition(FighterState.PROTECTION);
        if (this.controls.attack) this.stateMachine.transition(FighterState.ATTACK);
        if (this.controls.shot) this.stateMachine.transition(FighterState.SHOT);
        if (!this.body.touching.down) this.stateMachine.transition(FighterState.FALL);
      },
      exit: () => {}
    });

    this.stateMachine.addState({
      name: FighterState.WALK,
      enter: () => this.animator.play('walk'),
      update: () => {
        const moveDir = this.controls.left ? -1 : (this.controls.right ? 1 : 0);
        if (moveDir === 0) this.stateMachine.transition(FighterState.IDLE);
        
        this.body.setVelocityX(moveDir * this.speed);
        this.isFacingRight = moveDir > 0 ? true : (moveDir < 0 ? false : this.isFacingRight);

        if (this.isRunning) this.stateMachine.transition(FighterState.RUN);
        if (this.controls.up && this.body.touching.down) this.stateMachine.transition(FighterState.JUMP);
        if (this.controls.attack) this.stateMachine.transition(FighterState.ATTACK);
      },
      exit: () => {}
    });

    this.stateMachine.addState({
      name: FighterState.RUN,
      enter: () => this.animator.play('run'),
      update: () => {
        const moveDir = this.controls.left ? -1 : (this.controls.right ? 1 : 0);
        if (moveDir === 0) {
            this.isRunning = false;
            this.stateMachine.transition(FighterState.IDLE);
        }
        
        this.body.setVelocityX(moveDir * this.runSpeed);
        this.isFacingRight = moveDir > 0 ? true : (moveDir < 0 ? false : this.isFacingRight);

        if (this.controls.up && this.body.touching.down) this.stateMachine.transition(FighterState.JUMP);
        if (this.controls.attack) this.stateMachine.transition(FighterState.ATTACK);
      },
      exit: () => {}
    });

    this.stateMachine.addState({
      name: FighterState.JUMP,
      enter: () => {
        this.animator.play('jump');
        this.body.setVelocityY(this.jumpVelocity);
      },
      update: () => {
        const moveDir = this.controls.left ? -1 : (this.controls.right ? 1 : 0);
        const currentSpeed = this.isRunning ? this.runSpeed : this.speed;
        this.body.setVelocityX(moveDir * currentSpeed);
        if (this.body.velocity.y > 0) this.stateMachine.transition(FighterState.FALL);
      },
      exit: () => {}
    });

    this.stateMachine.addState({
      name: FighterState.FALL,
      enter: () => this.animator.play('fall'),
      update: () => {
        const moveDir = this.controls.left ? -1 : (this.controls.right ? 1 : 0);
        const currentSpeed = this.isRunning ? this.runSpeed : this.speed;
        this.body.setVelocityX(moveDir * currentSpeed);
        if (this.body.touching.down) {
            if (this.isRunning && moveDir !== 0) {
                this.stateMachine.transition(FighterState.RUN);
            } else {
                this.stateMachine.transition(FighterState.IDLE);
            }
        }
      },
      exit: () => {}
    });

    this.stateMachine.addState({
      name: FighterState.ATTACK,
      enter: () => {
        const now = this.scene.time.now;
        if (now - this.lastAttackTime > this.comboWindow) {
            this.attackCombo = 0;
        }

        const attackKey = `attack${this.attackCombo + 1}`;
        this.animator.play(attackKey);
        this.body.setVelocityX(0);
        this.canHit = true;
        this.enableHitbox();
        
        // Cycle combo
        this.attackCombo = (this.attackCombo + 1) % 3;
        this.lastAttackTime = now;

        // Transition back after animation (approximate duration or fixed)
        this.scene.time.delayedCall(400, () => {
            if (this.stateMachine.getCurrentStateName() === FighterState.ATTACK) {
                this.stateMachine.transition(FighterState.IDLE);
            }
        });
      },
      update: () => {},
      exit: () => this.disableHitbox()
    });

    this.stateMachine.addState({
      name: FighterState.PROTECTION,
      enter: () => {
        this.animator.play('protection');
        this.body.setVelocityX(0);
        this.setAlpha(0.7);
      },
      update: () => {
        if (!this.controls.down) this.stateMachine.transition(FighterState.IDLE);
      },
      exit: () => this.setAlpha(1)
    });

    this.stateMachine.addState({
      name: FighterState.SHOT,
      enter: () => {
        this.animator.play('shot');
        this.body.setVelocityX(0);
        this.scene.time.delayedCall(300, () => this.stateMachine.transition(FighterState.IDLE));
      },
      update: () => {},
      exit: () => {}
    });

    this.stateMachine.addState({
      name: FighterState.HURT,
      enter: () => {
        this.animator.play('hurt');
        this.setTint(0xff0000);
        this.scene.time.delayedCall(200, () => {
          this.clearTint();
          if (this.health > 0) {
            this.stateMachine.transition(FighterState.IDLE);
          }
        });
      },
      update: () => {},
      exit: () => {}
    });

    this.stateMachine.addState({
      name: FighterState.DEAD,
      enter: () => {
        this.animator.play('dead');
        this.body.setVelocity(0, 0);
        this.body.setEnable(false); // No collision when dead
      },
      update: () => {},
      exit: () => {
        this.body.setEnable(true);
      }
    });

    this.stateMachine.transition(FighterState.IDLE);
  }

  public update(time: number, delta: number, controls: any) {
    // Detect just pressed
    const leftJustPressed = controls.left && !this.controls.left;
    const rightJustPressed = controls.right && !this.controls.right;

    if (leftJustPressed) {
        if (time - this.lastLeftTapTime < this.doubleTapThreshold) {
            this.isRunning = true;
        }
        this.lastLeftTapTime = time;
    }

    if (rightJustPressed) {
        if (time - this.lastRightTapTime < this.doubleTapThreshold) {
            this.isRunning = true;
        }
        this.lastRightTapTime = time;
    }

    // Reset running if no horizontal keys are down
    if (!controls.left && !controls.right) {
        this.isRunning = false;
    }

    this.prevControls = { ...this.controls };
    this.controls = { ...this.controls, ...controls };
    
    this.stateMachine.update(time, delta);
    this.animator.update(time, delta);

    // Apply Animation Visual Offset (Added to base offset 44, 48)
    let ox = 0;
    let oy = 0;
    
    if (typeof this.animator.getCurrentOffset === 'function') {
        const offset = this.animator.getCurrentOffset();
        ox = offset.x;
        oy = offset.y;
    }

    const flipFactor = this.isFacingRight ? 1 : -1;
    this.body.setOffset(44 + (ox * flipFactor), 48 + oy);

    this.syncBoxes();
    this.setFlipX(!this.isFacingRight);
  }

  private enableHitbox() {
    this.hitbox.setVisible(this.isDebug);
    (this.hitbox.body as Phaser.Physics.Arcade.Body).enable = true;
  }

  private disableHitbox() {
    this.hitbox.setVisible(false);
    (this.hitbox.body as Phaser.Physics.Arcade.Body).enable = false;
  }

  private syncBoxes() {
    this.hurtbox.setPosition(this.x, this.y);
    const offsetX = this.isFacingRight ? 100 : -100;
    this.hitbox.setPosition(this.x + offsetX, this.y);
  }

  public setDebug(enabled: boolean) {
    this.isDebug = enabled;
    this.hurtbox.setVisible(enabled);
    this.hurtbox.alpha = enabled ? 0.5 : 0.2;
  }

  public getDebugInfo() {
    return {
      state: this.stateMachine.getCurrentStateName(),
      vx: Math.round(this.body.velocity.x),
      vy: Math.round(this.body.velocity.y),
      facing: this.isFacingRight ? 'Right' : 'Left'
    };
  }

  public takeDamage(amount: number) {
    if (this.stateMachine.getCurrentStateName() === FighterState.DEAD) return;
    
    // If protecting, reduce damage
    if (this.stateMachine.getCurrentStateName() === FighterState.PROTECTION) {
        amount *= 0.2;
    }

    this.health = Math.max(0, this.health - amount);

    if (this.health <= 0) {
        this.stateMachine.transition(FighterState.DEAD);
    } else {
        this.stateMachine.transition(FighterState.HURT);
    }
  }

  public addEnergy(amount: number) {
    this.energy = Math.min(this.maxEnergy, this.energy + amount);
  }

  public reset() {
    this.health = 100;
    this.stateMachine.transition(FighterState.IDLE);
    this.isRunning = false;
    this.body.setEnable(true);
  }

  public getCurrentStateName(): string {
    return this.stateMachine.getCurrentStateName();
  }

  public getHurtbox() { return this.hurtbox; }
  public getHitbox() { return this.hitbox; }
}
