/**
 * Represents a status bar for displaying the number of bottles collected.
 * Inherits from DrawableObject.
 */
class StatusbarBottles extends DrawableObject {
    x = 220;
    y = 280;
    height = 150;
    width = 100;

    /** 
     * Array of image paths for different bottle status levels.
     * @type {Array<string>}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    /** 
     * The number of bottles collected.
     * @type {number}
     */
    bottles = 3;

    /**
     * Creates an instance of StatusbarBottles.
     * Initializes the status bar's image and position, and sets the initial number of bottles.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setBottles(3);
    }

    /**
     * Sets the number of bottles and updates the displayed image.
     * @param {number} bottles - The number of bottles to display.
     */
    setBottles(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the number of bottles.
     * @returns {number} The index of the image corresponding to the current number of bottles.
     */
    resolveImageIndex() {
        if (this.bottles >= 5) {
            return 5;
        } else if (this.bottles === 4) {
            return 4;
        } else if (this.bottles === 3) {
            return 3;
        } else if (this.bottles === 2) {
            return 2;
        } else if (this.bottles === 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
