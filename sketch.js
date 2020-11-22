var ghost;
var window;
var tower;
var railing;
var invisibleRail

var PLAY = 1;
var END = 2;
var gameState = 1;
function preload (){
  ghostImg = loadImage ("ghost-standing.png");
  towerImg = loadImage ("tower.png");
  windowImg = loadImage ("door.png");
  rail = loadImage("climber.png");
  
}


function setup(){
  createCanvas(600,600)
  tower = createSprite (300,300,600,600);
  tower.addImage (towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite (200,200,20,20);
  ghost.addImage (ghostImg);
  ghost.scale=0.4
  
  windowsGroup = new Group ();
  railingGroup = new Group ();
  invisibleRailGroup = new Group ();
}


function draw (){
  background ("white");
  
  if (gameState===PLAY){
    
    tower.velocityY = 2;
    
    if (tower.y >600){
      tower.y = 300;
    }
    if (keyWentDown("space")){
      ghost.velocityY=-10;
    }
    ghost.velocityY = ghost.velocityY + 0.8;
    
    if (keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 4;
    }
     if (keyDown("LEFT_ARROW")){
      ghost.x = ghost.x - 4;
    }
    if (ghost.isTouching(invisibleRailGroup)|| ghost.y > 600){
     
      gameState = END;
      ghost.destroy();
    }
    
    
     spawnWindow();
  drawSprites();
  }
  if (gameState === END){
    textSize (75);
    fill ("yellow");
    text ("gameover",200,200);
    
  }

 
}

function spawnWindow (){
  if (frameCount % 100 === 0) {
    
    var window = createSprite(0,120,40,10);
    
    window.x = Math.round(random(80,500));
    window.addImage (windowImg);
    window.scale =1.2;
    window.velocityY = 3;
    
   
    
     //assign lifetime to the variable
    window.lifetime = 200;
    
    //adjust the depth
    window.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    //window.lifetime = 200;
    //add each cloud to the group
    windowsGroup.add(window);
    
   var railing = createSprite (window.x,window.y + 80,20,20);
     railing.velocityY = window.velocityY;
    railing.addImage (rail);
    
    invisibleRail = createSprite (window.x,window.y+100,100,10);
   
    invisibleRail.velocityY = 3;
    invisibleRail.lifetime = 200;
    railing.lifetime = 200;
    invisibleRailGroup.add(invisibleRail);
    railingGroup.add(railing);
  }
  

}
