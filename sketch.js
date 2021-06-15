//..

var backImage,backgr;
var ground;
var stopMonkeyImg;
var gameOverImg;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var monkey, monkey_running;
var score;
var survivalTime = 0;
var score = 0;
var gameState = 1;/*Play*/
var resetButton, resetImg;

function preload() {
  monkey_running = loadAnimation("images/Monkey_01.png","images/Monkey_02.png",
  "images/Monkey_03.png","images/Monkey_04.png","images/Monkey_05.png",
  "images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png",
  "images/Monkey_09.png","images/Monkey_10.png");

  bananaImage = loadImage("images/banana.png");
  obstacleImage = loadImage("images/obstacle.png");
  backImage = loadImage("images/jungle1.jpg");
  gameOverImg = loadImage("images/gameOver.png");
  stopMonkeyImg = loadAnimation("images/Monkey_01.png");
  resetImg = loadImage("images/clipart1564798.png");

  foodGroup = new Group();
  obstacleGroup = new Group();

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  backgr = createSprite(windowWidth/2,windowHeight/2,windowWidth*12,windowHeight);
  backgr.addImage("background", backImage);

  ground = createSprite(windowWidth/2, (windowHeight/300)*250, windowWidth*2, (windowHeight/300)*10);
  ground.visible = false;

  monkey = createSprite((windowWidth/500)*65, (windowHeight/300)*138, (windowWidth/500)*25, (windowHeight/300)*25);
  monkey.addAnimation("running_monkey", monkey_running);
  monkey.addAnimation("stop_monkey",stopMonkeyImg);
  monkey.scale = (windowWidth/500)*0.1;
  monkey.setCollider("rectangle",0+0.25*monkey.width,0,0.5*monkey.width,monkey.height);

  resetButton = createSprite(windowWidth/2, (windowHeight/300)*186, (windowHeight/300)*50, (windowHeight/300)*25);
  resetButton.addImage("reset", resetImg);
  resetButton.scale = 0.1;
}


function draw() {
  background("lightyellow");

  if (gameState === 1) {
    backgr.velocityX = -(windowWidth/500)*3;
    if(backgr.x < -1250){
      backgr.x=windowWidth/2;
    }
    resetButton.visible = false;
    spawnBananas();
    spawnObstacles();
    ground.velocityX = -12;
    survivalTime += Math.round(getFrameRate()/60);
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && monkey.y > (windowHeight/300)*183) {
      monkey.velocityY = -(windowHeight/300)*18;
    }
    if (obstacleGroup.isTouching(monkey)) {
      gameState = 0;
    }
    if (foodGroup.isTouching(monkey)&&monkey.scale<(windowWidth/500)*0.15) {
      monkey.scale += 0.002;
    }
    if (frameCount%500===0) {
      monkey.scale = (windowWidth/500)*0.1;
    }
    if (foodGroup.isTouching(monkey)) {
      score += 1;
      foodGroup[0].destroy();
    }
    monkey.velocityY += (windowHeight/300)*0.8;
    monkey.collide(ground);


  }else if (gameState === 0) {
    backgr.velocityX = 0;
    resetButton.visible = true;
    monkey.velocityX = 0;
    monkey.changeAnimation("stop_monkey",stopMonkeyImg)
    monkey.velocityY = 0;
    ground.velocityX = 0;
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);


  }else{
    console.error(" Please Refresh ........");
    console.log("Error");
  }

  if(mousePressedOver(resetButton)&&gameState===0) {
    reset();
    gameState = 1;
  }

  drawSprites();

  if (gameState === 0) {
    image(gameOverImg, windowWidth/2-(windowWidth/500)*180, (windowHeight/300)*72, (windowWidth/500)*352, (windowHeight/300)*58);
  }

  textSize((windowWidth/500)*9);
  fill("white");
  text("Survival Time: " + survivalTime, (windowWidth/500)*37, (windowHeight/300)*30);
  text("Score: " + score, (windowWidth/500)*37, (windowHeight/300)*45);
}

function spawnBananas() {
  if (frameCount % 100 === 0) {
    banana = createSprite((windowWidth/500)*510, Math.round(random((windowHeight/300)*60, (windowHeight/300)*150)), (windowWidth/500)*20, (windowHeight/300)*20);    
    banana.addImage(bananaImage);
    banana.scale = (windowWidth/500)*0.1;
    banana.setCollider("rectangle", 0, 0, (windowWidth/500)*200, (windowHeight/300)*120);
    banana.velocityX = -(windowWidth/500)*5;
    banana.lifetime = -(windowWidth/1242)*110;
    banana.depth = monkey.depth;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 175 === 0) {
    obstacle = createSprite((windowWidth/500)*550, (windowHeight/300)*205, (windowWidth/500)*20, (windowHeight/300)*20);
    obstacle.addImage(obstacleImage);
    obstacle.setCollider("circle",(windowWidth/500)*20,(windowHeight/300)*20,(windowWidth/500)*95);
    obstacle.scale = (windowWidth/500)*0.18;
    obstacle.velocityX = -(windowWidth/500)*3;
    obstacle.lifetime = (windowWidth/500)*115;
    obstacle.depth = monkey.depth;
    obstacle.depth = banana.depth + 1;
    obstacleGroup.add(obstacle);
  }
}

function reset() {
  score = 0;
  survivalTime = 0;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  gameState = 1;
  resetButton.visible = false;
  monkey.changeAnimation("running_monkey", monkey_running);
  monkey.scale = (windowWidth/500)*0.1;
}


//Pramod Prasad Singh
//WHJR