var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var car, carI;
var road, roadI;

var cars, car1, car2, car3, carGroup;
var score=0;

var gameOver, restart;
var gameOverImg, restartImg;
var in1, in2;



function preload(){  

  car1 = loadImage("Car2.png");
  car2 = loadImage("Car3.png");
  car3 = loadImage("Car4.png");
  carI = loadImage("Car1.png");
  
  roadI = loadImage("road.png");
  
  gameOverImg = loadImage("GameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1000, 700);
  
  road = createSprite(1900,height/2);
  road.addImage(roadI);
  road.scale=2

  car = createSprite(200,345);
  car.addImage(carI);
  car.scale=0.1
  car.velocityX= 5;
  
  
  gameOver = createSprite(0,height/2- 200);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(0,height/2);
  restart.addImage(restartImg);
  
  gameOver.visible = false;
  restart.visible = false;
  
 
  carGroup = new Group();
  score = 0;

  in1 = createSprite(0,460,600,10);
  in2 = createSprite(0,240,600,10);
  in1.visible=false;
  in2.visible=false;
}

function draw() {

  background("White");
  drawSprites();
  
  in1.x = car.x;
  in2.x = car.x;
 
  gameOver.x = car.x+150;
  restart.x = car.x+150;

    
  if(gameState===1){
  score = score + Math.round(getFrameRate()/60);
  camera.position.x = car.x+200;
  if(car.x>3090){
    camera.position.x = 3300
    carGroup.setVelocityXEach(-5);
  }

  if(keyDown("up")){
   car.y-=5;
  }
  if(keyDown("down")){
    car.y+=5;
  }
  if(car.x>3700){
    gameState=2;
   }
   else if(carGroup.isTouching(car)){
      gameState=END;
   }
 }

console.log(car.x);
 
  if (gameState === WIN) {
      textSize(50);
      textFont("Georgia")
      fill("red")
    text("👍You Win",car.x-600,550)

    gameOver.x = car.x-500;
    restart.x = car.x-500;

    carGroup.setLifetimeEach(-1);
    carGroup.setVelocityXEach(0);
    
    car.velocityX = 0;

    gameOver.visible = true;
    restart.visible = true;

  } 
  if (gameState === END) {
    textSize(50);
    textFont("Georgia")
    fill("Pink")
    text("You Lose👎",car.x+50,550)

    carGroup.setLifetimeEach(-1);
    carGroup.setVelocityXEach(0);

    car.velocityX = 0;

    gameOver.visible = true;
    restart.visible = true;
  
  } 

  if(mousePressedOver(restart)&&gameState===0){
     gameState=1;
     gameOver.visible=false;
     restart.visible=false;
     carGroup.setLifetimeEach(1);
     carGroup.x=car.x+800;

     car.velocityX=5;

     car.x = 200;

     score = 0;
  }

  if(mousePressedOver(restart)&&gameState===2){
    gameState=1;
    gameOver.visible=false;
    restart.visible=false;
    carGroup.setLifetimeEach(1);
    carGroup.x=car.x+800;

    car.velocityX=5;

    car.x = 200;

    score = 0;
 }

  car.collide(in1);
  car.collide(in2);
  
  spawnCar();

  textSize(30);
  textFont("Georgia")
  fill("black")
  text("Distance🚗: "+score,car.x-200,40)
  // text(mouseX+","+mouseY,car.x,40);
} 
function spawnCar(){
  if(frameCount%60===0){
    var cars = createSprite(car.x+800,(Math.round(random(260,430))))
    cars.lifetime=300;
    cars.velocityX=-5
    // cars.debug=true;
    cars.setCollider("rectangle",0,0,300,110);
    cars.scale=0.3;
    var rand = Math.round(random(1,3));
    
    if(rand==1){
      cars.addImage(car1);
    }
    else if(rand==2){
      cars.addImage(car2);
    }
    else if(rand==3){
      cars.addImage(car3);
    }
    carGroup.add(cars);
  }
}