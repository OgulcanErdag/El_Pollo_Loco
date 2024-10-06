/**
 * Represents a status bar for displaying the number of coins collected.
 * Inherits from DrawableObject.
 */
class StatusbarCoins extends DrawableObject {
    x = 220;
    y = 280;
    height = 150;
    width = 100;

    /** 
     * Array of image paths for different coin status levels.
     * @type {Array<string>}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /** 
     * The number of coins collected.
     * @type {number}
     */
    coins = 0;

    /**
     * Creates an instance of StatusbarCoins.
     * Initializes the status bar's image and position, and sets the initial number of coins.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setCoins(0);
    }

    /**
     * Sets the number of coins and updates the displayed image.
     * @param {number} coins - The number of coins to display.
     */
    setCoins(coins) {
        this.coins = coins;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the number of coins.
     * @returns {number} The index of the image corresponding to the current number of coins.
     */
    resolveImageIndex() {
        if (this.coins >= 5) {
            return 5;
        } else if (this.coins === 4) {
            return 4;
        } else if (this.coins === 3) {
            return 3;
        } else if (this.coins === 2) {
            return 2;
        } else if (this.coins === 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
