
//global---------------------------------------
var screen;
var info_keyCode, info_coordinates;
var keyCode = "nothing";
var fps = 1000 / 30;
var playerPoint = new Point();

//描画処理---------------------------------------
window.onload = function(){

	// スクリーンの初期化
    screen = document.getElementById('screen');

	//イベントの登録
	window.addEventListener("keydown", keyDown, true);

    //エレメント
    info_keyCode = document.getElementById('info_keyCode');
    info_coordinates = document.getElementById('info_coordinates');

    //screenの描画
    (function(){

        // information表記
        info_coordinates.innerHTML =  playerPoint.x + " : " +playerPoint.y ;
        info_keyCode.innerHTML = keyCode;

        //現在実行している関数を実行
		setTimeout(arguments.callee, fps);
    })();

}

//event処理---------------------------------------

//keycodeを取得して、関数を実行させる 
function keyDown(event){
    keyCode = event.keyCode;
    //十字キー
    if(keyCode >= 37 && keyCode <= 40){
    	playerMove(keyCode);
    }
}

//プレイヤーの座標をkeyCodeに合わせて変更
function playerMove(keyCode){
	if(keyCode == 37){
	    playerPoint.x --;
	}else if(keyCode == 39){
	    playerPoint.x ++;
	}else if(keyCode == 38){
	    playerPoint.y --;
	}else if(keyCode == 40){
	    playerPoint.y ++;
	}
}
