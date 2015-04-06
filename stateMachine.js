//ゲーム画面ステータス---------------------------------------
function gameState(){
    //初期化
    gameInit();

    //アニメーション
    (function(){

        //自機生存確認
        checkPlayerAlive();

        if(player.alive){

            //ゲーム描画
            drawGameScreen();
            drawInfoScreen();

            //現在実行している関数を再実行
            setTimeout(arguments.callee, FPS);
            //フレーム数増加
            frameCount++;            
        }else{
            gameOverState();
        }

    })();
}



//TOP画面ステータス---------------------------------------
function topState(){
    // screen削除
    screenContext.clearRect(0, 0, gameScreen.width, gameScreen.height);
    //アナウンス描画
    screenContext.textAlign = "center";
    screenContext.font = "bold 40px 'ＭＳ Ｐゴシック'";
    screenContext.fillText("EAST PROJECT", gameScreen.width/2, gameScreen.height/2);
    screenContext.font = "15px 'ＭＳ Ｐゴシック'";
    screenContext.fillText('PLEASE PRESS "ENTER KEY" FOR START', gameScreen.width/2, gameScreen.height/2+50);

    //アニメーション
    (function(){

         if(pressedKey[7]){
            gameState();

        } else {
            //現在実行している関数を再実行
            setTimeout(arguments.callee, FPS);
        }
    })();
}


//GameOver画面ステータス---------------------------------------
function gameOverState(){
    // screen削除
    screenContext.clearRect(0, 0, gameScreen.width, gameScreen.height);
 
    //ゲームオーバーアナウンス描画
    screenContext.textAlign = "center";

    screenContext.font = "bold 20px 'ＭＳ Ｐゴシック'";
    screenContext.fillText('YOUR HIT COUNT IS "' + hitCount + '"!!', gameScreen.width/2, gameScreen.height/2-50);

    screenContext.font = "bold 40px 'ＭＳ Ｐゴシック'";
    screenContext.fillText("GAME OVER", gameScreen.width/2, gameScreen.height/2);
    screenContext.font = "15px 'ＭＳ Ｐゴシック'";
    screenContext.fillText('PLEASE PRESS "ENTER KEY" FOR RETRY', gameScreen.width/2, gameScreen.height/2+50);

    //アニメーション
    (function(){

         if(pressedKey[7]){
            gameState();

        } else {
            //現在実行している関数を再実行
            setTimeout(arguments.callee, FPS);
        }
    })();
}