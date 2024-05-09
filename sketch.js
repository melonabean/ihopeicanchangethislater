//VARIABLES FOR LAOADING IMAGES
let imgTitle

//VARIABLE FOR GAME STAGE
let stage = 0

///VARIABLES FOR SPRITE MOVEMENT
let Sprite
let speed = 4;

//VARIABLE FOR BULLET COOLDOWN
let cooldown = 20;
let currentCooldown = 0;

//VARIABLES FOR ENEMY SPAWN COOLDOWN
let spawnRateCurrent1 = 50;
let spawnRateCurrent2 = 80;
let spawnRateCurrent3 = 120;
let spawnRateCurrent4 = 150;

//PRELOAD IMAGES INTO SKETCH
function preload() {
  imgTitle = loadImage("imgTitle.png")
}

//ENEMIES KILLED VARIABLE
let enemiesKilled = []


//SETUP THE CANVAS
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  Sprite = createVector(255, 255);
}


//LOOP THROUGH DRAW FUNCTION AT FRAMERATE
function draw() {
imageMode(CENTER) 

//SPLASHSCREEN FOR GAME START
if (stage==0) {
  background("black")
  textAlign(CENTER)
  textSize(20)
  textFont("Courier New")
  fill("white")
  text("WASD controls movement", width/2, height/2-15)
  text("ARROW KEYS shoots bullets", width/2, height/2+16)
  textSize(25)
  fill("PaleGreen")
  text("PRESS SPACE TO START", width/2, height/2+100)
  if(keyIsDown(32)===true) {
    stage=1
  }
  image(imgTitle, width/2, 200);

}

//AFTER BUTTON IS PRESSED START GAME
if (stage==1) {
  background(220);

///SPRITE SHAPE; UPDATE WITH IMAGE
  fill(50)
  rect(Sprite.x, Sprite.y, 30, 30);

//SPRITE CANNOT MOVE BEYOND BOUNDARIES
  if (Sprite.x <= 14) {
    Sprite.x = 15
  }
    if (Sprite.x >= width-14) {
    Sprite.x = width-15
  }
    if (Sprite.y >= height-14) {
    Sprite.y = height-15
  }
    if (Sprite.y <=14) {
    Sprite.y = 15
  }
  
  
///MOVE SPRITE WITH WASD KEYS
  if (keyIsDown(87) && keyIsDown(68)){
    Sprite.x += speed/sqrt(2);
    Sprite.y -= speed/sqrt(2);  
  } else if (keyIsDown(87) && keyIsDown(65)) {
    Sprite.x -= speed/sqrt(2);
    Sprite.y -= speed/sqrt(2);
  } else if (keyIsDown(83) && keyIsDown(68)) {
    Sprite.x += speed/sqrt(2);
    Sprite.y += speed/sqrt(2);
  } else if (keyIsDown(83) && keyIsDown(65)) {
    Sprite.x -= speed/sqrt(2);
    Sprite.y += speed/sqrt(2);
  } else if (keyIsDown(65)) {
    Sprite.x -= speed;
  } else if (keyIsDown(68)) {
    Sprite.x += speed;
  } else if (keyIsDown(87)) {
    Sprite.y -= speed;
  } else if (keyIsDown(83)) {
    Sprite.y += speed;
  }

///LOOPS THROUGH BULLETS ARRAY; UPDATES POSITION OF EACH BULLET
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
    bullets[i].display();

//REMOVE BULLETS THAT GO OFF-SCREEN; UPDATE make sure that this gets changed when the borders are added in
    if (
      bullets[i].pos.x < 0 ||
      bullets[i].pos.x > width ||
      bullets[i].pos.y < 0 ||
      bullets[i].pos.y > height
    ) {
      bullets.splice(i, 1);
      i--;
    }
  }
  
//BULLETS FIRE IN ALL DIRECTIONS
        //SPEED OF DIAGONAL AND STRAIGHT BULLETS
  let sp = 7;
  let spd = sp/sqrt(2)
        //HAVE COOLDOWN CONSTANTLY DECREASE
  currentCooldown--;
        //SPAWN IN BULLETS WHEN COOLDOWN IS LESS THAN 0
  if (currentCooldown < 0) {
    if (keyIsDown(UP_ARROW) && keyIsDown(RIGHT_ARROW)) {
      bullets.push(new Bullet(Sprite.x+15, Sprite.y-15, 1, -1, spd));
    } else if (keyIsDown(UP_ARROW) && keyIsDown(LEFT_ARROW)) {
      bullets.push(new Bullet(Sprite.x-15, Sprite.y-15, -1, -1, spd));
    } else if (keyIsDown(DOWN_ARROW) && keyIsDown(RIGHT_ARROW)) {
      bullets.push(new Bullet(Sprite.x+15, Sprite.y+15, 1, 1, spd));
    } else if (keyIsDown(DOWN_ARROW) && keyIsDown(LEFT_ARROW)) {
      bullets.push(new Bullet(Sprite.x-15, Sprite.y+15, -1, 1, spd));
    } else if (keyIsDown(UP_ARROW)) {
      bullets.push(new Bullet(Sprite.x, Sprite.y-15, 0, -1, sp));
    } else if (keyIsDown(DOWN_ARROW)) {
      bullets.push(new Bullet(Sprite.x, Sprite.y+15, 0, 1, sp));
    } else if (keyIsDown(RIGHT_ARROW)) {
      bullets.push(new Bullet(Sprite.x+15, Sprite.y, 1, 0, sp));
    } else if (keyIsDown(LEFT_ARROW)) {
      bullets.push(new Bullet(Sprite.x-15, Sprite.y, -1, 0, sp));
    }
        //PAUSE BETWEEN 
    currentCooldown = cooldown;
  }
  
  ///LOOPS THROUGH ENEMIES ARRAY; UPDATES POSITION OF EACH ENEMY
  for (let j = 0; j < enemies.length; j++) {
    enemies[j].update();
    enemies[j].display();
    
    //REMOVE ENEMIES THAT GO OFF-SCREEN; UPDATE make sure that this gets changed when the borders are added in
    if (
      enemies[j].pos.x < 0 ||
      enemies[j].pos.x > width ||
      enemies[j].pos.y < 0 ||
      enemies[j].pos.y > height
    ) {
      enemies.splice(j, 1);
      j--;
    }
  }
  
//COLLISION DETECTION BETWEEN ENEMIES AND SPRITES
    for (let j = 0; j < enemies.length; j++){
        let d = dist(Sprite.x, Sprite.y, enemies[j].pos.x, enemies[j].pos.y)
        if (d < 30) {
        stage = 2
        d = 0
        }
      
    } 
  
//SPAWN IN NEW ENEMIES ALONG BORDER BASED ON SPAWNRATE 1
  
  spawnRateCurrent1--;
  if (spawnRateCurrent1 < 0) {
    enemies.push(new Enemy(floor(random(15, width-15)), 15))
  spawnRateCurrent1 = floor(random(50, 500))
  }
  
//SPAWN IN NEW ENEMIES ALONG BORDER BASED ON SPAWNRATE 2
  
  spawnRateCurrent2--;
  if (spawnRateCurrent2 < 0) {
    enemies.push(new Enemy(floor(random(15, width-15)), height-15))
  spawnRateCurrent2 = floor(random(50, 500))
  }
  
//SPAWN IN NEW ENEMIES ALONG BORDER BASED ON SPAWNRATE 3
  
  spawnRateCurrent3--;
  if (spawnRateCurrent3 < 0) {
    enemies.push(new Enemy(15, floor(random(15, height-15))))
  spawnRateCurrent3 = floor(random(50, 500))
  }
  
//SPAWN IN NEW ENEMIES ALONG BORDER BASED ON SPAWNRATE 4
  
  spawnRateCurrent4--;
  if (spawnRateCurrent4 < 0) {
    enemies.push(new Enemy(width-15, floor(random(15, height-15))))
  spawnRateCurrent4 = floor(random(50, 500))
  }
  
//LOOP THROUGH BULLETS ARRAY; LOOP THROUGH ENEMIES ARRAY; CALCULATE DISTANCE BETWEEN AND DELETE ENEMY FROM THE ARRAY WHEN HIT
  
  for (let i = 0; i < bullets.length; i++){
    for (let j = 0; j < enemies.length; j++){
        let d = dist(bullets[i].pos.x, bullets[i].pos.y, enemies[j].pos.x, enemies[j].pos.y)
        if (d < 30) {
//        enemies[j] = 0
//        enemies.length = 0
//        splice(enemies.array, 0, enemies[j])
        enemies.splice([j], 1)
        enemiesKilled++
        }
      
        }
    } 

//DISPLAY ENEMIES KILLED

fill("white")
textAlign(CENTER)
textSize(30)
textFont("Courier New")
text("Score", 100, 75)
text(enemiesKilled, 100, 100)
  
}

