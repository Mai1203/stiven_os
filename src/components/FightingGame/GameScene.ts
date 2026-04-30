import * as Phaser from 'phaser';
import { Fighter } from './Fighter';

export class GameScene extends Phaser.Scene {
  private player1!: Fighter;
  private player2!: Fighter;
  
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
    space: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super('GameScene');
  }

  create() {
    // Configurar límites del mundo
    this.physics.world.setBounds(0, 0, 1000, 560);

    // Crear el suelo
    const ground = this.add.rectangle(500, 540, 1000, 40, 0x4a4a4a);
    this.physics.add.existing(ground, true);

    // Instanciar Luchadores
    this.player1 = new Fighter(this, 250, 300, 0x3b82f6);
    this.player2 = new Fighter(this, 750, 300, 0xef4444);

    // Agregar colisiones (Pushboxes)
    this.physics.add.collider(this.player1, ground);
    this.physics.add.collider(this.player2, ground);
    this.physics.add.collider(this.player1, this.player2);

    // Detección de Golpes (Hitbox vs Hurtbox)
    this.physics.add.overlap(this.player1.getHitbox(), this.player2.getHurtbox(), () => {
        console.log('Player 1 hits Player 2!');
        // Here we would call player2.takeDamage()
    });

    this.physics.add.overlap(this.player2.getHitbox(), this.player1.getHurtbox(), () => {
        console.log('Player 2 hits Player 1!');
        // Here we would call player1.takeDamage()
    });

    // Sistema de Inputs
    if (this.input.keyboard) {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        }) as any;
    }
  }

  update() {
    // Safety check for initialization
    if (!this.player1 || !this.player2 || !this.keys || !this.cursors) return;

    // Actualizar Player 1 (WASD + Space)
    if (this.keys.a && this.keys.d && this.keys.w && this.keys.space) {
        this.player1.update({
            left: this.keys.a.isDown,
            right: this.keys.d.isDown,
            up: this.keys.w.isDown,
            attack: this.keys.space.isDown
        });
    }

    // Actualizar Player 2 (Flechas + Shift)
    if (this.cursors.left && this.cursors.right && this.cursors.up && this.cursors.shift) {
        this.player2.update({
            left: this.cursors.left.isDown,
            right: this.cursors.right.isDown,
            up: this.cursors.up.isDown,
            attack: this.cursors.shift.isDown
        });
    }
  }
}
