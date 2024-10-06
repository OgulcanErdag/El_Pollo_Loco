/**
 * Represents a background object in the game, such as a layer of scenery.
 * Inherits from the MovableObject class to support movement.
 * 
 * @extends MovableObject
 */

class BackgroundObject extends MovableObject {

    /** @type {number} Width of the background object */
    width = 720;

    /** @type {number} Height of the background object */
    height = 480;

    /**
     * Creates an instance of BackgroundObject.
     * 
     * @param {string} imagePath - The path to the image representing the background.
     * @param {number} x - The x-coordinate where the background object starts.
     * @param {number} y - The y-coordinate where the background object starts (optional).
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // Set the y-coordinate to position the object at the bottom of the screen
    }
}
