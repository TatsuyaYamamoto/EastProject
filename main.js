
//global---------------------------------------
var gameScreen, screenContext;

var keyCode;
var pressedKey = []
var shotStatus = false;
var shotCount = 0;
var frameCount = 0;
var enemyType;

//定数-------------------------------------------
var FPS = 1000 / 30;

var UP_KEYCODE = 38;
var DOWN_KEYCODE = 40;
var RIGHT_KEYCODE = 39;
var LEFT_KEYCODE = 37;
var SLOW_KEYCODE = 90;
var SHOT_KEYCODE = 32;

//初期化-----------------------------------------

//自機の初期化(サイズ、初期x軸位置、初期y軸位置)
var player = new Player();
player.init(10, 180, 450);

//自機弾丸
var playerShot = [];

//敵機
var enemy = [];
//描画処理---------------------------------------
window.onload = function(){

	// スクリーンの初期化、canvas2dコンテキストの登録
    gameScreen = document.getElementById('screen');
    screenContext = gameScreen.getContext("2d");

	//イベントの登録
	window.addEventListener("keydown", keyDown, true);
    window.addEventListener("keyup", keyUp, true);


    //screenの描画
    (function(){

        // information表記
        document.getElementById("info_coordinates").innerHTML =  "coordinates of point : "+player.position.x + " : " +player.position.y ;
        document.getElementById("info_keyCode").innerHTML = "KeyCode pushing : "+keyCode;
        document.getElementById("info_shotCount").innerHTML = "ShotCount : "+shotCount;
        document.getElementById("info_frameCount").innerHTML = "FrameCount : "+frameCount;

        // screen削除
        screenContext.clearRect(0, 0, gameScreen.width, gameScreen.height);

        //自機管理
        player.move();
        playerDraw();
        checkPlayerAlive();

        //Shotする=Shotオブジェクトを作成する
        player.shot();

        //shot管理
        for(i = 0; i< playerShot.length; i++){
            playerShot[i].move();
            shotDraw(i);
            if(playerShot[i].position.y < 0){
                playerShot.splice(i, 1);
            }
        }

        //敵機管理
        if(frameCount != 0 && frameCount%150 == 0){
            enemyType = "enemyType1";
            enemy.push(new Enemy());
            enemy[enemy.length-1].init(enemyType);
        }

        if(frameCount != 0 && frameCount%100 == 0){
            enemyType = "enemyType2";
            enemy.push(new Enemy());
            enemy[enemy.length-1].init(enemyType);
        }

        //敵機描画
        for(i = 0; i < enemy.length; i++){
            enemy[i].move();
            enemyDraw(i);
        }

        //フレーム数増加
        frameCount++;

        //自機生存確認
        if(player.alive){
            //現在実行している関数を再実行
            setTimeout(arguments.callee, FPS);
        }else{
            GAMEOVER();
        }
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
    }else if(event.keyCode == SHOT_KEYCODE){
        pressedKey[6] = true;
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
    }
}


//関数----------------------------------------------------

function playerDraw(){
    // パスの設定を開始
    screenContext.beginPath();
    // 円の色を設定する
    screenContext.fillStyle = "rgba(0, 0, 255, 0.75)";
    // 円を描くパスを設定
    screenContext.arc(player.position.x, player.position.y,player.size , 0, Math.PI * 2, false);
    // 円を描く
    screenContext.fill();
}
function shotDraw(i){
    screenContext.beginPath();
    screenContext.fillStyle = "rgba(0, 255, 0, 0.75)";
    screenContext.arc(playerShot[i].position.x, playerShot[i].position.y, playerShot[i].size , 0, Math.PI * 2, false);
    screenContext.fill();
}
function enemyDraw(i){
    screenContext.beginPath();
    screenContext.fillStyle = "rgba(255, 0, 0, 0.75)";
    screenContext.arc(enemy[i].position.x, enemy[i].position.y, enemy[i].size , 0, Math.PI * 2, false);
    screenContext.fill();
}
function checkPlayerAlive(){

    for(i = 0; i < enemy.length; i++){
        var length = player.position.distance(enemy[i]);
        if(length < player.size + enemy[i].size){
            alert(player.size +"+"+length)
            player.alive = false;
        }
    }
}

function GAMEOVER(){

    alert(player.size +"自機消滅しました。リロードしてください。");
    // screen削除
    screenContext.clearRect(0, 0, gameScreen.width, gameScreen.height);
}
