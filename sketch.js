
var hero;
var option1, option2, option3;
var coin, diamond, diamond2, fireball, waterball;
var robot1, robot2, robot3, spaceship, spaceship2,trophy;
var x1, x2, x3;
gameState = 0;
var hero ,robotsGroup1 ,robotsGroup2, coinGroup;
var waterGroup, laserGroup;
var score, coin1;
function preload()
{
   option1 = loadImage("images/option1.png");
   option2 = loadImage("images/option2.png");
   option3 = loadImage("images/option3.png");

   coin = loadImage("images/coin.png");
   diamond = loadImage("images/diamond.png");
   diamond2 = loadImage("images/diamond2.png");
   fireball = loadImage("images/fireball.png");
   waterball = loadImage("images/waterball.png");

   robot1 = loadImage("images/robot1.png");
   robot2 = loadImage("images/robot2.png");
   robot3 = loadImage("images/robot3.png");

   spaceship = loadImage("images/spaceship.png");
   spaceship2 = loadImage("images/spaceship2.png");

   trophy = loadImage("images/trophy.png");

}
function setup() 
{

  score = 0;

  createCanvas(1000,1000);
  //hero = createSprite(500,10,20,20);
  x1 = createSprite(200,300,20,20);
  x1.addImage(option1);
  x1.visible = false;

  x2 = createSprite(500,300,20,20);
  x2.addImage(option2);
  x2.visible = false;

  x3 = createSprite(800,300,20,20);
  x3.addImage(option3);
  x3.visible = false;

  robotsGroup1 = new Group();
  robotsGroup2 = new Group();
  coinGroup = new Group();
  waterGroup = new Group();
  laserGroup = new Group();

  diamond1 = createSprite(900,900,20,20);
  diamond1.addImage(diamond);
  diamond1.visible = false;
  diamond1.scale = 0.3;
  
  Diamond2 = createSprite(900,900,20,20);
  Diamond2.addImage(diamond2);
  Diamond2.visible = false;
  Diamond2.scale = 1.5;

  spaceShip1 = createSprite(50,300,20,20);
  spaceShip1.addImage(spaceship);
  spaceShip1.visible = false;

  spaceShip2 = createSprite(50,600,20,20);
  spaceShip2.addImage(spaceship);
  spaceShip2.visible = false;

  spaceShip3 = createSprite(950,450,20,20);
  spaceShip3.addImage(spaceship2);
  spaceShip3.visible = false;
}

function draw() 
{
  background(0);   
  drawSprites();
  
  if(gameState === 0)
  {
    chooseCharacter();

    textSize(100);
    textFont("Georgia");
    fill("purple");
    text("game name",210,800);

    textSize(50);
    textFont("Georgia");
    fill("yellow");
    text("choose a character!",260,600);

    console.log(hero);

  }
  distance();

  textSize(30);
  fill("white");
  text("Score: "+score,800,100);
  
  if(gameState ===1)
  {

    hero.scale = 0.3;
    spawnRobots1();
    spawnRobots2();
   
    if(robotsGroup1.isTouching(hero) || robotsGroup2.isTouching(hero)) {
      hero.x = 50;
      hero.y = 50;
    }

    spawnCoins();
    if(coinGroup.isTouching(hero)) {
      score += 1;
      coinGroup.destroyEach();
    }
    diamond1.visible = true;

    if(diamond1.isTouching(hero)) {
      hero.x = 50;
      hero.y = 50;
      gameState = 2;
      diamond1.destroy();
      score += 10;
    }
   // camera.position.x = 500;
   // camera.position.y = hero.y;
  
  }
  
  if(gameState ===2)
  {
    spawnWater();
    spawnCoins();
    Diamond2.visible = true;

    if(waterGroup.isTouching(hero)) {
      hero.x = 50;
      hero.y = 50;
    }
    if(coinGroup.isTouching(hero)) {
      score += 1;
      coinGroup.destroyEach();
    }
    
    if(Diamond2.isTouching(hero))
    {
      hero.x = 50;
      hero.y = 50;
      gameState = 3;
      Diamond2.destroy();
      score += 20;
    }
  }
  
   if(gameState === 3) {

    spaceShip1.visible = true;
    spaceShip2.visible = true;
    spaceShip3.visible = true;
    spawnLasers();
    
   }

  
}

