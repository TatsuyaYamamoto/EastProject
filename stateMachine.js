//ゲーム画面ステータス---------------------------------------
function gameState(){
    //初期化
    gameInit();

    //アニメーションMachine
    (function(){

        //自機生存確認
        checkPlayerAlive();

        if(player.alive){
            //ゲーム描画
            processGameScreen();
            //ゲーム情報描画
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
    infoContext.clearRect(0, 0, gameScreen.width, gameScreen.height);
    //アナウンス描画
    drawTopAnnounce();
    //アニメーション
    (function(){

         if(pressedKey[7]){
            gameState();

        }else if(pressedKey[8]){
            howToPlayState();
        }else {
            //現在実行している関数を再実行
            setTimeout(arguments.callee, FPS);
        }
    })();
}

//操作説明画面ステータス---------------------------------------
function howToPlayState(){
    // screen削除
    infoContext.clearRect(0, 0, gameScreen.width, gameScreen.height);


    //初期化
    gameInit();


    //アニメーションMachine
    (function(){

        if(pressedKey[5]){
            topState();       
        }else{
            processHowToPlayScreen();
            drawHowToPlayAnnounce();
            //現在実行している関数を再実行
            setTimeout(arguments.callee, FPS);
            //フレーム数増加
            frameCount++; 
        }

    })();
}
//GameOver画面ステータス---------------------------------------
function gameOverState(){
    // screen削除
    infoContext.clearRect(0, 0, gameScreen.width, gameScreen.height);
 
    //ゲームオーバーアナウンス描画
    drawGameOverAnnounce();
    //アニメーション
    (function(){

         if(pressedKey[7]){
            gameState();

        } else if(pressedKey[5]){
            topState(); 
        }else {
            //現在実行している関数を再実行
            setTimeout(arguments.callee, FPS);
        }
    })();
}