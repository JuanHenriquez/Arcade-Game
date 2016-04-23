// Game Class - Handle Events, init, reset and update entities.
var Game = function(){

    this.isPause     = false;
    this.audio       = new Audio('./music/arcade-music.wav');
    this.withLife    = false;
    this.withTime    = false;
    this.difficulty  = 1;
    this.character   = 'char-boy';
    this.player      = new Player();
    this.allEnemies  = [];
    this.score       = new Score();

};

Game.prototype.togglePause = function(key){

    if(key == 'space'){
        this.isPause = !this.isPause;
    }

};

Game.prototype.toggleMusic = function(){

    if(this.audio.paused){
        this.audio.loop = true;
        this.audio.play();
        this.audio.volume = 0.4;
    }else {
        this.audio.pause();
    }

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

// Cambia la imagen del jugador.
Game.prototype.changeCharacter = function( character ){
    this.player.sprite = 'images/' + character + '.png';
}


// Carga los enemigos y los coloca dentro del array allEnemies.
Game.prototype.loadEnemies = function(){

    // Por buenas practicas, se creo la variable afuera del loop para que no se
    // cree una y otra vez.
    var enemy, distance = 0;

    // Recorremos cada fila del mapa donde apareceran las garrapatas.
    for(var i = 0; i < 5; i++){

        // Por medio de un numero aleatorio se vera cuantos enemigos habra por fila
        // para despues colocarlos en el array allEnemies.
        for(var j = 0, x = Math.floor((Math.random() * 6)) + 1; j < x; j++){

            var speed    = this.difficulty * Math.floor(( Math.random() * (300 - 100) + 100));

            enemy = new Enemy(speed, i, distance - 500);
            this.allEnemies.push(enemy);

            distance = enemy.x || 0;
        }

        distance = 0;
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


/**
* @constructor Enemies our player must avoid
* @param {number} speed - The speed of the enemy.
* @param {number} row - The row where is located.
*/
var Enemy = function(speed, row, x) {

    this.speed = speed;
    this.x = x || 0;
    this.y =  60  + row * 83;
    this.sprite = 'images/enemy-bug.png';

};


/**
* @description Update the enemy's position.
* @param {number} dt - A time delta between ticks.
*/
Enemy.prototype.update = function(dt) {
    this.move(dt);
};


/**
* @description Move the enemy's.
* @param {number} dt - A time delta between ticks.
*/
Enemy.prototype.move = function(dt) {

    // Move the enemy.
    if (this.x < 1200 && !game.isPause) {
        this.x += dt * this.speed;
    }

    // If the enemy came at the end of the row,
    // move to the other side with random position.
    if (this.x > 1200) {
        this.x = -200 - Math.floor((Math.random() * 250));
    }
}

/**
* @description Draw the enemy on the screen.
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
* @constructor Player of the game.
*/
var Player = function() {

    this.locationX = 505;
    this.locationY = 475;
    this.sprite    = 'images/char-boy.png';
    this.lifes     = 1;

};

/**
* @description Draw the player on the screen.
*/
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.locationX, this.locationY);
};

/**
* @description Handle key event when a key is pressed and move the player.
* @param {string} dt - The name of the key pressed.
*/
Player.prototype.handleInput = function (key) {
    if(!game.isPause) {
        switch (key) {
            case 'up':
                if (this.locationY > 60) {
                    this.locationY -= 83;
                }else if(this.locationY <= 60){
                    this.reset();
                    game.score.sum(20);
                }
                break;
            case 'down':
                if (this.locationY < 460) {
                    this.locationY += 83;
                }
                break;
            case 'left':
                if (this.locationX > 0) {
                    this.locationX -= 101;
                }
                break;
            case 'right':
                if (this.locationX < 909) {
                    this.locationX  += 101;
                }
                break;
            default:
                this.locationY = this.locationY;
                this.locationX = this.locationX;
        }
    }
};

/**
* @description Reset the player position to initial state.
*/
Player.prototype.reset = function () {
    this.locationX = 505;
    this.locationY = 475;
};

var Item = function(name, x, y){

    this.x      = x;
    this.y      = y;
    this.sprite = 'images/' + name + '.png';

};

Item.prototype.collect = function(){

};

Item.prototype.drop = function(){

};

Item.prototype.render = function(){

};

var Score = function(){
    this.points = 0;
};


/**
* @description sum function is use to accumulate points.
* @param {number} points to add.
*/
Score.prototype.sum = function( points ){
    this.points += points;
};

/**
* @description sub function is use to subtract points.
* @param {number} points to subtract.
*/
Score.prototype.sub = function( points ){
    if(this.points > 0){
        this.points -= points;
    }
};

game = new Game();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        65: 'left',
        38: 'up',
        87: 'up',
        39: 'right',
        68: 'right',
        40: 'down',
        83: 'down',
        32: 'space',
        17: 'ctrl'
    };

    game.player.handleInput(allowedKeys[e.keyCode]);
    game.togglePause(allowedKeys[e.keyCode]);
});
