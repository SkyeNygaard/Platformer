import 'phaser';

export enum CharacterState {
    ACTIVE,
    STUNNED,
    DEFEATED
}

export class BaseCharacter {
    protected sprite: Phaser.Physics.Arcade.Sprite;
    protected scene: Phaser.Scene;
    protected state: CharacterState = CharacterState.ACTIVE;
    protected stateTimer: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, color: number) {
        this.scene = scene;
        
        // Create texture for the character
        const graphics = scene.add.graphics();
        graphics.fillStyle(color);
        graphics.fillRect(0, 0, 32, 48);
        const textureName = `character_${color.toString(16)}`;
        graphics.generateTexture(textureName, 32, 48);
        graphics.destroy();

        // Create the sprite
        this.sprite = scene.physics.add.sprite(x, y, textureName);
        this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);
    }

    public getSprite(): Phaser.Physics.Arcade.Sprite {
        return this.sprite;
    }

    public addCollider(object: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[], callback?: Function): void {
        this.scene.physics.add.collider(this.sprite, object, callback as any);
    }

    protected setVelocityX(velocity: number): void {
        this.sprite.setVelocityX(velocity);
    }

    protected setVelocityY(velocity: number): void {
        this.sprite.setVelocityY(velocity);
    }

    public getState(): CharacterState {
        return this.state;
    }

    protected setState(state: CharacterState, duration?: number): void {
        this.state = state;
        if (duration) {
            this.stateTimer = duration;
        }
    }

    public update(time: number, delta: number): void {
        // Update state timer
        if (this.stateTimer > 0) {
            this.stateTimer -= delta;
            if (this.stateTimer <= 0) {
                this.state = CharacterState.ACTIVE;
            }
        }
    }

    public handleCollision(other: BaseCharacter): void {
        // To be implemented by child classes
    }
}
