// game functions
// JavaScript Object Methods to create a Character object
// This way any bugs can be control by a modular means or componete 
var Score_Board = 0;

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
    sprite = 'images/enemy-bug.png';
    Character.call(this, x, y, sprite);
    this.speed = Speed(); // units = [px/dt]
};

// create object for each item in the game

var Player = function(x, y, sprite) {
    sprite = 'images/char-boy.png';
    x = 200;
    y = 380;
    Character.call(this, x, y, sprite);
};


var Star = function(x, y, sprite) {
    sprite = 'images/Star.png';
    x = 200;
    y = 75;
    Character.call(this, x, y, sprite);
};

var BlueGem = function(x, y, sprite) {
    sprite = 'images/Gem Blue.png';
    x = 100;
    y = 220;
    Character.call(this, x, y, sprite);
};
// add start position 

var Game_Start = function(x, y, sprite) {
    sprite = 'images/Selector.png';
    x = 200;
    y = 380;
    Character.call(this, x, y, sprite);
};


// Game Object Methods  speed, collusion and number generator
// source for random number https://gist.github.com/kerimdzhanov/7529623

var random_Num = function(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};

var Speed = function() {
    return random_Num(100, 300);
};

var random_Selector = function(array) {
    return array[Math.floor(Math.random() * array.length)];
};

// source for collision 
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// with box area limit on the enmey will check for collision refering the object.box_area

var collision_Checker = function(object, player) {
    return (player.x > object.x - object.box_Area.x / 2 &&
        player.x < object.x + object.box_Area.x / 2 &&
        player.y > object.y - object.box_Area.y / 2 &&
        player.y < object.y + object.box_Area.y / 2);
};


// use character class for each object
Enemy.prototype = Object.create(Character.prototype);

// box area for Enemy

Enemy.prototype.box_Area = {
    'x': 130,
    'y': 80
};

// Y location of the Enemy and update
Enemy.prototype.location_y = [50, 150, 220, 300];

Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // enemy will reppear

    if (this.x <= (canvas.width + this.box_Area.x / 2)) {

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

Player.prototype.update = function() {
    // process action and move player
    var pos_x = 100;
    var pos_y = 101;
    switch (this.action) {
        case 'up':
            if (this.y > canvas.boundaries.up) {
                this.y -= pos_y;
            }
            break;
        case 'right':
            if (this.x < canvas.boundaries.right) {
                this.x += pos_x;
            }
            break;
        case 'down':
            if (this.y < canvas.boundaries.down) {
                this.y += pos_y;
            }
            break;
        case 'left':
            if (this.x > canvas.boundaries.left) {
                this.x -= pos_x;
            }
            break;
    }

    // track position

    if (this.position !== this.x + ',' + this.y) {

        this.position = this.x + ',' + this.y;

    }

    // null that action for reset
    this.action = null;

    if (this.y < 25) {
        this.reset();
    }

};

Player.prototype.handleInput = function(e) {
    this.action = e;
};


// location to place player
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

Star.prototype = Object.create(Character.prototype);

Star.prototype.box_Area = {
    x: 90,
    y: 90
};

Star.prototype.location_x = 200;

Star.prototype.constructor = Star;

Star.prototype.update = function(dt) {

    if (collision_Checker(this, player)) {
        player.reset();
        this.x = this.location_x;
        Score_Board += 5;
        $("#score").text(Score_Board);

    }
};

BlueGem.prototype = Object.create(Character.prototype);

BlueGem.prototype.box_Area = {
    x: 100,
    y: 100
};

BlueGem.prototype.location_x = [-2, 100, 300];

BlueGem.prototype.location_y = [100, 150, 250, 300];

BlueGem.prototype.Gems = [

'images/Gem Blue.png',
'images/Gem Green.png',
'images/Gem Orange.png'

];

BlueGem.prototype.constructor = BlueGem;

BlueGem.prototype.update = function(dt) {

    if (collision_Checker(this, player)) {
        player.reset();
        this.x = random_Selector(this.location_x);
        this.y = random_Selector(this.location_y);
        this.sprite = random_Selector(this.Gems);
        Score_Board += 1;
        
        $("#score").text(Score_Board);

    }
};

Game_Start.prototype = Object.create(Character.prototype);

//Game_Start.prototype.constructor = Game_Start;

//Game_Start.prototype.update = function(dt) {};
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
    new Enemy(-100, 135),
    new Enemy(-100, 220),
    new Enemy(-100, 310)
];

var player = new Player();
var star = new Star();
var bluegem = new BlueGem()
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