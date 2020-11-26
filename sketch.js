const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var bird, slingShot;
var gameState = "on sling"
var bg ="sprite/bg2.png";
var score = 0;

function preload() {
    getBackgroundImg(); 
}

function setup(){
   
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 505, 300, 170);

    box1 = new Box(700,520,70,70);
    box2 = new Box(920,520,70,70);
    pig1 = new Pig(810, 550);
    log1 = new Log(810,460,300, PI/2);

    box3 = new Box(700,440,70,70);
    box4 = new Box(920,440,70,70);
    pig3 = new Pig(810, 420);

    log3 =  new Log(810,380,300, PI/2);

    box5 = new Box(810,360,70,70);
    log4 = new Log(760,320,150, PI/7);
    log5 = new Log(870,320,150, -PI/7);

    bird = new Bird(200,250);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:250});
   // getTime();
}



function draw(){
    if(backgroundImg){
    background(backgroundImg);
    textSize(22);
text ("Score:"+score,1100,50);

    }

    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    pig1.Score();
    pig3.Score();
    //log6.display();
    slingshot.display();   
     
}

function mouseDragged(){
   // if(gameState!== "launch"){
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
//}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launch";  
}

function keyPressed(){
    if(keyCode===32 && bird.body.speed<1){
    bird.trajectory = [];
    Matter.Body.setPosition(bird.body, {x:200, y:50})
    bird.body.speed = 0;
    slingshot.attach(bird.body);
    }
}

/*async function getTime(){
    console.log(T);
    }*/

   async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var dateTime = responseJSON.datetime;
    var T = dateTime.slice(11,13);

    if (T>=06 && T<=16){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);

   }

