class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('apple', 'src/assets/apple.png');
        this.load.image('basket', 'src/assets/basket.png');
        this.load.image('background', 'src/assets/background.jpg');
        this.load.image('junk', 'src/assets/junk.png');
        this.load.image('tree', 'src/assets/tree.png');
    }

    create() {
        this.scene.start('MenuScene');
    }
}
