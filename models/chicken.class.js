/**
 * Represents a chicken enemy in the game, which can move and have different states (walking, dead).
 * Inherits from the MovableObject class to support movement and animations.
 * 
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 60;


    offset = {
        top: 18,
        left: 5,
        right: 7,
        bottom: 15,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    imgDead = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';



    /**
     * Creates an instance of Chicken.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = this.getNewPosition();
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
        this.onCollisionCourse = true;
    }

    /**
     * Generates a new random position for the chicken within a range.
     * 
     * @returns {number} The new position for the chicken.
     */
    getNewPosition() {
        let position = 700 + Math.random() * 3000;
        if (position > 200) {
            return position;
        }
    }

    /**
     * Starts the animation for the chicken, including movement and state changes.
     */
    animate() {
        // Moves the chicken to the left if it is not dead
        setInterval(() => {
            if (!this.isEnemyDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        // Handles image changes based on the chicken's state (dead or walking)
        setInterval(() => {
            if (this.isEnemyDead()) {
                this.loadImage(this.imgDead);
                this.applyGravity();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}
