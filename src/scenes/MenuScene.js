class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Background color
        this.cameras.main.setBackgroundColor('#87CEEB');

        // Game title
        this.add.text(centerX, centerY - 120, "An Apple a Day", {
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '56px',
            fontWeight: '700',
            color: '#222',
            stroke: '#000',
            strokeThickness: 3,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000',
                blur: 3,
                stroke: true,
                fill: false
            }
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(centerX, centerY - 40, "Keeps the Doctor Away", {
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '28px',
            fontWeight: '400',
            color: '#333'
        }).setOrigin(0.5);

        // Instructions
        this.add.text(centerX, centerY + 60, "Use ← → to move the basket\nCatch apples, avoid junk!", {
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '22px',
            fontWeight: '400',
            color: '#555',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        // Start button text
        const startText = this.add.text(centerX, centerY + 140, "Click anywhere to Start", {
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '24px',
            fontWeight: '500',
            color: '#000'
        }).setOrigin(0.5);

        // Button hover effect
        startText.setInteractive({ useHandCursor: true });
        startText.on('pointerover', () => startText.setStyle({ color: '#ff4500' }));
        startText.on('pointerout', () => startText.setStyle({ color: '#000' }));

        // Start the game on click
        this.input.on('pointerdown', () => {
            this.scene.start('PlayScene');
        });
    }
}