function spawnLasers() {
  if(frameCount%150===0)
  {
    var laser1 = createSprite(0,300,200,20);
    laser1.velocityX = 4;
    laser1.shapeColor ="red";
    laser1.lifetime = 300;
    laserGroup.add(laser1);

    var laser2 = createSprite(0,600,200,20);
    laser2.velocityX = 4;
    laser2.shapeColor= "green";
    laser2.lifetime = 300;
    laserGroup.add(laser2);
    
    var laser3 = createSprite(1000,450,200,20);
    laser3.velocityX = -4;
    laser3.shapeColor="yellow";
    laser3.lifetime = 300;
    laserGroup.add(laser3);
  
    console.log("hey")
    console.log(laser1)
   }
}

function spawnRobots1()
{
  if(frameCount%300===0){
   var obstacle1 = createSprite(100,300,20,20);
   obstacle1.velocityX = 4;
   obstacle1.y = random(300,700);
  
   var rand = Math.round(random(1,2));
   console.log(rand);
   switch(rand)
   {
     case 1 : obstacle1.addImage(robot1);
     break;
     case 2 : obstacle1.addImage(robot3);
     break;
     default : obstacle1.addImage(robot1);
     break;
   }
   obstacle1.scale = 1.5;
   obstacle1.lifetime = 250;
   robotsGroup1.add(obstacle1);
  }
}

function spawnRobots2()
{
  if(frameCount%55===0){
   var obstacle1 = createSprite(1000,300,20,20);
   obstacle1.velocityX = -9;
   obstacle1.y = random(300,700);
 
   obstacle1.addImage(robot2); 
   obstacle1.scale = 1.5;
   obstacle1.lifetime = 250;
   robotsGroup2.add(obstacle1);
  }
}

function spawnCoins() {
  if(frameCount%90===0) {
    coin1 = createSprite(100,100,20,20);
    coin1.debug = true;
    coin1.setCollider("circle",0,0,15);
    coin1.y = random(200,800);
    coin1.x = random(100,900);
    coin1.lifetime = 100;

    coin1.addImage(coin);
    
    coinGroup.add(coin1);
  }
}

function chooseCharacter()
{
  x1.visible = true;
  x2.visible = true;
  x3.visible = true;
  if(mousePressedOver(x1))
  {
    hero = x1;
    console.log("hello");
    x2.destroy();
    x3.destroy();
    gameState= 1;
  }
  else if(mousePressedOver(x2))
  {
    hero = x2;
    console.log("hello");
    x1.destroy();
    x3.destroy();
    gameState= 1;
  }
  else if(mousePressedOver(x3))
  {
    hero = x3;
    console.log("hello");
    x1.destroy();
    x2.destroy();
    gameState= 1;
  }

}
function distance(){
  if(keyDown("W")) {
    hero.y -=5;
  }

  if(keyDown("S")) {
    hero.y +=5;
  }

  if(keyDown("A")) {
    hero.x -=5
  }

  if(keyDown("D")) {
    hero.x +=5
  }
}
function spawnWater()
{
  if(frameCount%70===0){
   var obstacle1 = createSprite(100,0,20,20);
   obstacle1.velocityY = 8;
   obstacle1.x = random(100,900);
  
   var rand = Math.round(random(1,2));
   console.log(rand);
   switch(rand)
   {
     case 1 : obstacle1.addImage(fireball);
     break;
     case 2 : obstacle1.addImage(waterball);
     break;
     default : obstacle1.addImage(fireball);
     break;
   }
   obstacle1.scale = 1.5;
   obstacle1.lifetime = 250;
   waterGroup.add(obstacle1);

  }
}