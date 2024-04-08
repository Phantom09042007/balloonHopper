var bottomGround
var topGround
var balloon, balloonIng
var obstacleTop, obstacleTop1, obstacleTop2
var obstacleBottom, obstacleBottom1, obstacleBottom2
var bg, bgIng
var health = 100
var maxHealth = 100
var score = 0
var obstacleTopGroup
var obstacleBottomGroup


function preload() {
  bgIng = loadImage("assets/bg.png")
  balloonIng = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
  obstacleTop1 = loadImage("assets/obsTop1.png")
  obstacleTop2 = loadImage("assets/obsTop2.png")
  obstacleBottom1 = loadImage("assets/obsBottom1.png")
  obstacleBottom2 = loadImage("assets/obsBottom2.png")
}

function setup() {
  createCanvas(400,400);
  bg = createSprite(165,485,1,1)
  bg.addImage(bgIng)
  bg.scale = 1.3
  bottomGround = createSprite(200,390,800,20)
  bottomGround.visible = false
  topGround = createSprite(200,10,800,20)
  topGround.visible = false
  balloon = createSprite(100,200,20,50)
  balloon.addAnimation("balloon",balloonIng)
  balloon.scale = 0.2
  obstacleTopGroup = new Group();
  obstacleBottomGroup = new Group();
  obstacleBottom = createSprite(400,320,40,50)
  obstacleBottom.visible = false;

  obstacleTop = createSprite(400,50,40,50)
  obstacleTop.visible = false;

}

function draw() {
  background(0,0,0); 
  if(keyDown("space")){
    balloon.velocityY = -2}
  balloon.velocityY = balloon.velocityY+0.2
  spawnObstaclesTop()
  spawnObstaclesBottom()
  
  for(var i=0; i<obstacleBottomGroup.length; i++){
    if(balloon.isTouching(obstacleBottomGroup.get(i))){
      health -= 10;
      console.log(health);
    }
  }

  for(var i=0; i<obstacleTopGroup.length; i++){
    if(balloon.isTouching(obstacleTopGroup.get(i))){
      health -= 10; //health = health - 10
      console.log(health);
    }
  }

  

  drawSprites();
  textSize(20)
  fill("black")
  text("Score "+score,200,50)
  
  
  healthLevel()
}

function spawnObstaclesBottom(){
  if(World.frameCount%60==0){
    obstacleBottom = createSprite(400,320,40,50)
    obstacleBottom.scale = 0.1
    obstacleBottom.velocityX = -4
    obstacleBottom.visible = true;
    var num = Math.round(random(1,2))
    switch(num){
      case 1 : obstacleBottom.addImage(obstacleBottom1);
      break;
      case 2 : obstacleBottom.addImage(obstacleBottom2);
      break;
      default : break;
    }
    obstacleBottom.lifetime = 101
    obstacleBottomGroup.add(obstacleBottom)
     
  }

 
}
function spawnObstaclesTop(){
  if(World.frameCount%60==0){
    obstacleTop = createSprite(400,50,40,50)
    obstacleTop.scale = 0.1
    obstacleTop.velocityX = -4
    obstacleTop.visible = true;
    var num = Math.round(random(1,2))
    switch(num){
      case 1 : obstacleTop.addImage(obstacleTop1);
      break;
      case 2 : obstacleTop.addImage(obstacleTop2);
      break;
      default : break;
    }

    obstacleTopGroup.add(obstacleTop)

    obstacleTop.lifetime = 101
    balloon.depth = balloon.depth+1

   


  }
}

function healthLevel(){
  stroke("green")
  strokeWeight(5)
  noFill()
  rect(30,30,maxHealth,20)
  
  noStroke()
  fill("green")
  rect(30,30,health,20)
}

