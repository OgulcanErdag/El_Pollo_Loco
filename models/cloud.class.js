/**
 * Represents a cloud in the game that moves horizontally across the screen.
 * Inherits from the MovableObject class to support movement and animations.
 * 
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.15;

    /**
     * Creates an instance of Cloud.
     * 
     * @param {number} startX - The initial x-coordinate position of the cloud.
     */
    constructor(startX) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = startX;
        this.animate();
    }

    /**
     * Starts the animation for the cloud, causing it to move horizontally.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Moves the cloud to the left. If the cloud moves off-screen, it is repositioned.
     */
    moveLeft() {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.x = 5000;
        }
    }
}
