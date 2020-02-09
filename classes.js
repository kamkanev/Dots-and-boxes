class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
  }

  draw(){
    context.beginPath();
    context.fillStyle = "black";
    context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    context.fill();
    context.closePath();
  }

}

class Line {
  constructor(dot1, dot2, type, player = 0) {
    this.dot1 = dot1;
    this.dot2 = dot2
    this.type = type;
    this.player = player;
  }

  draw(colors){
    context.beginPath();

    if(this.type == 0){
      context.strokeStyle = "black";
      context.setLineDash([20, 5]);
    }else{
      context.setLineDash([1, 0]);
      context.strokeStyle = colors[this.player];
    }
    context.moveTo(this.dot1.x, this.dot1.y);
    context.lineTo(this.dot2.x, this.dot2.y);
    context.lineWidth = 10;
    context.stroke();
    context.closePath();
  }
}

class Box {
  constructor(d1, d2, d3, d4) {
    this.d1 = d1;
    this.d2 = d2;
    this.d3 = d3;
    this.d4 = d4;

    this.l1 = null;
    this.l2 = null;
    this.l3 = null;
    this.l4 = null;

    this.isFull = false;
    this.isMine = -1;
  }

  getPoints(){
    var p = 0;
    if(this.l1 != null){
      p++;
    }
    if(this.l2 != null){
      p++;
    }
    if(this.l3 != null){
      p++;
    }
    if(this.l4 != null){
      p++;
    }

    return p;
  }

  draw(colors){

    context.globalAlpha = 0.4;
    if(this.isMine < 0){
      context.fillStyle = "white";
    }else{
      context.fillStyle = colors[this.isMine];
    }
    context.fillRect(this.d1.x, this.d1.y, this.d3.x - this.d1.x, this.d3.y - this.d1.y);
    context.globalAlpha = 1;
  }

}
