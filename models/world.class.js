class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new Statusbar();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    throwableObjects = [];
    bottles = 3;
    coins = 0;
    endboss_sound = new Audio('audio/endboss.mp3');
    soundtrack = new Audio('audio/el_pollo_loco.mp3');
    bottle_sound = new Audio('audio/bottle.mp3');
    collect_sound = new Audio('audio/collect.mp3');
    chicken = new Audio('audio/chicken.mp3');
    gameWin = new Audio('audio/win.mp3');
    gameover_sound = new Audio('audio/gameover_sound.mp3');
    isGameOver = false;
    isGameWon = false;
    isMuted = false;
    character = new Character();
    endboss = new Endboss();
    level = level1;




    /**
     * Creates an instance of World.
     * Initializes the game world, setting up the canvas, keyboard, and starting game loops.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
     * @param {Keyboard} keyboard - The keyboard instance for handling user input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.soundtrack.volume = 0.2;
        this.endboss_sound.volume = 0.8;
        this.bottle_sound.volume = 1;
        this.collect_sound.volume = 0.5;
        this.chicken.volume = 0.8;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world context for the character and end boss.
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * Clears all intervals by stopping them.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * Starts the game loop, including background music and checking game state.
     */
    run() {
        setInterval(() => {
            this.soundtrack.play();
        }, 150);

        setInterval(() => {
            this.checkCharacterJumpOnEnemy();
            this.checkCollisions();
            this.checkCollectionCoins();
            this.checkCollectionBottles();
            this.checkThrowObjects();
            this.checkHitEnemy();
        }, 50);
    }

    /**
     * Checks if the character jumps on an enemy and plays the appropriate sound.
     */
    checkCharacterJumpOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            const jumpedOn = this.character.jumpOnEnemy(enemy);
            if (jumpedOn) {
                this.chicken.play();
            }
        });
    }

    /**
     * Checks for collection of coins by the character.
     * Updates the coin count and plays the collect sound.
     */
    checkCollectionCoins() {
        this.level.coins = this.level.coins.filter(coin => {
            if (this.character.isCollecting(coin)) {
                this.collect_sound.currentTime = 0;
                this.collect_sound.play();
                coin.collect();
                this.coins++;
                this.statusbarCoins.setCoins(this.coins);
                return false;
            }
            return true;
        });
    }

    /**
     * Checks for collection of bottles by the character.
     * Updates the bottle count and plays the collect sound.
     */
    checkCollectionBottles() {
        this.level.salsabottles = this.level.salsabottles.filter(bottle => {
            if (this.character.isColliding(bottle)) {
                this.collect_sound.currentTime = 0;
                this.collect_sound.play();
                bottle.collect();
                this.bottles++;
                this.statusbarBottles.setBottles(this.bottles);
                return false;
            }
            return true;
        });
    }

    /**
     * Checks if the player is throwing objects and manages the creation of throwable objects.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottles--;
            this.statusbarBottles.setBottles(this.bottles);
        }
    }

    /**
     * Checks for collisions between the character and enemies or the end boss.
     * Updates the character's health if collisions occur.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit(5);
                this.statusbar.setPercentage(this.character.energy);
            }
        });

        if (this.character.isColliding(this.endboss)) {
            this.character.hit(10);
            this.statusbar.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks if throwable objects hit enemies or the end boss and applies damage.
     */
    checkHitEnemy() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    enemy.hitEnemy();
                    bottle.hitEnemy();
                    this.bottle_sound.play();
                    this.chicken.play();
                }
            });

            if (bottle.isColliding(this.endboss) && !bottle.hasCollided) {
                this.bottle_sound.play();
                this.chicken.play();
                this.endboss.hit(5);
                bottle.hitEnemy();
                console.log(this.endboss.energy);
                bottle.hasCollided = true;
            }
        });
    }

    /**
     * Draws the entire game world including background, UI, and game objects.
     */
    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);

        this.drawBackground();
        this.drawUI();
        this.drawGameObjects();

        this.ctx.translate(-this.camera_x, 0);

        this.drawGameOverOrWon();

        this.requestNextFrame();
    }

    /**
     * Clears the entire canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws the background elements on the canvas.
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Draws the UI elements (status bars) on the canvas.
     */
    drawUI() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottles);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws all game objects on the canvas.
     */
    drawGameObjects() {
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.endboss);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsabottles);
    }

    /**
     * Draws the game over or win screen if applicable.
     */
    drawGameOverOrWon() {
        if (this.isGameOver || this.isGameWon) {
            this.addToMap(new GameOver(this.isGameOver ?
                'img/9_intro_outro_screens/game_over/game over.png' :
                'img/9_intro_outro_screens/win/won_2.png'));
            this.soundtrack.pause();
            if (this.isGameOver && !this.gameOverSoundPlayed) {
                this.gameover_sound.play();
                this.gameOverSoundPlayed = true;
            } else if (this.isGameWon && !this.gameWinSoundPlayed) {
                this.gameWin.play();
                this.gameWinSoundPlayed = true;
            }
        }
    }

    /**
     * Requests the next animation frame for continuous drawing.
     */
    requestNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the map for drawing.
     * @param {DrawableObject[]} objects - Array of drawable objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single drawable object to the map for drawing.
     * @param {DrawableObject} mo - The drawable object to be added to the map.
     */
    addToMap(mo) {
        if (mo) {
            if (mo.otherDirection) {
                this.flipImage(mo);
            }

            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);

            if (mo.otherDirection) {
                this.flipImageBack(mo);
            }
        }
    }

    /**
     * Flips the image horizontally for objects facing the other direction.
     * @param {DrawableObject} mo - The drawable object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image to its original orientation after flipping.
     * @param {DrawableObject} mo - The drawable object to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Handles the game over scenario by setting the game over flag and redrawing the screen.
     */
    gameOver() {
        this.isGameOver = true;
        this.draw();
        document.getElementById('play-again-button').classList.remove('d-none');
    }

    replay() {
        this.isGameOver = false;
        this.isGameWon = false;
        this.draw();
        document.getElementById('play-again-button').classList.add('d-none');
    }

    /**
     * Handles the game won scenario by setting the game won flag and redrawing the screen.
     */
    gameWon() {
        this.isGameWon = true;
        this.draw();
        document.getElementById('play-again-button').classList.add('d-none');
    }
}

