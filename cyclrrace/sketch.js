var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var pinkopp,redopp,yellowopp;
var pinkoi,redoi,yellowoi;
var pinkoi2,redoi2,yellowoi2;
var pinkgroup,yellowgroup,redgroup;

var distance;

var cyclebell;

var gameover,gameoveri;

var obstacle1,obstacle2,obstacle3;
var obstacle1i,obstacle2i,obstacle3i;

var END =0;
var PLAY =1;
var gameState = PLAY;
var selectob
var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
 //to show the cycling animation of pink opponent 
pinkoi=loadAnimation("opponent/opponent1.png","opponent/opponent2.png")  
 //to show the cycling animation of red opponent  
redoi=loadAnimation("opponent/opponent7.png","opponent/opponent8.png") 
  
//to show the cycling animation of red opponent  
  yellowoi=loadAnimation("opponent/opponent4.png","opponent/opponent5.png")
  
  pinkoi2=loadAnimation("opponent/opponent3.png")
  
  redoi2=loadAnimation("opponent/opponent9.png")
  
  //pinkoi2=loadAnimation("oponent/opponent3.png")
  //redoi2=loadAnimation("oponent/opponent9.png")
  //yellowoi2=loadAnimation("oponent/opponent6.png")
  
  yellowoi2=loadAnimation("opponent/opponent6.png")
  cyclebell=loadSound("sound/bell.mp3")
  gameoveri=loadAnimation("gameOver.png")
  
  obstacle1i=loadImage("obstacles/obstacle1.png")
  obstacle2i=loadImage("obstacles/obstacle2.png")
  obstacle3i=loadImage("obstacles/obstacle3.png")
}

function setup(){
  
createCanvas(1200,400);
 
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);

gameover=createSprite(270,200);
gameover.addAnimation("gameoer",gameoveri)
gameover.scale=0.5  
  
//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("collided",mainRacerImg2);
mainCyclist.scale=0.07;
  
 pinkgroup=createGroup();
 redgroup=createGroup();
 yellowgroup=createGroup();
obstacle1group=createGroup();
obstacle2group=createGroup();
obstacle3group=createGroup();

}

function draw() {
  background(220);

  drawSprites();

  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);

    if(gameState===PLAY){
     //code to move the main cyclist with mouse
      mainCyclist.y = World.mouseY;
     gameover.visible=false
    //code to make the main cyclist collide with edges
      edges= createEdgeSprites();
      mainCyclist .collide(edges);

      //code to reset the background
      if(path.x < 0 ){
        path.x = width/2;
      }

    //code to select any opponenet player randomly
    var selectPlayer=Math.round(random(1,3));

    if (World.frameCount%150==0){
    if(selectPlayer==1){
    pinkoppo();
    }
    else if(selectPlayer==2){
    redoppo();
    } 
    else if(selectPlayer==3){
    yellowoppo();
    }
    }
  var selectob=Math.round(random(1,3));    
   if (World.frameCount%100==0){
    if(selectob==1){
    obstacle1();
    }
    else if(selectob==2){
    obstacle2();
    } 
    else if(selectob==3){
    obstacle3();
    }
    }
  //code to increase the distance or score
      distance=distance+Math.round(getFrameRate()/50)

      //code to makethe bellsound
      if (keyDown("SPACE")){
      cyclebell.play(); 
    }

      //code to increase the speed of path asper distance
    path.velocityX = -(6+2* distance/150);
      
   if(pinkgroup.isTouching(mainCyclist)) {
     gameState=END   
   }
    
    if(redgroup.isTouching(mainCyclist)) {
     gameState=END   
   }
   
    if(yellowgroup.isTouching(mainCyclist)) {
     gameState=END   
   }
  if(obstacle1group.isTouching(mainCyclist)){
    gameState=END
  }
  if(obstacle2group.isTouching(mainCyclist)){
    gameState=END
  }
  if(obstacle3group.isTouching(mainCyclist)){
    gameState=END
  }
     }
  
 else if (gameState===END) {
   mainCyclist.changeAnimation("collided",mainRacerImg2)
redgroup.velocityX=0;
pinkgroup.velocityX=0;
yellowgroup.velocityX=0;
redgroup.setLifetime=-1
pinkgroup.setLifetime=-1
yellowgroup.setLifetime=-1
   
redgroup.destroyEach();
pinkgroup.destroyEach();
yellowgroup.destroyEach();
 path.velocityX=0; 
   
  //code to bring obstacle in gamestate end
obstacle1group.velocityX=-1;
obstacle1group.destroyEach();
obstacle1group.setLifetime=-1
obstacle2group.velocityX=-1;
obstacle2group.destroyEach();
obstacle2group.setLifetime=-1
obstacle3group.velocityX=-1;
obstacle3group.destroyEach();
obstacle3group.setLifetime=-1
   gameover.visible=true;
  if(keyDown("UP_ARROW")){
   reset() 

  } 
  text("press up arrow to restart",170,250) 
 }
  
    }
//code to create the pink opponent
function pinkoppo(){
var pinkopp=createSprite(600,Math.round(random(50,350)),10,10)
pinkopp.scale=0.07;
pinkopp.velocityX=-(6+2*distance/150)
pinkopp.addAnimation("opponentPlayer1",pinkoi);
pinkopp.setLifetime=300;
pinkopp.addAnimation("pinkcollided",pinkoi2);

 
 
pinkgroup.add(pinkopp);  
}


//to create the red opponent
function redoppo(){
   
var redopp=createSprite(500,Math.round(random(50,350)),10,10)
redopp.scale=0.07;
redopp.velocityX=-(6+2*distance/150);
redopp.addAnimation("opponentPlayer2",redoi);
//redopp.addAnimation("redcollided",redoi2)
redopp.setLifetime=300;

redgroup.add(redopp);  
  }


//code to create the red opponent
function yellowoppo(){
   
var yellowopp=createSprite(500,Math.round(random(50,350)),10,10)
yellowopp.scale=0.07;
yellowopp.velocityX=-(6+2*distance/150);
yellowopp.addAnimation("opponentPlayer3",yellowoi);
//yellowopp.addAnimation("yellowcollided",yellowopi2)
yellowopp.setLifetime=300;

yellowgroup.add(yellowopp);  
}

function reset(){
  gameState=PLAY
  gameover.visisble=false;
  pinkgroup.destroyEach();
  redgroup.destroyEach();
  yellowgroup.destroyEach();
  mainCyclist.changeAnimation("SahilRunning",mainRacerImg1)
  distance=0; 
}
function obstacle1(){
   var obstacle1=createSprite(500,Math.round(random(50,350)),10,10)
   obstacle1.velocityX = -(6+2*distance /100);
   obstacle1.addImage("ob",obstacle1i)
   obstacle1.scale=0.1
   obstacle1.setLifetime=300;
   obstacle1group.add(obstacle1)
} 
  
function obstacle2(){
      var obstacle2=createSprite(500,Math.round(random(50,350)),10,10)
   obstacle2.velocityX = -(6+2*distance /100);
   obstacle2.addImage("oba",obstacle2i)
   obstacle2.scale=0.1
   obstacle2.setLifetime=300;
   obstacle2group.add(obstacle2)
 }

function obstacle3(){
   var obstacle3=createSprite(500,Math.round(random(50,350)),10,10)
   obstacle3.velocityX = -(6+2*distance /100);
   obstacle3.addImage("obas",obstacle3i)
   obstacle3.scale=0.1
   obstacle3.setLifetime=300;
   obstacle3group.add(obstacle3)
 }
