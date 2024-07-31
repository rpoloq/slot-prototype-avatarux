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

function testWin() {
    console.log('Test Win button clicked');
}

window.onload = () => {
    game = new Phaser.Game(config);
};