//GAME OVER SCREEN
if (stage===2) {
  fill(0)
  rect(width/2, height/2, width, height)
  textStyle(NORMAL)
  fill("white")
  textAlign(CENTER)
  textSize(40)
  textFont("Courier New")
  text("GAME OVER", width/2, height/2)
  text("Score", 100, 75)
  text(enemiesKilled, 100, 107)
}
//END OF DRAW
}

//BULLET CLASS
      //CREATE ARRAYS THAT STORE INFORMATION OF BULLETS AND BULLETSPEED
let bullets = [];
let bulletSpeed = [];

      //PROPERTIES FOR BULLET LOCATION AND DEFINED SPEED
class Bullet {
  constructor(x, y, dx, dy, speed) {
    // this.x = x;
    // this.y = y;
    this.pos = createVector(x, y)
    this.dx = dx;
    this.dy = dy;
    bulletSpeed = speed;
  }
      //UPDATE SPEED BASED ON BULLETSPEED VARIABLE 
  update() {
    this.pos.x += this.dx * bulletSpeed;
    this.pos.y += this.dy * bulletSpeed;
  }

      //DISPLAY BULLETS ON SCREEN BASED ON THIS SHAPE
  display() {
    fill(255, 0, 0);
    rect(this.pos.x, this.pos.y, 10, 10);
  }
}

//ENEMY CLASS
      //CREATE ARRAYS THAT STORE ENEMIES
let enemies = [];
      //PROPERTIES FOR ENEMY LOCATION AND DEFINED SPEED
class Enemy {
  constructor(x, y, dx, dy) {
    this.startPos=createVector(x, y)
    this.pos = this.startPos
    // this.x = x
    // this.y = y
    this.lerpVal = 0;
    this.speed = .01
  }
      //UPDATE POSITION BASED ON SPRITE POSITION 
  update() {
    // this.x = Sprite.x - this.x 
    // this.y = Sprite.y - this.y
    
    this.pos = p5.Vector.lerp(this.startPos, Sprite, this.lerpVal);
    this.lerpVal += this.speed;
}
    
      //DISPLAY ENEMIES ON SCREEN BASED ON THIS SHAPE
    display() {
    fill(0, 255, 0);
    rect(this.pos.x, this.pos.y, 30, 30);
  }
}

