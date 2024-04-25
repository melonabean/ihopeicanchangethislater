///VARIABLES FOR SPRITE MOVEMENT
let Sprite
let speed = 4;

//VARIABLE FOR BULLET COOLDOWN
let cooldown = 20;
let currentCooldown = 0;

//VARIABLES FOR ENEMY SPAWN COOLDOWN
let spawnRateCurrent = 0;
let spawnRateStart = 150;

//VARIABLE FOR COLLIDE FUNCTIONS
let enemyCollide = []


//SETUP THE CANVAS
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  Sprite = createVector(255, 255);
}

//LOOP THROUGH DRAW FUNCTION AT FRAMERATE
function draw() {
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
      bullets[i].x < 0 ||
      bullets[i].x > width ||
      bullets[i].y < 0 ||
      bullets[i].y > height
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
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].display();
  
    let enemyCollide = int(dist(Sprite.x, Sprite.y, Enemy.x, Enemy.y))

  }
  
//SPAWN IN NEW ENEMIES ALONG BORDER BASED ON SPAWNRATE
  
  spawnRateCurrent--;
  if (spawnRateCurrent < 0) {
    enemies.push(new Enemy(floor(random(15, width-15)), 15))
    enemies.push(new Enemy(floor(random(15, width-15)), height-15))
    enemies.push(new Enemy(15, floor(random(15, height-15))))
    enemies.push(new Enemy(width-15, floor(random(15, height-15))))
  spawnRateCurrent = spawnRateStart
  }
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