//定数-------------------------------------------
var PLAYER_SIZE = 10;

var NORMAL_SPEED = 5;
var SLOW_SPEED = 2;

var BULLET_SIZE = 3;
var BULLET_SPEED = 20;

var ENEMY_BULLET_SIZE = 7;
var ENEMY_BULLET_SPEED = 10;

var ENEMY1_SIZE =30;
var ENEMY1_SPEED = 7;
var ENEMY1_FIRST_X = 0;
var ENEMY1_FIRST_Y = 100;

var ENEMY2_SIZE =20;
var ENEMY2_SPEED = 8;
var ENEMY2_FIRST_X = 360;
var ENEMY2_FIRST_Y = 150;

var ENEMY3_SIZE =30;
var ENEMY3_SPEED = 5;
var ENEMY3_FIRST_X = 200;
var ENEMY3_FIRST_Y = 0;

//自機のコンストラクタ-------------------------------------
function Player(){
}
Player.prototype.init = function(x, y){
    this.size = PLAYER_SIZE;
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
    //弾丸オブジェクト
    bulletOfPlayerShot.push(new Shot());
    bulletOfPlayerShot[bulletOfPlayerShot.length-1].init(BULLET_SIZE, BULLET_SPEED, this.position.x, this.position.y);
    //ショット音オブジェクト
    playerShotSound[playerShotSoundNumber].play();  
    playerShotSoundNumber = (playerShotSoundNumber + 1)%8;
    //ショットカウント
    shotCount ++;
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
        this.type = 1;
        this.size = ENEMY1_SIZE;
        this.speed = ENEMY1_SPEED;
        this.position = new Position();
        this.position.x = ENEMY1_FIRST_X;
        this.position.y = ENEMY1_FIRST_Y;
        this.alive = true;
    }
    if(enemyType == "enemyType2"){
        this.type = 2;
        this.size = ENEMY2_SIZE;
        this.speed = ENEMY2_SPEED;
        this.position = new Position();
        this.position.x = ENEMY2_FIRST_X;
        this.position.y = ENEMY2_FIRST_Y;
        this.alive = true;
    }
    if(enemyType == "enemyType3"){
        this.type = 3;
        this.size = ENEMY3_SIZE;
        this.speed = ENEMY3_SPEED;
        this.position = new Position();
        this.position.x = ENEMY3_FIRST_X;
        this.position.y = ENEMY3_FIRST_Y;
        this.alive = true;
    }
}
Enemy.prototype.move = function(){
    if(this.type == 1){
        this.position.x += this.speed;
    }else if(this.type == 2){
        this.position.x -= this.speed;
    }else if(this.type == 3){
        this.position.x -= this.speed;
        this.position.y += this.speed;
    }

}

Enemy.prototype.shot = function(){
    bulletOfEnemyShot.push(new EnemyShot());
    bulletOfEnemyShot[bulletOfEnemyShot.length-1].init(this.position.x, this.position.y);
}
//敵機弾丸のコンストラクタ-------------------------------------
function EnemyShot(){
}
EnemyShot.prototype.init = function(x, y){
    this.size = ENEMY_BULLET_SIZE;
    this.speed = ENEMY_BULLET_SPEED;
    this.position = new Position();
    this.position.x = x;
    this.position.y = y;
    this.directionX = player.position.x - this.position.x;
    this.directionY = player.position.y - this.position.y;
    this.position.direction(player);
}
EnemyShot.prototype.move = function(){
    this.position.x -= this.speed*this.position.directionX;
    this.position.y -= this.speed*this.position.directionY;
}