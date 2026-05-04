import * as Phaser from 'phaser';
import { GameScene } from './GameScene';
import { SelectionScene } from './SelectionScene';

export class FightingGameEngine {
    private game: Phaser.Game;

    constructor(container: HTMLElement) {
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 1000,
            height: 600,
            parent: container,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 1000, x: 0 },
                    debug: false
                }
            },
            scene: [SelectionScene, GameScene]
        };

        this.game = new Phaser.Game(config);
    }

    public destroy() {
        if (this.game) {
            this.game.destroy(true);
        }
    }

    public pause() {
        this.game.scene.pause('GameScene');
    }

    public resume() {
        this.game.scene.resume('GameScene');
    }
}
