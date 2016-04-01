// Game Class - Handle Events, init, reset and update entities.
var Game = function(){

    this.isPause     = false;
    this.playMusic   = false;
    this.withLife    = false;
    this.withTime    = false;
    this.difficulty  = 1;
    this.character   = 'char-boy';
    this.player      = new Player();
    this.allEnemies  = [];

};

Game.prototype.togglePause = function(){
    this.isPause = !this.isPause;
};

Game.prototype.toggleMusic = function(){
    this.playMusic = !this.playMusic;
};

Game.prototype.toggleLifeOption = function(){
    this.withLife = !this.withLife;
};

Game.prototype.toggleTimeOption = function(){
    this.withTime = !this.withTime;
};

Game.prototype.toggleDifficulty = function( level ){
    this.difficulty = level;
};

Game.prototype.changeCharacter = function( character ){
    this.player.sprite = 'images/' + character + '.png';
}

Game.prototype.loadEnemies = function(){

    var enemy;

    for(var i = 0, x = this.difficulty * 3; i < x; i++){

        enemy = new Enemy( this.difficulty * 150, Math.floor((Math.random() * 4)) + 1);

        this.allEnemies.push(enemy);
    }

}

Game.prototype.init = function(){
    this.loadEnemies();
};

Game.prototype.update = function(){

};

Game.prototype.reset = function(){
    this.allEnemies = [];
    this.init();
};


// Enemies our player must avoid
var Enemy = function(speed, row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    this.x = 0;
    this.y =  -23  + row * 83;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.move(dt);
};

Enemy.prototype.move = function(dt) {
    console.log(this.x);
    if (this.x <= 504) {
        this.x += 1;
    }

    if (this.x > 504) {
        this.x = -200 - Math.floor((Math.random() * 250));
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    this.locationX = 202;
    this.locationY = 392;
    this.sprite    = 'images/char-boy.png';
};

Player.prototype.update = function () {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.locationX, this.locationY);
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'up':
            if (this.locationY >= 143) {
                this.locationY -= 83;
            }
            break;
        case 'down':
            if (this.locationY <= 309) {
                this.locationY += 83;
            }
            break;
        case 'left':
            if (this.locationX >= 101) {
                this.locationX -= 101;
            }
            break;
        case 'right':
            if (this.locationX <= 303) {
                this.locationX  += 101;
            }
            break;
        default:
            this.locationY = this.locationY;
            this.locationX = this.locationX;
    }
};

Player.prototype.reset = function (posY) {
    if (posY == 60) {
        this.locationY = 392;
    }
};


var game = new Game();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    game.player.handleInput(allowedKeys[e.keyCode]);
});
