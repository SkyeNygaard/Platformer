import 'phaser';
import { GameConfig } from './config';

window.addEventListener('load', () => {
    new Phaser.Game(GameConfig);
});
