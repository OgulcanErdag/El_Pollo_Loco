/**
 * Represents the main character in the game, which can move, jump, and interact with the environment.
 * Inherits from the MovableObject class to support movement and animations.
 * 
 * @extends MovableObject
 */
class Character extends MovableObject {
    x = 120;
    y = 70;
    speed = 10;
    height = 250;
    width = 150;



    /** @type {string[]} Image paths for walking animation */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /** @type {string[]} Image paths for jumping animation */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /** @type {string[]} Image paths for dead animation */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /** @type {string[]} Image paths for hurt animation */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /** @type {string[]} Image paths for idle animation */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /** @type {string[]} Image paths for long idle animation */
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];


    world;
    running = new Audio('audio/running.mp3');
    jumping = new Audio('audio/jumping.mp3');
    throwing = new Audio('audio/throw.mp3');
    movement = 0;


    /**
     * Creates an instance of Character.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }



    /**
     * Starts the character's animation and handles movement and state changes.
     */
    animate() {
        setInterval(() => {
            this.handleMovement();
            this.handleJumping();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) this.endGame();
            else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
            else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
            else if (this.isMoving()) this.playAnimation(this.IMAGES_WALKING);
            else if (this.movement < 15) this.setIdleImage();
        }, 50);

        setInterval(() => this.handleIdleAnimation(), 300);
    }

    /**
     * Handles character movement based on keyboard input.
     */
    handleMovement() {
        this.running.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.running.play();
        } else if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.running.play();
        } else if (this.world.keyboard.D) {
            this.throwing.play();
            this.movement = 0;
        } else {
            this.throwing.pause();
            this.movement += 1 / (1000 / 60);
        }
    }

    /**
     * Handles character jumping based on keyboard input.
     */
    handleJumping() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.jumping.play();
            this.movement = 0;
        }
    }

    /**
     * Ends the game when the character is dead, playing the death animation.
     */
    endGame() {
        this.playAnimation(this.IMAGES_DEAD);
        this.world.clearAllIntervals();
        this.world.gameOver();
    }

    /**
     * Checks if the character is moving based on keyboard input.
     * 
     * @returns {boolean} True if the character is moving, otherwise false.
     */
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Sets the character's image to the first idle image.
     */
    setIdleImage() {
        this.img = this.imageCache[this.IMAGES_IDLE[0]];
    }

    /**
     * Handles the idle animation based on the character's movement.
     */
    handleIdleAnimation() {
        if (this.movement >= 45) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else if (this.movement >= 15) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Checks for collision with an enemy from the top.
     * 
     * @param {Object} enemy - The enemy object to check collision with.
     * @returns {boolean} True if the character collides with the enemy from the top, otherwise false.
     */
    jumpOnEnemy(enemy) {
        if (this.isCollidingFromTop(enemy)) {
            this.jump();
            enemy.hitEnemy();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks if the character is colliding with an enemy from the top.
     * 
     * @param {Object} enemy - The enemy object to check collision with.
     * @returns {boolean} True if the character is colliding from the top, otherwise false.
     */
    isCollidingFromTop(enemy) {
        return this.isColliding(enemy) && this.speedY < 0 &&
            (this.y + this.height) <= (enemy.y + enemy.height) &&
            (this.y + this.height) >= enemy.y &&
            this.x + this.width * 2 >= enemy.x + enemy.width;
    }
}
