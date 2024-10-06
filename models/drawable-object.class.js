/**
 * Represents an object that can be drawn on the canvas. 
 * Provides methods to load images, draw the object, and manage its visual representation.
 */
class DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    percentage = 0;


    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /**
     * Loads an image from a given path and assigns it to the object's img property.
     * 
     * @param {string} path - The path to the image to be loaded.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from the given array of paths and caches them.
     * 
     * @param {string[]} arr - An array of paths to the images to be loaded.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object's image onto the canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context used for drawing.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a frame around the object for debugging purposes.
     * Only draws the frame if the object is an instance of Character, Chicken, smallChicken, CollectableObject, or ThrowableObject.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context used for drawing.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof smallChicken || this instanceof CollectableObject || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.rect(this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Sets the percentage value and updates the image based on the percentage.
     * 
     * @param {number} percentage - The new percentage value to be set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image to be used based on the current percentage.
     * This method should be implemented in subclasses that use it.
     * 
     * @returns {number} The index of the image to be used.
     */
    resolveImageIndex() {
        throw new Error("resolveImageIndex() must be implemented in subclasses.");
    }
}
