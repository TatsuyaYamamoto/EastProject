//定数-------------------------------------------
var NORMAL_SPEED = 5;
var SLOW_SPEED = 2;

var SHOT_SIZE = 3;
var SHOT_SPEED = 20;

var ENEMY1_SIZE =30;
var ENEMY1_SPEED = 10;
var ENEMY1_FIRST_X = 150;
var ENEMY1_FIRST_Y = 0;

//自機のコンストラクタ-------------------------------------
function Player(){
}
Player.prototype.init = function(size, x, y){
    this.size = size;
    this.position = new Position();
    this.position.x = x;
    this.position.y = y;
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
    if(pressedKey[6]){
        playerShot.push(new Shot());
        playerShot[playerShot.length-1].init(SHOT_SIZE, SHOT_SPEED, player.position.x, player.position.y)
        shotCount ++;
        shotStatus = true;
    }
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
    }
}
Enemy.prototype.move = function(){
    this.position.y += this.speed;
}