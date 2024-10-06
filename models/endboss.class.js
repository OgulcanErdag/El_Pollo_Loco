/**
 * Represents an end boss in the game, extending the MovableObject class.
 * This boss can walk, alert, attack, and react to being hurt or defeated.
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 25;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    world;
    endboss_sound = new Audio('audio/endboss.mp3');

    /**
     * Initializes the Endboss object by setting up its images and starting animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4500;
        this.animate();
    }

    /**
     * Handles the animation and behavior of the endboss based on its state and position.
     */
    animate() {
        setInterval(() => {
            this.adjustSpeed();

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.world.clearAllIntervals();
                this.world.gameWon();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.attackPlayer();
            } else if (this.world.character.x > 3900) {
                this.playAnimation(this.IMAGES_WALKING);
                this.endboss_sound.play();
                this.moveLeft();
            } else if (this.world.character.x >= 3900 && this.world.character.x < 4100) {
                this.playAnimation(this.IMAGES_ALERT);
                this.moveLeft();
            } else if (this.world.character.x >= 4200) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.attackPlayer();
            }
        }, 100);
    }

    /**
     * Attacks the player by moving towards them when they are in range.
     */
    attackPlayer() {
        if (this.x > this.world.character.x) {
            this.x -= this.speed * 3;
        }
    }

    /**
     * Adjusts the speed of the endboss based on its current energy level.
     */
    adjustSpeed() {
        if (this.energy < 10) {
            this.speed = 9;
        } else if (this.energy < 20) {
            this.speed = 7;
        } else {
            this.speed = 5;
        }
    }
}
