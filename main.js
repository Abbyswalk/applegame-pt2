const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
        BootScene,
        MenuScene,
        PlayScene,
        GameOverScene
    ]
};

const game = new Phaser.Game(config);
