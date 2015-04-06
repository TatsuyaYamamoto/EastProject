//初期化-----------------------------------------
function gameInit(){

//自機の初期化(サイズ、初期x軸位置、初期y軸位置)
player = new Player();
player.init(10, 180, 450);

bulletOfPlayerShot = [];
enemy = [];
bulletOfEnemyShot = [];

keyCode = "no";
pressedKey = [];
shotStatus = false;
shotCount = 0;
hitCount = 0;
frameCount = 0;

}

//関数----------------------------------------------------

function drawInfoScreen(){
    // information表記
    document.getElementById("info_coordinates").innerHTML =  "coordinates of point : "+player.position.x + " : " +player.position.y ;
    document.getElementById("info_keyCode").innerHTML = "KeyCode pushing : "+keyCode;
    document.getElementById("info_shotCount").innerHTML = "ShotCount : "+shotCount;
    document.getElementById("info_hitCount").innerHTML = "HitCount : "+hitCount;
    document.getElementById("info_frameCount").innerHTML = "FrameCount : "+frameCount;
}

function drawGameScreen(){
    // screen削除
    screenContext.clearRect(0, 0, gameScreen.width, gameScreen.height);

    //自機管理
    player.move();
    playerDraw();

    // 自機Shot
    if(pressedKey[6] && (frameCount % SHOT_SPEED == 0)){
        player.shot();
    }
    //自機shot管理
    for(i = 0; i< bulletOfPlayerShot.length; i++){
        bulletOfPlayerShot[i].move();
        playerShotDraw(i);
        if(bulletOfPlayerShot[i].position.y < 0){
            bulletOfPlayerShot.splice(i, 1);
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

    //敵機shot
    if(frameCount != 0 && frameCount%12 == 0){
        for(i = 0; i < enemy.length; i++){
            enemy[i].shot();
        }
    }
    //敵機shot管理
    for(i = 0; i< bulletOfEnemyShot.length; i++){
        bulletOfEnemyShot[i].move();
        enemyShotDraw(i);
        if(bulletOfEnemyShot[i].position.y < 0){
            bulletOfEnemyShot.splice(i, 1);
        }
    }

    //敵機描画
    for(i = 0; i < enemy.length; i++){
        checkEnemyAlive(i);
        if(!enemy[i].alive){
            enemy.splice(i, 1);
            //ヒット数増加
            hitCount++;
        }
        else if(enemy[i].position.y > 480){
            enemy.splice(i, 1);
        }else{
            enemy[i].move();
            enemyDraw(i);
        }
    }
}

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
function playerShotDraw(i){
    screenContext.beginPath();
    screenContext.fillStyle = "rgba(0, 255, 0, 0.75)";
    screenContext.arc(bulletOfPlayerShot[i].position.x, bulletOfPlayerShot[i].position.y, bulletOfPlayerShot[i].size , 0, Math.PI * 2, false);
    screenContext.fill();
}
function enemyDraw(i){
    screenContext.beginPath();
    screenContext.fillStyle = "rgba(255, 0, 0, 0.75)";
    screenContext.arc(enemy[i].position.x, enemy[i].position.y, enemy[i].size , 0, Math.PI * 2, false);
    screenContext.fill();
}
function enemyShotDraw(i){
    screenContext.beginPath();
    screenContext.fillStyle = "rgba(0, 255, 0, 0.75)";
    screenContext.arc(bulletOfEnemyShot[i].position.x, bulletOfEnemyShot[i].position.y, bulletOfEnemyShot[i].size , 0, Math.PI * 2, false);
    screenContext.fill();
}
function checkPlayerAlive(){

    for(i = 0; i < enemy.length; i++){
        var length = player.position.distance(enemy[i]);
        if(length < player.size + enemy[i].size){
            player.alive = false;
        }
    }
    for(i = 0; i < bulletOfEnemyShot.length; i++){
        var length = player.position.distance(bulletOfEnemyShot[i]);
        if(length < player.size + bulletOfEnemyShot[i].size){
            player.alive = false;
        }
    }
}

function checkEnemyAlive(i){
    for(t = 0; t < bulletOfPlayerShot.length; t++){
        var length = enemy[i].position.distance(bulletOfPlayerShot[t]);
        if(length < enemy[i].size + bulletOfPlayerShot[t].size){
            enemy[i].alive = false;
        }
    }  
}

