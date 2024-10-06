/**
 * Represents a game over screen that displays when the game ends.
 * Extends the DrawableObject class to handle rendering the game over image.
 */
class GameOver extends DrawableObject {
    height = 480;
    width = 720;
    x = 0;
    y = 0;

    /**
     * Initializes the GameOver object by loading the specified image.
     * @param {string} path - The path to the game over image.
     */
    constructor(path) {
        super().loadImage(path);
    }
}
