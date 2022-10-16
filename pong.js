var diam;

// radius
var r;

// starting x position of ball
var x;

// starting y position of ball
var y;

// choosing randomly the starting vx and vy values when the game starts
var sign;

// starting velocity according to x
var velocityX;

// starting velocity according to y
var velocityY;

// left paddle height
var lPadHeight;

// right paddle height
var rPadHeight;

var num;

var prevX;

var prevY;

var lives1;

var lives2;

var speedX, speedY;

var start, leftUp, leftDown, rightUp, rightDown, continueGame, pastR, pastL;

function setup() {
    initializeFields();
    createCanvas(800, 600);
    background(55, 50, 65);
    noStroke();
}

function draw() {
    // fading effect
    overlay();
    // Game setup
    fill(255, 107, 61);
    // left paddle
    rect(0, lPadHeight, 20, 100);
    fill(255, 107, 61);
    // right paddle
    rect(width - 20, rPadHeight, 20, 100);
    // Player One Bar
    playerOneBar();
    // Player Two Bar
    playerTwoBar();
    // Starting the Game
    if ((start == true || (continueGame == true)))
        startSetup();
    // ball trail
    // dropping the last array value and replacing with newest x value
    prevX[num - 1] = x;
    prevY[num - 1] = y;
    for (var i = 0; i < (num - 1); i++) {
        // shifting array values to the left
        prevX[i] = prevX[i + 1];
        prevY[i] = prevY[i + 1];
    }
    for (var i = 0; i < num; i++) {
        // changing the diameter according i
        diam = i + 1;
        noStroke();
        // stroke(255,107,61);
        // changing white value according to i
        fill(0 + (i * 13), 107, 61);
        ellipse(prevX[i], prevY[i], diam, diam);
    }
    if (pastRight(x))
        // reset the game after the ball passes the player 2's side
        pastRightReset();
    else if (pastLeft(x))
        pastLeftReset();
    if (keyIsPressed) {
        if (leftUp == true && lPadHeight > 30) {
            lPadHeight = lPadHeight - 15;
        }
        if (leftDown == true && ((lPadHeight + 100) < (height - 35))) {
            lPadHeight = lPadHeight + 15;
        }
        if (rightUp == true && rPadHeight > 30) {
            rPadHeight = rPadHeight - 15;
        }
        if (rightDown == true && (rPadHeight + 100 < (height - 35))) {
            rPadHeight = rPadHeight + 15;
        }
    }
    if (hitLeftPaddle(x) || hitRightPaddle(x))
        velocityX = -velocityX;
    if (hitTop(y) || hitBottom(y))
        velocityY = -velocityY;
    if (lives1 < 0)
        // Player two wins if player one loses all lives
        endGameTwoWins();
    else if (lives2 < 0)
        // Player one wins if player two loses all lives
        endGameOneWins();
}

// actions whenever a certain key is pressed
function keyPressed() {
    if (key == 'n' || key == 'N') {
        resetGame();
        newVelocityValues();
    }
    if (key == 't' || key == 'T') {
        start = true;
        continueGame = false;
        newVelocityValues();
    } else if (key == 'c' || key == 'C') {
        start = false;
        continueGame = true;
        // setting the ball to the other side after losing
        continueVelocityValues();
    }
    if (leftPaddleUp())
        leftUp = true;
    if (leftPaddleDown())
        leftDown = true;
    if (rightPaddleUp())
        rightUp = true;
    if (rightPaddleDown())
        rightDown = true;
}

// when certain keys are released to help keep the game going
function keyReleased() {
    if (key == 't' || key == 'T') {
        start = true;
        continueGame = false;
    } else if (key == 'c' || key == 'C') {
        start = false;
        continueGame = true;
    }
    if (leftPaddleUp())
        leftUp = false;
    if (leftPaddleDown())
        leftDown = false;
    if (rightPaddleUp())
        rightUp = false;
    if (rightPaddleDown())
        rightDown = false;
}

// methods for certain actions made by the ball or certain keys pressed
function startGame() {
    return (key == 't' || key == 'T');
}

function hitLeftPaddle(x) {
    return (x - r) <= 20 && (y + r) >= lPadHeight && (y - r) <= (lPadHeight + 100);
}

