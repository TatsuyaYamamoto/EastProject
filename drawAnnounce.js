//ゲーム画面ステータス---------------------------------------
function drawTopAnnounce(){
    infoContext.textAlign = "center";
    infoContext.fillStyle = "black";
    infoContext.font = "bold 40px 'ＭＳ Ｐゴシック'";
    infoContext.fillText("EAST PROJECT", gameScreen.width/2, gameScreen.height/2);
    infoContext.font = "15px 'ＭＳ Ｐゴシック'";
    infoContext.fillText('PLEASE PRESS "ENTER KEY" FOR START', gameScreen.width/2, gameScreen.height/2+70);
    infoContext.fillText('PLEASE PRESS "X KEY" FOR CHECK HOW TO PLAY', gameScreen.width/2, gameScreen.height/2+100);
}



//HowToPlay画面ステータス---------------------------------------
function drawHowToPlayAnnounce(){

    //ゲームオーバーアナウンス描画
    infoContext.fillStyle = "black";

    infoContext.textAlign = "center";
    infoContext.font = "bold 20px 'ＭＳ Ｐゴシック'";
    infoContext.fillText('弾丸を交わしながら敵機を撃ち、', gameScreen.width/2, 40);
    infoContext.fillText('敵撃墜数を稼ぎましょう', gameScreen.width/2, 70);
    infoContext.fillText('敵機はあなたを狙ってショットします。', gameScreen.width/2, 110);
    infoContext.fillText('交わし方に気をつけて！', gameScreen.width/2, 140);

    infoContext.textAlign = "left";
    infoContext.font = "15px 'ＭＳ Ｐゴシック'";
    infoContext.fillText('HOW TO PLAY', 20, gameScreen.height/2+50);
    infoContext.fillText('MOVE : ↑↓→←', 20, gameScreen.height/2+80);
    infoContext.fillText('SLOW DOWN : z', 20, gameScreen.height/2+110);
    infoContext.fillText('SHOT : space', 20, gameScreen.height/2+140);

    infoContext.textAlign = "center";
    infoContext.font = "15px 'ＭＳ Ｐゴシック'";
    infoContext.fillText('PLEASE PRESS "Z KEY" FOR RETURN', gameScreen.width/2, gameScreen.height-20);

}

//gameover---------------------------------------
function drawGameOverAnnounce(){

    infoContext.textAlign = "center";
    infoContext.fillStyle = "red";

    infoContext.font = "bold 20px 'ＭＳ Ｐゴシック'";
    infoContext.fillText('YOUR HIT COUNT IS "' + hitCount + '"!!', gameScreen.width/2, gameScreen.height/2-50);

    infoContext.font = "bold 40px 'ＭＳ Ｐゴシック'";
    infoContext.fillText("GAME OVER", gameScreen.width/2, gameScreen.height/2);
    infoContext.font = "15px 'ＭＳ Ｐゴシック'";
    infoContext.fillText('PLEASE PRESS "ENTER KEY" FOR RETRY', gameScreen.width/2, gameScreen.height/2+50);
    infoContext.fillText('PLEASE PRESS "Z KEY" FOR TOP', gameScreen.width/2, gameScreen.height/2+80);
}