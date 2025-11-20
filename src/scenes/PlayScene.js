class PlayScene extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    preload() {
        this.load.image('background', 'assets/background.jpg');
        this.load.image('tree', 'assets/tree.png');
        this.load.image('apple', 'assets/apple.png');
        this.load.image('junk', 'assets/junk.png'); 
        this.load.image('basket', 'assets/basket.png');
        this.load.audio('appleCatch', 'assets/applecatch.mp3');
    }

    create() {

        const bg = this.add.image(0, 0, 'background').setOrigin(0);
        bg.displayWidth = this.sys.game.config.width;
        bg.displayHeight = this.sys.game.config.height;

        this.appleCatchSound = this.sound.add('appleCatch');

        this.add.image(400, 250, 'tree').setScale(0.15);

        this.score = 0;
        this.lives = 5;

        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '24px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 3
        });

        this.livesText = this.add.text(16, 46, 'Lives: 5', {
            fontSize: '24px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 3
        });

        this.basket = this.physics.add.sprite(400, 560, 'basket').setScale(0.8);
        this.basket.setCollideWorldBounds(true);
        this.basket.body.allowGravity = false;
        this.basketSpeed = 600;

        this.cursors = this.input.keyboard.createCursorKeys();

        this.apples = this.physics.add.group();
        this.junk = this.physics.add.group();

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                const x = Phaser.Math.Between(50, 750);
                const apple = this.apples.create(x, -20, 'apple');
                apple.setScale(0.9);
                apple.setVelocityY(175);
            },
            loop: true
        });

        this.time.addEvent({
            delay: 1800,
            callback: () => {
                const x = Phaser.Math.Between(50, 750);
                const junk = this.junk.create(x, -20, 'junk');
                junk.setScale(0.05);
                junk.setVelocityY(100);
                junk.setAngularVelocity(Phaser.Math.Between(-50, 50));
            },
            loop: true
        });

        this.physics.add.overlap(this.basket, this.apples, this.collectApple, null, this);
        this.physics.add.overlap(this.basket, this.junk, this.hitJunk, null, this);
    }

collectApple(basket, apple) {
    apple.destroy();
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score);
        this.appleCatchSound.play({ volume: 0.4 });

    if (this.score >= 20) {
        this.scene.start('GameOverScene', { win: true });
    }
}

hitJunk(basket, junk) {
    junk.destroy();
    this.lives -= 1;
    this.livesText.setText('Lives: ' + this.lives);

    if (this.lives <= 0) {
        this.scene.start('GameOverScene', { win: false });
    }
}

    update() {
        if (this.cursors.left.isDown) {
            this.basket.setVelocityX(-this.basketSpeed);
        } else if (this.cursors.right.isDown) {
            this.basket.setVelocityX(this.basketSpeed);
        } else {
            this.basket.setVelocityX(0);
        }

this.apples.getChildren().forEach(apple => {
    if (apple.y > 600) {
        apple.destroy();

        if (this.lives > 0) {
            this.lives -= 1;
            this.livesText.setText('Lives: ' + this.lives);
        }

        if (this.lives <= 0) {
            this.scene.start('GameOverScene', { win: false });
        }
    }
});

        this.junk.getChildren().forEach(j => {
            if (j.y > 600) j.destroy();
        });
    }
}
