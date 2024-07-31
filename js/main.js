const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game;

let reels;
let spinButton;
let testWinButton;
let symbols = [
    '10', '9', 'A', 'BONUS', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
    'J', 'K', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'Q'
];
let symbolValues = { '10': 10, '9': 9, 'A': 15, 'BONUS': 50, 'H1': 20, 'H2': 25, 'H3': 30, 'H4': 35, 'H5': 40, 'H6': 45, 'J': 12, 'K': 18, 'M1': 22, 'M2': 28, 'M3': 32, 'M4': 38, 'M5': 42, 'M6': 48, 'Q': 20 };
let winText;
let moneyText;
let winAmount = 0;

function preload() {
    symbols.forEach(symbol => {
        this.load.image(symbol, `assets/${symbol}.png`);
        this.load.image(`${symbol}_connect`, `assets/${symbol}_connect.png`);
    });
}

function create() {
    const reelWidth = 200;
    const reelHeight = 200;
    const reelSpacing = 20;
    const canvasWidth = 5 * (reelWidth + reelSpacing) - reelSpacing;
    const canvasHeight = 3 * (reelHeight + reelSpacing) - reelSpacing;

    this.scale.resize(canvasWidth, canvasHeight);

    reels = [];
    for (let i = 0; i < 5; i++) {
        reels[i] = [];
        for (let j = 0; j < 3; j++) {
            let symbol = symbols[Phaser.Math.Between(0, symbols.length - 1)];
            let sprite = this.add.sprite(
                i * (reelWidth + reelSpacing) + reelWidth / 2,
                j * (reelHeight + reelSpacing) + reelHeight / 2,
                symbol
            ).setOrigin(0.5).setDisplaySize(reelWidth, reelHeight);

            reels[i][j] = sprite;
        }
    }

    spinButton = document.getElementById('spin-button');
    spinButton.addEventListener('click', spinReels);

    testWinButton = document.getElementById('test-win-button');
    testWinButton.addEventListener('click', testWin);

    winText = document.getElementById('win-text');
    moneyText = document.getElementById('money');
}

function update() {}

function spinReels() {
    winText.style.display = 'none';
    winAmount = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
            let symbol = symbols[Phaser.Math.Between(0, symbols.length - 1)];
            reels[i][j].setTexture(symbol);
        }
    }
    winAmount = checkWins();
    moneyText.innerText = 'Win Amount: ' + winAmount;
}

function checkWins() {
    let winAmount = 0;

    for (let j = 0; j < 3; j++) {
        let alignedSlots = [0];
        for (let i = 1; i < 5; i++) {
            if (reels[i][j].texture.key === reels[alignedSlots[alignedSlots.length - 1]][j].texture.key) {
                alignedSlots.push(i);
            } else {
                if (alignedSlots.length >= 3) {
                    alignedSlots.forEach(index => {
                        let symbolKey = reels[index][j].texture.key;
                        reels[index][j].setTexture(`${symbolKey}_connect`);
                        reels[index][j].setInteractive().setData('blinking', true);
                        winAmount += symbolValues[symbolKey] || 0;
                    });
                }
                alignedSlots = [i];
            }
        }
        // Check one last time at the end of the row
        if (alignedSlots.length >= 3) {
            alignedSlots.forEach(index => {
                let symbolKey = reels[index][j].texture.key;
                reels[index][j].setTexture(`${symbolKey}_connect`);
                reels[index][j].setInteractive().setData('blinking', true);
                winAmount += symbolValues[symbolKey] || 0;
            });
        }
    }

    return winAmount;
}

function testWin() {
    winText.style.display = 'none';
    let predefinedSymbols = [
        ['10', '10', '10', 'H1', 'H2'],
        ['A', 'A', 'A', 'A', 'H1'],
        ['Q', 'Q', 'Q', 'Q', 'Q']
    ];

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
            let symbol = predefinedSymbols[j][i];
            reels[i][j].setTexture(symbol);
        }
    }

    winAmount = checkWins();
    moneyText.innerText = 'Win Amount: ' + winAmount;
}

window.onload = () => {
    game = new Phaser.Game(config);
};
