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
let spinButton;
let testWinButton;
let moneyText;
let symbols = ['symbol1', 'symbol2'];

function preload() {
    this.load.image('symbol1', 'assets/symbol1.png');
    this.load.image('symbol2', 'assets/symbol2.png');
}


function create() {
    this.add.sprite(100, 100, 'symbol1');
    this.add.sprite(200, 100, 'symbol2');

    spinButton = document.getElementById('spin-button');
    spinButton.addEventListener('click', spinReels);

    testWinButton = document.getElementById('test-win-button');
    testWinButton.addEventListener('click', testWin);

    moneyText = document.getElementById('money');
}

function update() {}


function spinReels() {
    let winAmount = 0;
    for (let i = 0; i < 5; i++) {
        let symbol = symbols[Phaser.Math.Between(0, symbols.length - 1)];
        winAmount += symbol === 'symbol1' ? 10 : 5;
    }
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
    console.log('Test Win button clicked');
}

window.onload = () => {
    game = new Phaser.Game(config);
};
