//定数-------------------------------------------
var NORMAL_SPEED = 5;
var SLOW_SPEED = 2;

var BULLET_SIZE = 3;
var BULLET_SPEED = 20;

var ENEMY1_SIZE =30;
var ENEMY1_SPEED = 13;
var ENEMY1_FIRST_X = 100;
var ENEMY1_FIRST_Y = 0;

var ENEMY2_SIZE =20;
var ENEMY2_SPEED = 15;
var ENEMY2_FIRST_X = 180;
var ENEMY2_FIRST_Y = 0;

//自機のコンストラクタ-------------------------------------
function Player(){
}
Player.prototype.init = function(size, x, y){
    this.size = size;
    this.position = new Position();
    this.position.x = x;
    this.position.y = y;
    this.alive = true;
}

Player.prototype.move = function(){

    //移動スピードの操作
    var playerMoveDistance = NORMAL_SPEED;
    if(pressedKey[5]){
        playerMoveDistance = SLOW_SPEED;        
    }

    //押下中のキーの判定と移動可能範囲の指定
    if(pressedKey[1] && player.position.y > 0){
        player.position.y -= playerMoveDistance;
    }
    if(pressedKey[2] && player.position.y < gameScreen.height){
        player.position.y += playerMoveDistance;
    }
    if(pressedKey[3] && player.position.x < gameScreen.width){
        player.position.x += playerMoveDistance;
    }
    if(pressedKey[4] && player.position.x > 0){
        player.position.x -= playerMoveDistance;
    }
}
Player.prototype.shot = function(){
    bulletOfPlayerShot.push(new Shot());
    bulletOfPlayerShot[bulletOfPlayerShot.length-1].init(BULLET_SIZE, BULLET_SPEED, player.position.x, player.position.y)
    shotCount ++;
    shotStatus = true;
}

//弾丸のコンストラクタ-------------------------------------
function Shot(){
}
Shot.prototype.init = function(size, speed, x, y){
    this.size = size;
    this.speed = speed;
    this.position = new Position();
    this.position.x = x;
    this.position.y = y;
}
Shot.prototype.move = function(){
    this.position.y -= this.speed;
}
//敵機のコンストラクタ-------------------------------------
function Enemy(){
}
Enemy.prototype.init = function(enemyType){
    if(enemyType == "enemyType1"){
        this.size = ENEMY1_SIZE;
        this.speed = ENEMY1_SPEED;
        this.position = new Position();
        this.position.x = ENEMY1_FIRST_X;
        this.position.y = ENEMY1_FIRST_Y;
        this.alive = true;
    }
    if(enemyType == "enemyType2"){
        this.size = ENEMY2_SIZE;
        this.speed = ENEMY2_SPEED;
        this.position = new Position();
        this.position.x = ENEMY2_FIRST_X;
        this.position.y = ENEMY2_FIRST_Y;
        this.alive = true;
    }
}
Enemy.prototype.move = function(){
    this.position.y += this.speed;
}