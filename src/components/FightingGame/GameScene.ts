import * as Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  private player1!: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  private player2!: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
  
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super('GameScene');
  }

  create() {
    // Configurar límites del mundo
    this.physics.world.setBounds(0, 0, 1000, 560);

    // Crear el suelo
    const ground = this.add.rectangle(500, 540, 1000, 40, 0x4a4a4a);
    this.physics.add.existing(ground, true); // true = static body

    // Crear Player 1 (Azul)
    this.player1 = this.add.rectangle(250, 300, 50, 100, 0x3b82f6) as any;
    this.physics.add.existing(this.player1);
    this.player1.body.setCollideWorldBounds(true);
    this.player1.body.setBounce(0.0); // Sin rebote
    this.player1.body.setGravityY(1200); // Gravedad adicional

    // Crear Player 2 (Rojo)
    this.player2 = this.add.rectangle(750, 300, 50, 100, 0xef4444) as any;
    this.physics.add.existing(this.player2);
    this.player2.body.setCollideWorldBounds(true);
    this.player2.body.setBounce(0.0); // Sin rebote
    this.player2.body.setGravityY(1200); // Gravedad adicional

    // Agregar colisiones
    this.physics.add.collider(this.player1, ground);
    this.physics.add.collider(this.player2, ground);
    this.physics.add.collider(this.player1, this.player2);

    // Sistema de Inputs
    if (this.input.keyboard) {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D
        }) as any;
    }
  }

  // El Loop Principal del Juego con delta time
  update(time: number, delta: number) {
    if (!this.keys || !this.cursors || !this.player1?.body || !this.player2?.body) return;

    // La velocidad base. Multiplicar por delta puede ser útil para movimiento manual sin físicas de Arcade
    // En este caso, Arcade Physics maneja el delta time internamente para las velocidades, 
    // pero configuramos velocidades constantes en base a los inputs.
    const speed = 400; 
    const jumpVelocity = -900;

    // --- Movimiento de Player 1 (Teclas WASD) ---
    this.player1.body.setVelocityX(0);

    if (this.keys.a.isDown) {
        this.player1.body.setVelocityX(-speed);
    } else if (this.keys.d.isDown) {
        this.player1.body.setVelocityX(speed);
    }

    if (this.keys.w.isDown && this.player1.body.touching.down) {
        this.player1.body.setVelocityY(jumpVelocity);
    }

    // --- Movimiento de Player 2 (Flechas Direccionales) ---
    this.player2.body.setVelocityX(0);

    if (this.cursors.left.isDown) {
        this.player2.body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
        this.player2.body.setVelocityX(speed);
    }

    if (this.cursors.up.isDown && this.player2.body.touching.down) {
        this.player2.body.setVelocityY(jumpVelocity);
    }
  }
}
