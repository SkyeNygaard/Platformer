import 'phaser';
import { MainScene } from './scenes/MainScene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true // Enable debug mode to see physics bodies
        }
    },
    scene: MainScene,
    backgroundColor: '#87CEEB', // Sky blue background
};
