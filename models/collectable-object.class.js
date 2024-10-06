/**
 * Represents an object in the game that can be collected by the player. 
 * It inherits from the MovableObject class and adds functionality for gravity and collection.
 * 
 * @extends MovableObject
 */
class CollectableObject extends MovableObject {

    constructor() {
        super();
        this.onCollisionCourse = false;
    }

    /**
     * Handles the collection of the object, which typically involves applying gravity to it.
     * This method should be called when the object is collected by the player.
     */
    collect() {
        this.applyGravity();
    }

    /**
     * Applies gravity to the object, making it fall down if it is above ground.
     * The object's position is updated based on its vertical speed and acceleration.
     * This method runs continuously to simulate gravity.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }
}
