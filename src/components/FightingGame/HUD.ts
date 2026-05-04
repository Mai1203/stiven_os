import * as Phaser from 'phaser';
import { Fighter } from './Fighter';

export class HUD {
    private scene: any;
    private p1: Fighter;
    private p2: Fighter;

    // UI Elements - Player 1
    private p1HealthBar!: Phaser.GameObjects.Graphics;
    private p1HealthBarWhite!: Phaser.GameObjects.Graphics;
    private p1EnergyBar!: Phaser.GameObjects.Graphics;
    private p1NameText!: Phaser.GameObjects.Text;
    private p1WinDots: any[] = [];

    // UI Elements - Player 2
    private p2HealthBar!: Phaser.GameObjects.Graphics;
    private p2HealthBarWhite!: Phaser.GameObjects.Graphics;
    private p2EnergyBar!: Phaser.GameObjects.Graphics;
    private p2NameText!: Phaser.GameObjects.Text;
    private p2WinDots: any[] = [];

    // Timer
    private timerText!: Phaser.GameObjects.Text;
    private timeRemaining: number = 99;
    private timerEvent!: Phaser.Time.TimerEvent;
    
    // Game Over Overlay
    private gameOverContainer!: Phaser.GameObjects.Container;
    private winText!: Phaser.GameObjects.Text;

    // Animation values
    private p1DisplayHealth: number = 100;
    private p1WhiteHealth: number = 100;
    private p2DisplayHealth: number = 100;
    private p2WhiteHealth: number = 100;

    constructor(scene: Phaser.Scene, p1: Fighter, p2: Fighter) {
        this.scene = scene;
        this.p1 = p1;
        this.p2 = p2;

        this.createLayout();
        this.startTimer();
    }

