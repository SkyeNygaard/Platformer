import { BaseCharacter, CharacterState } from './BaseCharacter';

export class Enemy extends BaseCharacter {
    private moveSpeed: number = 100;
    private direction: number = 1;
    private moveDistance: number = 200;
    private startX: number;
    private changeDirectionTimer: number = 0;
    private baseColor: number = 0xff0000;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 0xff0000); // Red color
        this.startX = x;
        this.sprite.setTint(this.baseColor);
    }

    public update(time: number, delta: number): void {
        super.update(time, delta);

        if (this.state === CharacterState.DEFEATED) {
            return;
        }

        if (this.state === CharacterState.STUNNED) {
            this.sprite.setTint(0xff8888); // Lighter red when stunned
            return;
        }

        this.sprite.setTint(this.baseColor);

        // Update direction change timer
        this.changeDirectionTimer -= delta;
        if (this.changeDirectionTimer <= 0) {
            // Randomly change direction and speed
            this.direction = Math.random() > 0.5 ? 1 : -1;
            this.moveSpeed = 50 + Math.random() * 150; // Random speed between 50 and 200
            this.changeDirectionTimer = 500 + Math.random() * 2000; // Change direction every 0.5 to 2.5 seconds
        }

        // Keep within bounds
        const currentX = this.sprite.x;
        if (currentX >= this.startX + this.moveDistance) {
            this.direction = -1;
        } else if (currentX <= this.startX - this.moveDistance) {
            this.direction = 1;
        }

        this.setVelocityX(this.moveSpeed * this.direction);
    }

    public handleCollision(other: BaseCharacter): void {
        if (this.state !== CharacterState.ACTIVE) return;

        const otherSprite = other.getSprite();
        const mySprite = this.sprite;

        // Check if the other character (player) is above this enemy
        if (otherSprite.y < mySprite.y - mySprite.height * 0.5) {
            this.setState(CharacterState.STUNNED, 1000); // Stunned for 1 second
            otherSprite.setVelocityY(-330); // Bounce the player up
        }
    }
}
