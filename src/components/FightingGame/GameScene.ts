import * as Phaser from 'phaser';
import { Fighter } from './Fighter';
import { SAMURAI_DATA, COMMANDER_DATA } from './FighterData';

export class GameScene extends Phaser.Scene {
  private player1!: Fighter;
  private player2!: Fighter;
  
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: {
    w: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    s: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
    e: Phaser.Input.Keyboard.Key;
    space: Phaser.Input.Keyboard.Key;
    f1: Phaser.Input.Keyboard.Key;
  };

  private cursorsPlus!: {
    ctrl: Phaser.Input.Keyboard.Key;
  };

  private isDebugMode: boolean = false;
  private debugText!: Phaser.GameObjects.Text;

  constructor() {
    super('GameScene');
  }

  preload() {
    // Cargar Assets de Samurai (Jugador 1)
    const samuraiPath = 'imgFightingGame/Samurai/';
    this.load.spritesheet('samurai_idle', samuraiPath + 'Idle.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('samurai_walk', samuraiPath + 'Walk.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('samurai_run', samuraiPath + 'Run.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('samurai_jump', samuraiPath + 'Jump.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('samurai_attack_1', samuraiPath + 'Attack_1.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('samurai_protect', samuraiPath + 'Protect.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('samurai_hurt', samuraiPath + 'Hurt.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('samurai_dead', samuraiPath + 'Dead.png', { frameWidth: 128, frameHeight: 128 });

    // Cargar Assets de Samurai Commander (Jugador 2)
    const commanderPath = 'imgFightingGame/Samurai_Commander/';
    this.load.spritesheet('commander_idle', commanderPath + 'Idle.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('commander_walk', commanderPath + 'Walk.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('commander_run', commanderPath + 'Run.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('commander_jump', commanderPath + 'Jump.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('commander_attack_1', commanderPath + 'Attack_1.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('commander_protect', commanderPath + 'Protect.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('commander_hurt', commanderPath + 'Hurt.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('commander_dead', commanderPath + 'Dead.png', { frameWidth: 128, frameHeight: 128 });
  }

  create() {
    // Configurar límites del mundo
    this.physics.world.setBounds(0, 0, 1000, 560);

    // Crear el suelo
    const ground = this.add.rectangle(500, 540, 1000, 40, 0x4a4a4a);
    this.physics.add.existing(ground, true);

    // Instanciar Luchadores con sus respectivos datos
    this.player1 = new Fighter(this, 250, 300, SAMURAI_DATA, 0xffffff);
    this.player2 = new Fighter(this, 750, 300, COMMANDER_DATA, 0xffffff);

    this.physics.add.collider(this.player1, ground);
    this.physics.add.collider(this.player2, ground);
    this.physics.add.collider(this.player1, this.player2);

    this.physics.add.overlap(this.player1.getHitbox(), this.player2.getHurtbox(), () => {
        console.log('Player 1 hits Player 2!');
    });

    this.physics.add.overlap(this.player2.getHitbox(), this.player1.getHurtbox(), () => {
        console.log('Player 2 hits Player 1!');
    });

    // Sistema de Inputs
    if (this.input.keyboard) {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            e: Phaser.Input.Keyboard.KeyCodes.E,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            f1: Phaser.Input.Keyboard.KeyCodes.F1
        }) as any;
        
        this.cursorsPlus = {
            ctrl: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL)
        };
    }

    // Overlay de Debug
    this.debugText = this.add.text(10, 10, '', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#00ff00',
        backgroundColor: '#00000088',
        padding: { x: 10, y: 10 }
    }).setScrollFactor(0).setDepth(1000);
    this.debugText.setVisible(false);
  }

  update(time: number, delta: number) {
    // Safety check for initialization
    if (!this.player1 || !this.player2 || !this.keys || !this.cursors) return;

    // Toggle Debug (F1)
    if (Phaser.Input.Keyboard.JustDown(this.keys.f1)) {
        this.isDebugMode = !this.isDebugMode;
        this.debugText.setVisible(this.isDebugMode);
        this.player1.setDebug(this.isDebugMode);
        this.player2.setDebug(this.isDebugMode);
        
        this.physics.world.drawDebug = this.isDebugMode;
        if (this.isDebugMode && !this.physics.world.debugGraphic) {
            this.physics.world.createDebugGraphic();
        }
        if (this.physics.world.debugGraphic) {
            this.physics.world.debugGraphic.setVisible(this.isDebugMode);
        }
    }

    if (this.isDebugMode) {
        this.updateDebugInfo();
    }

    // Actualizar Player 1 (WASD + Space + E)
    if (this.keys.a && this.keys.d && this.keys.w && this.keys.s && this.keys.space && this.keys.e) {
        this.player1.update(time, delta, {
            left: this.keys.a.isDown,
            right: this.keys.d.isDown,
            up: this.keys.w.isDown,
            down: this.keys.s.isDown,
            attack: this.keys.space.isDown,
            shot: this.keys.e.isDown
        });
    }

    // Actualizar Player 2 (Flechas + Shift + Ctrl)
    if (this.cursors.left && this.cursors.right && this.cursors.up && this.cursors.down && this.cursors.shift && this.cursorsPlus.ctrl) {
        this.player2.update(time, delta, {
            left: this.cursors.left.isDown,
            right: this.cursors.right.isDown,
            up: this.cursors.up.isDown,
            down: this.cursors.down.isDown,
            attack: this.cursors.shift.isDown,
            shot: this.cursorsPlus.ctrl.isDown
        });
    }
  }

  private updateDebugInfo() {
    const p1Info = this.player1.getDebugInfo();
    const p2Info = this.player2.getDebugInfo();
    const fps = Math.round(this.game.loop.actualFps);

    this.debugText.setText([
        `DEBUG MODE - FPS: ${fps}`,
        `-------------------------`,
        `PLAYER 1 (Blue):`,
        `  State: ${p1Info.state}`,
        `  Vel:   X:${p1Info.vx} Y:${p1Info.vy}`,
        `  Dir:   ${p1Info.facing}`,
        ``,
        `PLAYER 2 (Red):`,
        `  State: ${p2Info.state}`,
        `  Vel:   X:${p2Info.vx} Y:${p2Info.vy}`,
        `  Dir:   ${p2Info.facing}`
    ].join('\n'));
  }
}
