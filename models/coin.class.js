class Coin extends CollectableObject {

    height = 100;
    width = 100;
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',

    ];

    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);

        this.x = x;
        this.y = y;

        this.animate();
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}