    private createLayout() {
        const width = this.scene.cameras.main.width;
        
        // P1 Name
        this.p1NameText = this.scene.add.text(50, 20, this.p1.characterName, {
            fontFamily: 'Arial Black',
            fontSize: '24px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0, 0);

        // P2 Name
        this.p2NameText = this.scene.add.text(width - 50, 20, this.p2.characterName, {
            fontFamily: 'Arial Black',
            fontSize: '24px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(1, 0);

        // Timer
        this.timerText = this.scene.add.text(width / 2, 45, '99', {
            fontFamily: 'Arial Black',
            fontSize: '48px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Health Bars Backgrounds
        this.createBarBackground(50, 55, 350, 20, 10);
        this.createBarBackground(width - 400, 55, 350, 20, 10);

        // Health Bars Graphics
        this.p1HealthBarWhite = this.scene.add.graphics();
        this.p1HealthBar = this.scene.add.graphics();
        
        this.p2HealthBarWhite = this.scene.add.graphics();
        this.p2HealthBar = this.scene.add.graphics();

        // Energy Bars Backgrounds
        this.createBarBackground(50, 85, 250, 8, 4);
        this.createBarBackground(width - 300, 85, 250, 8, 4);

        this.p1EnergyBar = this.scene.add.graphics();
        this.p2EnergyBar = this.scene.add.graphics();

        // Win Dots
        for (let i = 0; i < 2; i++) {
            this.p1WinDots.push(this.scene.add.circle(50 + (i * 25), 110, 6, 0x444444).setStrokeStyle(2, 0x000000));
            this.p2WinDots.push(this.scene.add.circle(width - 50 - (i * 25), 110, 6, 0x444444).setStrokeStyle(2, 0x000000));
        }

        this.createGameOverScreen();
    }

    private createGameOverScreen() {
        const width = this.scene.cameras.main.width;
        const height = this.scene.cameras.main.height;

        this.gameOverContainer = this.scene.add.container(0, 0).setDepth(2000).setVisible(false);

        const bg = this.scene.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0, 0);
        
        this.winText = this.scene.add.text(width / 2, height / 2 - 50, 'PLAYER 1 WINS!', {
            fontFamily: 'Arial Black',
            fontSize: '64px',
            color: '#f1c40f',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        const restartBtn = this.scene.add.text(width / 2, height / 2 + 50, 'NEW GAME', {
            fontFamily: 'Arial Black',
            fontSize: '32px',
            color: '#ffffff',
            backgroundColor: '#e74c3c',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        restartBtn.on('pointerdown', () => {
            this.scene.scene.restart();
        });

        restartBtn.on('pointerover', () => restartBtn.setStyle({ color: '#f1c40f' }));
        restartBtn.on('pointerout', () => restartBtn.setStyle({ color: '#ffffff' }));

        this.gameOverContainer.add([bg, this.winText, restartBtn]);
    }

    public showGameOver(winnerName: string) {
        this.winText.setText(`${winnerName} WINS!`);
        this.gameOverContainer.setVisible(true);
        if (this.timerEvent) this.timerEvent.destroy();
    }

    private createBarBackground(x: number, y: number, w: number, h: number, r: number) {
        this.scene.add.graphics()
            .fillStyle(0x000000, 0.5)
            .fillRoundedRect(x, y, w, h, r)
            .lineStyle(2, 0xffffff, 0.1)
            .strokeRoundedRect(x, y, w, h, r);
    }

    private startTimer() {
        this.timerEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.timeRemaining > 0) {
                    this.timeRemaining--;
                    const displayTime = this.timeRemaining < 10 ? '0' + this.timeRemaining : this.timeRemaining.toString();
                    this.timerText.setText(displayTime);
                }
            },
            loop: true
        });
    }

    public update(time: number, delta: number) {
        if (!this.p1 || !this.p2) return;

        // Interpolate health for smooth animation
        const lerpSpeed = 0.15;
        const whiteLerpSpeed = 0.05;

        this.p1DisplayHealth = Phaser.Math.Linear(this.p1DisplayHealth, this.p1.health || 0, lerpSpeed);
        this.p1WhiteHealth = Phaser.Math.Linear(this.p1WhiteHealth, this.p1.health || 0, whiteLerpSpeed);
        
        this.p2DisplayHealth = Phaser.Math.Linear(this.p2DisplayHealth, this.p2.health || 0, lerpSpeed);
        this.p2WhiteHealth = Phaser.Math.Linear(this.p2WhiteHealth, this.p2.health || 0, whiteLerpSpeed);

        this.drawHealthBars();
        this.drawEnergyBars();
        this.updateWinDots();
    }

    private drawHealthBars() {
        const width = 350; // Slightly less wide
        const height = 20; // Slimmer
        const radius = 10; // Rounded
        const yPos = 55;

        // Player 1
        this.p1HealthBarWhite.clear();
        this.p1HealthBarWhite.fillStyle(0xffffff, 0.6);
        this.p1HealthBarWhite.fillRoundedRect(50, yPos, (this.p1WhiteHealth / 100) * width, height, radius);

        this.p1HealthBar.clear();
        const p1Color = this.getHealthColor(this.p1DisplayHealth);
        this.p1HealthBar.fillStyle(p1Color, 1);
        this.p1HealthBar.fillRoundedRect(50, yPos, (this.p1DisplayHealth / 100) * width, height, radius);

        // Player 2 (Right to Left)
        const p2X = this.scene.cameras.main.width - 50;
        this.p2HealthBarWhite.clear();
        this.p2HealthBarWhite.fillStyle(0xffffff, 0.6);
        this.p2HealthBarWhite.fillRoundedRect(p2X - ((this.p2WhiteHealth / 100) * width), yPos, (this.p2WhiteHealth / 100) * width, height, radius);

        this.p2HealthBar.clear();
        const p2Color = this.getHealthColor(this.p2DisplayHealth);
        this.p2HealthBar.fillStyle(p2Color, 1);
        this.p2HealthBar.fillRoundedRect(p2X - ((this.p2DisplayHealth / 100) * width), yPos, (this.p2DisplayHealth / 100) * width, height, radius);
    }

    private getHealthColor(health: number): number {
        if (health > 50) return 0x00ff88; // Bright Neon Green
        if (health > 25) return 0xffcc00; // Gold
        return 0xff3344; // Vibrant Red
    }

    private drawEnergyBars() {
        const width = 250;
        const height = 8;
        const radius = 4;
        const yPos = 85;

        // Player 1
        this.p1EnergyBar.clear();
        this.p1EnergyBar.fillStyle(0x00d4ff, 1);
        this.p1EnergyBar.fillRoundedRect(50, yPos, (this.p1.energy / 100) * width, height, radius);

        // Player 2
        const p2X = this.scene.scale.width - 50;
        this.p2EnergyBar.clear();
        this.p2EnergyBar.fillStyle(0x00d4ff, 1);
        this.p2EnergyBar.fillRoundedRect(p2X - ((this.p2.energy / 100) * width), yPos, (this.p2.energy / 100) * width, height, radius);
    }

    private updateWinDots() {
        this.p1WinDots.forEach((dot, i) => {
            if (i < this.p1.wins) dot.setFillStyle(0xf1c40f);
        });
        this.p2WinDots.forEach((dot, i) => {
            if (i < this.p2.wins) dot.setFillStyle(0xf1c40f);
        });
    }
}
