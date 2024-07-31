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
}

function update() {}

function spinReels() {
    console.log('Spin button clicked');
}

function testWin() {
    console.log('Test Win button clicked');
}

window.onload = () => {
    game = new Phaser.Game(config);
};
