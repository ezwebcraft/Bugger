// game functions
// JavaScript Object Methods to create a Character object
// This way any bugs can be control by a modular means or componete 

var Character = function(x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.pn'
    Character.call(this, x, y, sprite);
    this.speed = Speed();
    // each bug will have dif speed
};

// create object for each item in the game

var Player = function(x, y, sprite) {
    sprite = 'images/char-boy.png';
    x = 50;
    y = 100;
    Character.call(this, x, y, sprite);
};


var Game_Start = function(x, y, sprite) {
    sprite = 'images/Selector.png';
    x = 50;
    y = 100;
    Character.call(this, x, y, sprite);
};


// Game Object Methods  speed, collusion and number generator
// source for random number https://gist.github.com/kerimdzhanov/7529623

var Random_Num = function(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};

var Speed = function() {
    return Random_Num(1, 10);
};

var random_Selector = function(array) {
    return array[Math.floor(Math.random() * array.length)];
};

// source for collision 
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// with box area limit on the enmey will check for collision refering the object.box_area

var Collision_Checker = function(object, player) {
    var col_area = (player.x > object.x - object.box_Area.x / 2 &&
        player.x < object.x + object.box_Area.x / 2 &&
        player.y > object.y - object.box_Area.y / 2 &&
        player.y < object.y + object.box_Area.y / 2);

    return col_area;
};


// use character class for each object
Enemy.prototype = Object.create(Character.prototype);

// box area for Enemy

Enemy.prototype.box_Area = {
    'x': 50,
    'y': 60
};

// Y location of the Enemy and update

Enemy.prototype.location_y = [50, 150, 200];

Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // enemy will reppear

    if (this.x <= canvas.width) {
        // by dt 
        this.x += this.speed * dt;
    } else {
        this.x = -this.box_Area.x;
        this.y = random_Selector(this.location_y);
        this.speed = Speed();

    }

    // if the player tounches the enemy
    if (collision_Checker(this, player)) {
        player.reset();
    }

};

// prototype sections

Player.prototype = Object.create(Character.prototype);

Player.prototype.constructor = Player;



Player.prototype.handleInput = function(e) {
    this.action = e;
};


// location to place player
Player.prototype.reset = function() {
    this.x = 100;
    this.y = 200;
};

Star.prototype = Object.create(Character.prototype);

Star.prototype.constructor = Star;

Game_Start.prototype = Object.create(Character.prototype);

Game_Start.prototype.constructor = Game_Start;

// Draw the enemy on the screen, required method for game
//Enemy.prototype.render = function() {
//    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
    new Enemy(-100, 50),
    new Enemy(-100, 150),
    new Enemy(-100, 200)
];

var player = new Player();
var star = new Star();
var game_start = new Game_Start();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});