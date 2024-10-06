/**
 * Represents a movable object in the game which can perform actions like moving,
 * jumping, applying gravity, and detecting collisions. Inherits from DrawableObject.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    enemyEnergy = 100;
    lastHit = 0;
    isActive = true;
    offsetX = 0;
    offsetY = 0;
    onCollisionCourse = false;
    /**
     * Applies gravity to the object, making it fall if it is above the ground or if its vertical speed is positive.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                return false;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground based on its type.
     * @returns {boolean} - True if the object is above the ground; otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject || this instanceof CollectableObject || this instanceof Chicken || this instanceof smallChicken) {
            return true;
        } else if (this.y > 180) {
            this.y = 180;  
            this.speedY = 0; 
            return false;
        } else {
            return this.y < 180;
        }
    }


    /**
     * Reduces the object's energy by the specified damage amount.
     * If energy drops below zero, it is set to zero. Updates the last hit timestamp.
     * @param {number} damage - The amount of damage to inflict.
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Sets the enemy's energy to zero, marks it as inactive, and disables collision detection.
     */
    hitEnemy() {
        this.enemyEnergy = 0;
        this.isActive = false;
        this.onCollisionCourse = false;
    }

    /**
     * Checks if the object is hurt based on the time passed since the last hit.
     * @returns {boolean} - True if the object was hit within the last second; otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if the object is dead based on its energy level.
     * @returns {boolean} - True if the object's energy is zero; otherwise false.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Checks if the enemy is dead based on its energy level.
     * @returns {boolean} - True if the enemy's energy is zero; otherwise false.
     */
    isEnemyDead() {
        return this.enemyEnergy === 0;
    }

    /**
     * Checks if this object is colliding with another object.
     * @param {DrawableObject} obj - The other object to check for collision with.
     * @returns {boolean} - True if the objects are colliding; otherwise false.
     */
    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }

    /**
     * Checks if this object is in the process of collecting another object.
     * @param {CollectableObject} obj - The object to check for collection.
     * @returns {boolean} - True if the object is collecting the target object; otherwise false.
     */
    isCollecting(obj) {
        let adjustedY = this.y + this.height - 100;
        return (this.x + this.width) >= obj.x &&
            this.x <= (obj.x + obj.width) &&
            (this.y + this.offsetY + this.height) >= obj.y &&
            adjustedY <= (obj.y + obj.height);
    }

    /**
     * Plays an animation by cycling through the provided images.
     * @param {Array<string>} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 30;
    }
}
