
//global---------------------------------------
var gameScreen;
var screenContext;
var info_keyCode, info_coordinates;
var keyCode;
var pressedKey = []
var playerPoint = new Point();


//定数-------------------------------------------
var FPS = 1000 / 30;

var UP_KEYCODE = 38;
var DOWN_KEYCODE = 40;
var RIGHT_KEYCODE = 39;
var LEFT_KEYCODE = 37;
var SLOW_KEYCODE = 90;
var SHOT_KEYCODE = 32;

var NORMAL_SPEED = 5;
var SLOW_SPEED = 2;

//描画処理---------------------------------------
window.onload = function(){

	// スクリーンの初期化
    gameScreen = document.getElementById('screen');
    //canvas2dコンテキストの登録
    screenContext = gameScreen.getContext("2d");

	//イベントの登録
	window.addEventListener("keydown", keyDown, true);
    window.addEventListener("keyup", keyUp, true);

    //エレメント
    info_keyCode = document.getElementById('info_keyCode');
    info_coordinates = document.getElementById('info_coordinates');

    //screenの描画
    (function(){

        // information表記
        info_coordinates.innerHTML =  playerPoint.x + " : " +playerPoint.y ;
        info_keyCode.innerHTML = keyCode;

        // screenクリア 
        screenContext.clearRect(0, 0, gameScreen.width, gameScreen.height);
        // パスの設定を開始
        screenContext.beginPath();

        // 円の色を設定する
        screenContext.fillStyle = 'rgba(0, 0, 255, 0.75)';

        // 円を描くパスを設定
        screenContext.arc(playerPoint.x, playerPoint.y, 10, 0, Math.PI * 2, false);

        // 円を描く
        screenContext.fill();

        playerMove();

        //現在実行している関数を実行
		setTimeout(arguments.callee, FPS);
    })();

}

//event処理---------------------------------------

//プレイヤーの座標をkeyCodeに合わせて変更
function keyDown(event){
    keyCode = event.keyCode;
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
    }
}

function playerMove(){

    var playerMoveDistance = NORMAL_SPEED;
    if(pressedKey[5]){
        playerMoveDistance = SLOW_SPEED;        
    }
    if(pressedKey[1]){
        playerPoint.y -= playerMoveDistance;
    }
    if(pressedKey[2]){
        playerPoint.y += playerMoveDistance;
    }
    if(pressedKey[3]){
        playerPoint.x += playerMoveDistance;
    }
    if(pressedKey[4]){
        playerPoint.x -= playerMoveDistance;
    }
}
