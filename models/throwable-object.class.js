/**
 * Represents a throwable object, such as a bottle.
 * Inherits from MovableObject.
 */
class ThrowableObject extends MovableObject {

    /** 
     * Array of image paths for the rotating bottle animation.
     * @type {Array<string>}
     */
    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /** 
     * Array of image paths for the bottle splash animation.
     * @type {Array<string>}
     */
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /** 
     * Creates an instance of ThrowableObject.
     * Initializes the throwable object's image, position, size, and starts its animation.
     * @param {number} x - The initial horizontal position of the throwable object.
     * @param {number} y - The initial vertical position of the throwable object.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 70;
        this.throw();
        this.animate();
        this.hasCollided = false;
    }

    /**
     * Initiates the throwing action of the object by setting its speed and applying gravity.
     */
    throw() {
        this.speedY = 30;
        this.speedX = 20;
        this.applyGravity();
    }

    /**
     * Plays the animation using the provided image array.
     * Overrides the base class method to ensure correct image playing.
     * @param {Array<string>} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        super.playAnimation(images);
    }

    /**
     * Animates the throwable object, including rotation and splash effects.
     * Uses a setInterval to update the object's state and animation.
     */
    animate() {
        setInterval(() => {
            if (this.isActive && this.isAboveGround()) {
                this.x += 10;
                this.playAnimation(this.IMAGES);
            } else if (!this.isActive) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                if (this.currentImage >= this.IMAGES_BOTTLE_SPLASH.length) {
                    this.isActive = null;
                }

            }
        }, 50);
    }
}
