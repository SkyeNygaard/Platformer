import { Player } from '../characters/Player';
import { Enemy } from '../characters/Enemy';

export class MainScene extends Phaser.Scene {
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Player;
    private enemies: Enemy[] = [];
    
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Load assets
        // this.load.image('ground', 'assets/platform.png');
        // this.load.spritesheet('player', 
        //     'assets/player.png',
        //     { frameWidth: 32, frameHeight: 48 }
        // );
    }

    create() {
        // Create platforms
        this.platforms = this.physics.add.staticGroup();
        
        // Create ground - a rectangle
        const ground = this.add.rectangle(400, 568, 800, 32, 0x00ff00);
        this.physics.add.existing(ground, true);
        this.platforms.add(ground);

        // Create some platform rectangles
        const platform1 = this.add.rectangle(600, 400, 200, 32, 0x00ff00);
        const platform2 = this.add.rectangle(50, 250, 200, 32, 0x00ff00);
        const platform3 = this.add.rectangle(750, 220, 200, 32, 0x00ff00);
        
        this.physics.add.existing(platform1, true);
        this.physics.add.existing(platform2, true);
        this.physics.add.existing(platform3, true);
        
        this.platforms.add(platform1);
        this.platforms.add(platform2);
        this.platforms.add(platform3);

        // Create player
        this.player = new Player(this, 100, 450);
        this.player.addCollider(this.platforms);

        // Create enemies
        const enemyPositions = [
            { x: 600, y: 350 },
            { x: 50, y: 200 },
            { x: 750, y: 170 }
        ];

        enemyPositions.forEach(pos => {
            const enemy = new Enemy(this, pos.x, pos.y);
            enemy.addCollider(this.platforms);
            
            // Add collision with player
            const handleCollision = () => {
                if (this.player) {
                    this.player.handleCollision(enemy);
                }
            };
            
            enemy.addCollider(this.player.getSprite(), handleCollision);
            this.enemies.push(enemy);
        });
    }

    update(time: number, delta: number) {
        // Update player
        this.player?.update(time, delta);

        // Update enemies
        this.enemies.forEach(enemy => enemy.update(time, delta));
    }
}
