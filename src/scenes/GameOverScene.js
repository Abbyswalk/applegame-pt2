class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        this.win = data.win; // true if player won
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Background color
        this.cameras.main.setBackgroundColor('#87CEEB'); // optional soft blue

        // Title text
        const titleText = this.win ? "You Win!" : "Game Over!";
        this.add.text(centerX, centerY - 80, titleText)
            .setOrigin(0.5)
            .setStyle({
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '48px',
                fontWeight: '700',
                color: '#222',
                stroke: '#000',
                strokeThickness: 2,
                shadow: {
                    offsetX: 2,
                    offsetY: 2,
                    color: '#000',
                    blur: 3,
                    stroke: true,
                    fill: false
                }
            });

        // Healthy eating tips
        const winTips = [
            "Great job! Eat more fruits and veggies for a healthy body!",
            "Awesome! A balanced diet keeps you strong and energized.",
            "Fantastic! Healthy snacks like apples are a great choice every day."
        ];

        const loseTips = [
            "Try again! Eating fruits and vegetables every day keeps you healthy.",
            "Don't give up! A colorful plate full of veggies boosts energy.",
            "Keep trying! Healthy foods can make a big difference in how you feel."
        ];

        const tipsArray = this.win ? winTips : loseTips;
        const tipText = Phaser.Utils.Array.GetRandom(tipsArray);

        this.add.text(centerX, centerY, tipText, {
            wordWrap: { width: 600 }
        })
        .setOrigin(0.5)
        .setStyle({
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '24px',
            fontWeight: '400',
            color: '#333'
        });

        // Restart instruction
        this.add.text(centerX, centerY + 80, "Click anywhere to play again")
            .setOrigin(0.5)
            .setStyle({
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '22px',
                fontWeight: '500',
                color: '#555'
            });

        // Click anywhere to restart the game
        this.input.on('pointerdown', () => {
            this.scene.start('PlayScene');
        });
    }
}
