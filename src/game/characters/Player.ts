import { BaseCharacter, CharacterState } from './BaseCharacter';
import { Enemy } from './Enemy';

export class Player extends BaseCharacter {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 0x0000ff); // Blue color
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    public update(time: number, delta: number): void {
        super.update(time, delta);

        if (this.state !== CharacterState.ACTIVE) return;

        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
        } else {
            this.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.sprite.body.touching.down) {
            this.setVelocityY(-330);
        }
    }

    public handleCollision(other: BaseCharacter): void {
        if (other instanceof Enemy) {
            const enemy = other as Enemy;
            if (enemy.getState() === CharacterState.ACTIVE) {
                enemy.handleCollision(this);
            }
        }
    }
}
