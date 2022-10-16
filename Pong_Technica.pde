int diam = 0; 
int r = 10;  // radius

float x = 400; // starting x position of ball
float y = 300; // starting y position of ball

float sign; // choosing randomly the starting vx and vy values when the game starts

float velocityX = 4; // starting velocity according to x
float velocityY = random(3, 10); // starting velocity according to y

float lPadHeight = 250; // left paddle height
float rPadHeight = 250; // right paddle height

int num = 20;
float [] prevX = new float [num];
float [] prevY = new float [num];


int lives1 = 2;
int lives2 = 2;

String speedX, speedY;

boolean start, leftUp, leftDown, rightUp, rightDown, continueGame, pastR, pastL;

void setup() {
  size(800, 600);
  background(0);
  noStroke();
}

void draw() {

  // fading effect

  overlay();

  // Game setup

  fill(255);
  rect(0, lPadHeight, 20, 100); // left paddle

  fill(255);
  rect(width-20, rPadHeight, 20, 100); // right paddle

  // Player One Bar

  playerOneBar();

  // Player Two Bar 
  playerTwoBar();

  // Starting the Game
  if ((start == true  || (continueGame == true)))
    startSetup();

  // ball trail 

  prevX[num-1] = x; // dropping the last array value and replacing with newest x value
  prevY[num-1] = y;

  for (int i = 0; i < (num-1); i++) {
    prevX[i] = prevX[i+1]; // shifting array values to the left
    prevY[i] = prevY[i+1];
  }
  for (int i = 0; i <num; i++) {
    diam = i+1; // changing the diameter according i
    noStroke();
    fill(0+(i*13)); // changing white value according to i
    ellipse(prevX[i], prevY[i], diam, diam);
  }

  // if the ball goes past the boundary

  if (pastRight(x)) 
    pastRightReset(); // reset the game after the ball passes the player 2's side

  else if (pastLeft(x)) 
    pastLeftReset();

  // when pressing the keys during the game  

  if (keyPressed) {

    if (leftUp == true && lPadHeight > 30) {
      lPadHeight = lPadHeight - 15;
    }
    if (leftDown == true && ((lPadHeight+100) < (height-35))) {
      lPadHeight = lPadHeight + 15;
    }
    if (rightUp == true && rPadHeight > 30) {
      rPadHeight = rPadHeight - 15;
    }
    if (rightDown == true && (rPadHeight+100 < (height-35))) {
      rPadHeight = rPadHeight + 15;
    }
  }

  // changing direction and speed when ball bounces off left and right paddles 

  if ( hitLeftPaddle(x) || hitRightPaddle(x) ) 
    velocityX = -velocityX;

  // changing direction and speed when ball bounces off top and bottom wall

  if ( hitTop(y) || hitBottom(y) ) 
    velocityY = -velocityY;


  if (lives1 < 0) 
    endGameTwoWins();  // Player two wins if player one loses all lives
  else if (lives2 < 0) 
    endGameOneWins(); // Player one wins if player two loses all lives
}

// actions whenever a certain key is pressed

void keyPressed() {
  if (key == 'n' || key == 'N') {
    resetGame();
    newVelocityValues();
  }
  if (key == 't' || key == 'T') {
    start  = true;
    continueGame = false;
    newVelocityValues();
  } else if (key == 'c' || key == 'C') {
    start = false;
    continueGame = true;
    continueVelocityValues(); // setting the ball to the other side after losing
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

void keyReleased() {
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

boolean startGame() {
  return (key == 't' || key == 'T');
}

boolean hitLeftPaddle(float x) {
  return (x-r) <= 20 && (y+r) >= lPadHeight && (y-r) <= (lPadHeight + 100);
}

boolean hitRightPaddle(float x) { 
  return (x+r) >= width-20 && (y+r) >= rPadHeight && (y-r) <= (rPadHeight + 100);
}

boolean hitTop(float y) {
  return (y-r) < 30;
}

boolean hitBottom(float y) {
  return (y+r) > height-30;
}

boolean leftPaddleUp () {
  return ((key == 'w' || key == 'W') );
}

boolean leftPaddleDown () {
  return ((key == 's' || key == 'S'));
}

boolean rightPaddleUp () {
  return ((key == 'i' || key == 'I'));
}

boolean rightPaddleDown () {
  return ((key == 'k' || key == 'K') );
}

boolean pastRight (float x) {
  return (x > width);
}

boolean pastLeft (float x) {
  return (x < 0);
}

// methods for game setup or re-setup

void overlay () {
  fill (0);
  noStroke();
  rect(0, 0, width, height);
}

void playerOneBar() {
  stroke(255);
  line(0, 30, width, 30);

  String playOneLives = "PLAYER ONE LIVES: " + lives1;
  fill(255);
  textSize(13);
  text(playOneLives, 15, 20);
}

void playerTwoBar() {
  stroke(255);
  line(0, height-30, width, height-30);

  String playTwoLives = "PLAYER TWO LIVES: " + lives2;
  fill(255);
  textSize(13);
  text(playTwoLives, width-145, height-10);
}

void resetGame() {
  background(0);
  x = width/2;
  y = height/2;
  rPadHeight = 250;
  lPadHeight = 250;
  start = false;
  continueGame = false;
  lives1 = 2;
  lives2 = 2;
  playerOneBar();
  playerTwoBar();
}

void newVelocityValues() {
  sign = random(0, 2);
  if ((int)sign == 0) {
    velocityX = -4;
    velocityY = random(-10, -3);
  } else if ((int)sign == 1) {
    velocityX = 4;
    velocityY = random(3, 10);
  }
}

void continueVelocityValues() {
  if (pastR == true) {
    velocityX = -4;
    velocityY = random(-10, -3);
  } else if (pastL == true) {
    velocityX = 4;
    velocityY = random(3, 10);
  }
}

void pastRightReset() {
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

void pastLeftReset() {
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

void startSetup() {
  x = x + velocityX;
  y = y + velocityY;  
  speedX = "Speed of x: " + velocityX;
  speedY = "Speed of y: " + velocityY;
  fill(255);
  text(speedX, width/2-150, 20);
  text(speedY, width/2, 20);
}

void endGameTwoWins() { 
  background(255, 255, 255);
  textSize(60);
  fill(255);
  text("Game Over!!!!", width/4, height/4);
  text("PLAYER 2 WINS!!!", width/4-50, height/4+200);
}

void endGameOneWins() {
  background(0);
  textSize(60);
  fill(255);
  text("Game Over!!!!", width/4, height/4);
  text("PLAYER 1 WINS!!!", width/4-50, height/4+200);
}
