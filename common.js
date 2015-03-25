//座標管理用コンストラクタ
function Position(){
	this.x = 0;
	this.y = 0;
}

Position.prototype.distance = function(target){
	var d = new Position();
	d.x = this.x - target.position.x;
	d.y = this.y - target.position.y;

	var length = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.y, 2));
	return length;
}