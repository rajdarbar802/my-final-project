var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obsTop1,obsTop2
var obsBottom1,obsBottom2,obsBottom3
var gameOver
var restart
var obstacalegroup
var buildingsGroup
var play=1
var end=0
var gameState=play
var score


function preload(){
bgImg = loadImage("assets/bg.png")
gameOver=loadImage("assets/gameOver.png")
obsBottom1=loadImage("assets/obsBottom1.png")
obsBottom2=loadImage("assets/obsBottom2.png")
obsBottom3=loadImage("assets/obsBottom3.png")
obsTop1=loadImage("assets/obsTop1.png")
obsTop2=loadImage("assets/obsTop2.png")
gameOverImg=loadImage("assets/gameOver.png")
restartImg=loadImage("assets/restart.png")



balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
}

function setup(){
 createCanvas(630,630)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3
bg.velocityX=-2

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

obstacalegroup= new Group()
buildingsGroup= new Group()

gameOver= createSprite(315,250,10,10)
gameOver.addImage(gameOverImg)
gameOver.visible=false

restart=createSprite(315,300,10,10)
restart.addImage(restartImg)
restart.visible=false

score=0
edges=createEdgeSprites()
}

function draw() {
  
  background("black");
  if (gameState==play) {
  //making the hot air balloon jump
  if(keyDown("space")) {
  balloon.velocityY = -6 ;
    }
    
  if (balloon.isTouching(edges[3])) {
   gameState=end 
  }
  score= score + Math.round(getFrameRate()/60)
  

  if(bg.x<0){
    bg.x=bg.width/2
  }
 //adding gravity
  balloon.velocityY = balloon.velocityY + 2;
  spwanBuildings()
  spwanObsticales()
  if (obstacalegroup.isTouching(balloon)||buildingsGroup.isTouching(balloon)) {
  gameState=end
  }
  } else if(gameState==end){
  balloon.velocityY=0
  gameOver.visible=true
  restart.visible=true
  bg.velocityX=0
  obstacalegroup.setVelocityXEach(0)
  buildingsGroup.setVelocityXEach(0)
  obstacalegroup.setLifetimeEach(-1)
  buildingsGroup.setLifetimeEach(-1)
  if (mousePressedOver(restart)) {
    reset ()
  }
  }


          
   
          


        drawSprites();
        text("Score:" + score,500,50)
}
function reset(){
  gameState=play
  gameOver.visible=false
  restart.visible=false
  buildingsGroup.destroyEach()
  obstacalegroup.destroyEach()
  balloon.x=50
  balloon.y=0
}
function spwanObsticales() {
  if (frameCount%120===0) {
    var obsTop=createSprite(600,random(50,120),2,5)
    obsTop.addImage("ob2",obsTop2)
    obsTop.velocityX=-4
    obsTop.scale=0.2
    obsTop.lifetime=300
    obstacalegroup.add(obsTop)
   
}

}
function spwanBuildings(){
 if (frameCount%90==0) {
 var obsTop=createSprite(600,500,6,10)

  obsTop.velocityX=-4
  obsTop.scale=0.2
  var ran=Math.round(random(1,3))
  switch (ran) {
    case 1:obsTop.addImage(obsBottom1) 
      break;
      case 2:obsTop.addImage(obsBottom2) 
      break;
      case 3:obsTop.addImage(obsBottom3) 
      break;
}
buildingsGroup.add(obsTop)
}
}