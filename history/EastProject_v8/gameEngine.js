//初期化-----------------------------------------
function gameInit(){

//自機の初期化(サイズ、初期x軸位置、初期y軸位置)
player = new Player();
player.init(180, 450);

bulletOfPlayerShot = [];
enemy = [];
bulletOfEnemyShot = [];

keyCode = "no";
pressedKey = [];
shotStatus = false;
shotCount = 0;
hitCount = 0;
frameCount = 0;


//効果音の初期化
// for (i = 0; i<8; i++){
//     playerShotSound[i] = new Audio("sound/gun1.mp3");
// }
// playerShotSoundNumber = 0;
// enemyShotSound = new Audio("sound/gun2.mp3");


}

//関数----------------------------------------------------

function drawInfoScreen(){
    // information表記
    infoContext.fillStyle = "black";
    infoContext.textAlign = "right";
    infoContext.font = "bold 20px 'ＭＳ Ｐゴシック'";
    infoContext.fillText(player.position.x + " : " +player.position.y, 350, gameScreen.height-20);
    infoContext.fillText("HitCount : "+hitCount, 350, gameScreen.height-50);
}

function processHowToPlayScreen(){
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

        var x = bulletOfPlayerShot[i].position.x;
        var y = bulletOfPlayerShot[i].position.y;

        if(x > 360 || x < 0 || y > 480　|| y < 0){
            bulletOfPlayerShot.splice(i, 1);
            playerShotSound.splice(i, 1);
        }else{
            bulletOfPlayerShot[i].move();
            playerShotDraw(i);
        }
    }   
}

function processGameScreen(){
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

        var x = bulletOfPlayerShot[i].position.x;
        var y = bulletOfPlayerShot[i].position.y;

        if(x > 360 || x < 0 || y > 480　|| y < 0){
            bulletOfPlayerShot.splice(i, 1);
        }else{
            bulletOfPlayerShot[i].move();
            playerShotDraw(i);
        }
    }

    //敵機作成
    if(frameCount != 0 && frameCount%80 == 0){
        makeEnemy("enemyType2");
    }

    if(frameCount != 0 && frameCount%110 == 0){
        makeEnemy("enemyType1");
    }

    if(frameCount != 0 && frameCount%130 == 0){
        makeEnemy("enemyType3");
    }



    //敵機shot
    if(frameCount != 0 && frameCount%12 == 0){
        for(i = 0; i < enemy.length; i++){
            enemy[i].shot();
            // enemyBombSound = new Audio("sound/bomb.mp3");
            // enemyShotSound.play();
        }
    }
    //敵機shot管理
    for(i = 0; i< bulletOfEnemyShot.length; i++){

        var x = bulletOfEnemyShot[i].position.x;
        var y = bulletOfEnemyShot[i].position.y;

        if(x > 360 || x < 0 || y > 480　|| y < 0){
            bulletOfEnemyShot.splice(i, 1);
        }else{
            bulletOfEnemyShot[i].move();
            enemyShotDraw(i);
        }
    }

    //敵機描画
    for(i = 0; i < enemy.length; i++){

        var x = enemy[i].position.x;
        var y = enemy[i].position.y;

        checkEnemyAlive(i);

        if(!enemy[i].alive){
            enemy.splice(i, 1);
            // enemyBombSound.play();
            //ヒット数増加
            hitCount++;
        }
        else if(x > 360 || x < 0 || y > 480　|| y < 0){
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
function makeEnemy(enemyType){
    enemy.push(new Enemy());
    enemy[enemy.length-1].init(enemyType);
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

