// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -x; //enemy start pos on x axis
    this.y = y + 60; //enemy start pos on y axis
    this.moveX = 101; //enemy moves one block on x axis
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.moveX * 5) {
        this.x += this.speed * dt;
    }else {
        //Loop enemy objects
        //console.log('loop enemy');
        this.x= -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        //Player movement one block
        this.moveX = 101;
        this.moveY = 83;
        //Player start
        this.startX = this.moveX*2;
        this.startY = (this.moveY*4) + 60;
        this.x = this.startX;
        this.y = this.startY;
        this.sprite = 'images/char-boy.png';
        this.winner = false;
        this.loser = false;
    }
    //function to render player on screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

//Reset Player back to starting position
reset() {
    this.x = this.startX;
    this.y = this.startY;
}

    //Move Player with arrow keys
    handleInput(arrow) {
        if (arrow === 'left' && player.x > 0) {
            this.x -= this.moveX;
            //console.log('left');
        } else if (arrow === 'right' && player.x < 404) {
            this.x += this.moveX;
            //console.log('right');
        } else if (arrow === 'down' && player.y < 415) {
            this.y += this.moveY;
            //console.log('down');
        } else if ((arrow === 'up' && player.y > 0)) {
            this.y -= this.moveY;
            //console.log('up');
        }
    }
    update() {
        //Collision check
        for(let enemy of allEnemies) {
            //console.log(this.y,this.x);
            if (enemy.y === this.y && (enemy.x + enemy.moveX > this.x
                && enemy.x < this.x + this.moveX) ) {
                console.log('ouch');
                if (collDetected < 2) {
                    collDetected ++;
                } else {
                    this.loser = true;
                }
                this.reset();
            }
        }
        //looking for winner
        if (this.y === 60) {
            console.log('crossed');
            if (crossingsMade < 3) {
                crossingsMade ++;
                console.log('good');
                this.reset();
        } else {
            //console.log('Game OVER');
            this.winner = true;
            console.log(this.winner);
            }
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const enemy1 = new Enemy(-101, 83, 50);
const enemy2 = new Enemy(-101, 83, 400);
const enemy3 = new Enemy(-101, 166, 300);
const enemy4 = new Enemy((-101*3), 249, 200);
const enemy5 = new Enemy((-202*5), 166, 300);

let crossingsMade = 0;
let collDetected = 0;
const allEnemies = [];
allEnemies.push(enemy1,enemy2,enemy3,enemy4,enemy5);


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