function hitRightPaddle(x) {
    return (x + r) >= width - 20 && (y + r) >= rPadHeight && (y - r) <= (rPadHeight + 100);
}

function hitTop(y) {
    return (y - r) < 30;
}

function hitBottom(y) {
    return (y + r) > height - 30;
}

function leftPaddleUp() {
    return ((key == 'w' || key == 'W'));
}

function leftPaddleDown() {
    return ((key == 's' || key == 'S'));
}

function rightPaddleUp() {
    return ((key == 'i' || key == 'I'));
}

function rightPaddleDown() {
    return ((key == 'k' || key == 'K'));
}

function pastRight(x) {
    return (x > width);
}

function pastLeft(x) {
    return (x < 0);
}

// methods for game setup or re-setup
function overlay() {
    fill(55, 50, 65);
    noStroke();
    rect(0, 0, width, height);
}

function playerOneBar() {
    stroke(255, 107, 61);
    line(0, 30, width, 30);
    var playOneLives = "PLAYER ONE LIVES: " + lives1;
    fill(255);
    textSize(13);
    text(playOneLives, 15, 20);
}

function playerTwoBar() {
    stroke(255, 107, 61);
    line(0, height - 30, width, height - 30);
    var playTwoLives = "PLAYER TWO LIVES: " + lives2;
    fill(255);
    textSize(13);
    text(playTwoLives, width - 145, height - 10);
}

function resetGame() {
    background(55, 50, 65);
    x = width / 2;
    y = height / 2;
    rPadHeight = 250;
    lPadHeight = 250;
    start = false;
    continueGame = false;
    lives1 = 2;
    lives2 = 2;
    playerOneBar();
    playerTwoBar();
}

function newVelocityValues() {
    sign = random(0, 2);
    if (int(sign) == 0) {
        velocityX = -4;
        velocityY = random(-10, -3);
    } else if (int(sign) == 1) {
        velocityX = 4;
        velocityY = random(3, 10);
    }
}

function continueVelocityValues() {
    if (pastR == true) {
        velocityX = -4;
        velocityY = random(-10, -3);
    } else if (pastL == true) {
        velocityX = 4;
        velocityY = random(3, 10);
    }
}

function pastRightReset() {
    lPadHeight = 250;
    rPadHeight = 250;
    x = width - 30;
    y = rPadHeight - 30;
    start = false;
    continueGame = false;
    pastR = true;
    pastL = false;
    lives2 = lives2 - 1;
}

function pastLeftReset() {
    lPadHeight = 250;
    rPadHeight = 250;
    x = 30;
    y = (lPadHeight + 100) + 30;
    lives1 = lives1 - 1;
    start = false;
    continueGame = false;
    pastL = true;
    pastR = false;
}

function startSetup() {
    x = x + velocityX;
    y = y + velocityY;
    speedX = "Speed of x: " + velocityX;
    speedY = "Speed of y: " + velocityY;
    fill(255);
    text(speedX, width / 2 - 150, 20);
    text(speedY, width / 2, 20);
}

function endGameTwoWins() {
    background(255, 255, 255);
    textSize(60);
    fill(255);
    text("Game Over!!!!", width / 4, height / 4);
    text("PLAYER 2 WINS!!!", width / 4 - 50, height / 4 + 200);
}

function endGameOneWins() {
    background(0);
    textSize(60);
    fill(255);
    text("Game Over!!!!", width / 4, height / 4);
    text("PLAYER 1 WINS!!!", width / 4 - 50, height / 4 + 200);
}

function initializeFields() {
    diam = 0;
    r = 10;
    x = 400;
    y = 300;
    sign = 0;
    velocityX = 4;
    velocityY = random(3, 10);
    lPadHeight = 250;
    rPadHeight = 250;
    num = 20;
    prevX = new Array(num);
    prevY = new Array(num);
    lives1 = 2;
    lives2 = 2;
    speedX = null;
    speedY = null;
    start = false;
    leftUp = false;
    leftDown = false;
    rightUp = false;
    rightDown = false;
    continueGame = false;
    pastR = false;
    pastL = false;
}
