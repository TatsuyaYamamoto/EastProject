window.onload = function(){

    // スクリーンの初期化、canvas2dコンテキストの登録
    gameScreen = document.getElementById('screen');
    screenContext = gameScreen.getContext("2d");

    //イベントの登録
    window.addEventListener("keydown", keyDown, true);
    window.addEventListener("keyup", keyUp, true);

    //トップ画面のステータスにする
    topState();
}

