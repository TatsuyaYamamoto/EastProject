/**
変数、定数、共通管理用に座標とイベントの処理
*/

//global---------------------------------------
var gameScreen, screenContext;

var game;

var pressedKey = [];
var shotCount;
var hitCount;
var frameCount;


//自機
var player;
//自機弾丸
var bulletOfPlayerShot = [];
//敵機
var enemy = [];
//敵機弾丸
var bulletOfEnemyShot = [];

//音系
var playerShotSound = [];
var enemyShotSound = [];
var enemyBombSound ;
//定数-------------------------------------------
var FPS = 1000 / 40;

var UP_KEYCODE = 38;
var DOWN_KEYCODE = 40;
var RIGHT_KEYCODE = 39;
var LEFT_KEYCODE = 37;
var SLOW_KEYCODE = 90;
var SHOT_KEYCODE = 32;
var ENTER_KEYCODE = 13;
var OPTION_KEYCODE = 88;

var SHOT_SPEED = 6;//連射速度パラメーター

//座標管理用コンストラクタ---------------------------------
function Position(){
	this.x = 0;
	this.y = 0;
}

Position.prototype.distance = function(target){

	var x = this.x - target.position.x;
	var y = this.y - target.position.y;

	var length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	return length;
}
Position.prototype.direction = function(target){
    
    var x = this.x - target.position.x;
    var y = this.y - target.position.y;

    var length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    
    this.directionX = x/length;
    this.directionY = y/length;
}


//event処理---------------------------------------

//プレイヤーの座標をkeyCodeに合わせて変更
function keyDown(event){

    if(event.keyCode == UP_KEYCODE){
        pressedKey[1] = true;
    }else if(event.keyCode == DOWN_KEYCODE){
        pressedKey[2] = true;
    }else if(event.keyCode == RIGHT_KEYCODE){
        pressedKey[3] = true;
    }else if(event.keyCode == LEFT_KEYCODE){
        pressedKey[4] = true;
    }else if(event.keyCode == SLOW_KEYCODE){
        pressedKey[5] = true;
    }else if(event.keyCode == SHOT_KEYCODE){
        pressedKey[6] = true;
    }else if(event.keyCode == ENTER_KEYCODE){
        pressedKey[7] = true;
    }else if(event.keyCode == OPTION_KEYCODE){
        pressedKey[8] = true;
    }
}
function keyUp(event){
    if(event.keyCode == UP_KEYCODE){
        pressedKey[1] = false;
    }else if(event.keyCode == DOWN_KEYCODE){
        pressedKey[2] = false;
    }else if(event.keyCode == RIGHT_KEYCODE){
        pressedKey[3] = false;
    }else if(event.keyCode == LEFT_KEYCODE){
        pressedKey[4] = false;
    }else if(event.keyCode == SLOW_KEYCODE){
        pressedKey[5] = false;
    }else if(event.keyCode == SHOT_KEYCODE){
        pressedKey[6] = false;
    }else if(event.keyCode == ENTER_KEYCODE){
        pressedKey[7] = false;
    }else if(event.keyCode == OPTION_KEYCODE){
        pressedKey[8] = true;
    }
}
