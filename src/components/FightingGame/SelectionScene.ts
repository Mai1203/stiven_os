import * as Phaser from 'phaser';
import { SAMURAI_DATA, COMMANDER_DATA, ARCHER_DATA, FighterAtlasData } from './FighterData';

export class SelectionScene extends Phaser.Scene {
    private players: FighterAtlasData[] = [];
    private p1Selection: number = 0;
    private p2Selection: number = 1;
    
    private p1Preview!: Phaser.GameObjects.Sprite;
    private p2Preview!: Phaser.GameObjects.Sprite;
    
    private p1InfoText!: Phaser.GameObjects.Text;
    private p1LoreText!: Phaser.GameObjects.Text;
    private p2InfoText!: Phaser.GameObjects.Text;
    private p2LoreText!: Phaser.GameObjects.Text;
    
    private p1StatsGraphics!: Phaser.GameObjects.Graphics;
    private p2StatsGraphics!: Phaser.GameObjects.Graphics;

    constructor() {
        super('SelectionScene');
    }

    preload() {
        this.load.image('bg_selection', 'imgFightingGame/background.png');
        
        // Load idle sprites using keys from FighterData.ts
        const samuraiPath = 'imgFightingGame/Samurai/';
        const commanderPath = 'imgFightingGame/Samurai_Commander/';
        const archerPath = 'imgFightingGame/Samurai_Archer/';

        this.load.spritesheet('samurai_idle', samuraiPath + 'Idle.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('commander_idle', commanderPath + 'Idle.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('archer_idle', archerPath + 'Idle.png', { frameWidth: 128, frameHeight: 128 });
    }

    create() {
        this.players = [SAMURAI_DATA, COMMANDER_DATA, ARCHER_DATA];
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Background with overlay
        this.add.image(width/2, height/2, 'bg_selection').setDisplaySize(width, height).setAlpha(0.4);
        this.add.rectangle(0, 0, width, height, 0x000000, 0.6).setOrigin(0);

        // Title
        this.add.text(width / 2, 50, 'SELECT YOUR FIGHTER', {
            fontFamily: 'Arial Black',
            fontSize: '48px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.createPlayerSection(width * 0.25, 'PLAYER 1', true);
        this.createPlayerSection(width * 0.75, 'PLAYER 2', false);

        // Controls hint
        this.add.text(width / 2, 180, 'P1: [W/S] to Change • P2: [Up/Down] to Change\nPress [SPACE] to Start Fight', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#aaaaaa',
            align: 'center'
        }).setOrigin(0.5);

        this.setupInputs();
        this.updatePreviews();
    }

    private createPlayerSection(x: number, title: string, isP1: boolean) {
        // 1. Background panel first
        this.add.rectangle(x, 480, 340, 220, 0x000000, 0.4);

        // 2. Title and info
        this.add.text(x, 120, title, {
            fontFamily: 'Arial Black',
            fontSize: '32px',
            color: isP1 ? '#3498db' : '#e74c3c'
        }).setOrigin(0.5);

        // Character Name
        const nameText = this.add.text(x, 400, '', {
            fontFamily: 'Arial Black',
            fontSize: '28px',
            color: '#ffffff'
        }).setOrigin(0.5).setDepth(10);

        // Lore Text
        const loreText = this.add.text(x, 460, '', {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#ffffff',
            wordWrap: { width: 320 },
            align: 'center'
        }).setOrigin(0.5).setDepth(10);

        if (isP1) {
            this.p1InfoText = nameText;
            this.p1LoreText = loreText;
            this.p1Preview = this.add.sprite(x, 230, '').setScale(2.0);
            this.p1StatsGraphics = this.add.graphics();
        } else {
            this.p2InfoText = nameText;
            this.p2LoreText = loreText;
            this.p2Preview = this.add.sprite(x, 230, '').setScale(2.0).setFlipX(true);
            this.p2StatsGraphics = this.add.graphics();
        }
    }

    private setupInputs() {
        this.input.keyboard?.on('keydown-W', () => this.changeSelection(true, -1));
        this.input.keyboard?.on('keydown-S', () => this.changeSelection(true, 1));
        this.input.keyboard?.on('keydown-UP', () => this.changeSelection(false, -1));
        this.input.keyboard?.on('keydown-DOWN', () => this.changeSelection(false, 1));
        this.input.keyboard?.on('keydown-SPACE', () => this.startFight());
    }

    private changeSelection(isP1: boolean, dir: number) {
        if (isP1) {
            this.p1Selection = Phaser.Math.Wrap(this.p1Selection + dir, 0, this.players.length);
        } else {
            this.p2Selection = Phaser.Math.Wrap(this.p2Selection + dir, 0, this.players.length);
        }
        this.updatePreviews();
    }

    private updatePreviews() {
        const p1Data = this.players[this.p1Selection];
        const p2Data = this.players[this.p2Selection];

        // Update P1
        if (p1Data) {
            this.p1Preview.setTexture(p1Data.textureKey);
            this.p1InfoText.setText(p1Data.name);
            this.p1LoreText.setText(p1Data.lore);
            this.drawStats(this.p1StatsGraphics, 50, 500, p1Data.stats, true);
        }

        // Update P2
        if (p2Data) {
            this.p2Preview.setTexture(p2Data.textureKey);
            this.p2InfoText.setText(p2Data.name);
            this.p2LoreText.setText(p2Data.lore);
            this.drawStats(this.p2StatsGraphics, this.cameras.main.width * 0.5 + 50, 500, p2Data.stats, false);
        }
    }

    private p1StatTexts: Phaser.GameObjects.Text[] = [];
    private p2StatTexts: Phaser.GameObjects.Text[] = [];

    private drawStats(g: Phaser.GameObjects.Graphics, x: number, y: number, stats: any, isP1: boolean) {
        if (!stats) return;
        g.clear();
        
        // Clear previous texts
        const texts = isP1 ? this.p1StatTexts : this.p2StatTexts;
        texts.forEach(t => t.destroy());
        if (isP1) this.p1StatTexts = []; else this.p2StatTexts = [];

        const startX = isP1 ? this.cameras.main.width * 0.08 : this.cameras.main.width * 0.58;
        const width = 250;
        
        const drawBar = (label: string, value: number, index: number) => {
            const barY = y + (index * 40);
            
            // Label
            const t = this.add.text(startX, barY - 15, label, {
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#aaaaaa',
                fontStyle: 'bold'
            });
            if (isP1) this.p1StatTexts.push(t); else this.p2StatTexts.push(t);

            // Background bar
            g.fillStyle(0x222222, 1);
            g.fillRoundedRect(startX, barY, width, 10, 5);
            
            // Value bar
            const color = isP1 ? 0x3498db : 0xe74c3c;
            g.fillStyle(color, 1);
            g.fillRoundedRect(startX, barY, (value / 100) * width, 10, 5);
        };

        drawBar('ATTACK', stats.attack, 0);
        drawBar('SPEED', stats.speed, 1);
        drawBar('DEFENSE', stats.defense, 2);
    }

    private startFight() {
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('GameScene', {
                p1Data: this.players[this.p1Selection],
                p2Data: this.players[this.p2Selection]
            });
        });
    }
}
