// Creating variables
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

var red = 0;
var players = 2;
var currPlayer = red%players;
var colors = ["#f00", "#00f", "#0f0", "#ff0"];
const N = 4;

var myX = 0, myY = 0;
var dots = [];
var boxes = [];

createBoard(N);

var lines = [];
var currLine = new Line(dots[0][0], dots[0][1], 0);

function update() {
    // myX = myX+(mouseX-myX)/10;
    // myY = myY+(mouseY-myY)/10;



}

function draw() {
    // This is how you draw a rectangle

    for (var i = 0; i < boxes.length; i++) {
      for (var j = 0; j < boxes[i].length; j++) {
        boxes[i][j].draw(colors);
      }
    }

    //context.fillRect(myX, myY, 30, 30);

    currLine.draw(colors);

    for (var i = 0; i < lines.length; i++) {
      lines[i].draw(colors);
    }

    for (var i = 0; i < dots.length; i++) {
      for (var j = 0; j < dots[i].length; j++) {
        dots[i][j].draw();
      }
    }

};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    for (var i = 0; i < dots.length-1; i++) {
      for (var j = 0; j < dots[i].length; j++) {
        if(mouseX > dots[i][j].x + dots[i][j].r && mouseX < dots[i+1][j].x - dots[i+1][j].r &&
           mouseY >= dots[i][j].y - dots[i][j].r && mouseY <= dots[i+1][j].y + dots[i+1][j].r && !LineExists(dots[i][j], dots[i+1][j])){
          lines.push(new Line(dots[i][j], dots[i+1][j], 1, currPlayer));
          getAllBoxesByDots(dots[i][j], dots[i+1][j])
          red++;
          currPlayer = red%players;
          BoxReady();

        }else if(mouseX > dots[j][i].x - dots[j][i].r && mouseX < dots[j][i+1].x + dots[j][i+1].r &&
           mouseY >= dots[j][i].y + dots[j][i].r && mouseY <= dots[j][i+1].y - dots[j][i+1].r && !LineExists(dots[j][i], dots[j][i+1])){
          lines.push(new Line(dots[j][i], dots[j][i+1], 1, currPlayer));
          getAllBoxesByDots(dots[j][i], dots[j][i+1]);
          red++;
          currPlayer = red%players;
          BoxReady();

        }
      }
    }
    //console.log("Mouse clicked at", mouseX, mouseY);
};

function mousedown() {
    // Show coordinates of mouse on click
    //console.log("Mouse clicked at", mouseX, mouseY);
};

function mousemove() {
    // Show coordinates of mouse on click
    for (var i = 0; i < dots.length-1; i++) {
      for (var j = 0; j < dots[i].length; j++) {
        if(mouseX > dots[i][j].x + dots[i][j].r && mouseX < dots[i+1][j].x - dots[i+1][j].r &&
           mouseY >= dots[i][j].y - dots[i][j].r && mouseY <= dots[i+1][j].y + dots[i+1][j].r){
          currLine = new Line(dots[i][j], dots[i+1][j], 0);
        }else if(mouseX > dots[j][i].x - dots[j][i].r && mouseX < dots[j][i+1].x + dots[j][i+1].r &&
           mouseY >= dots[j][i].y + dots[j][i].r && mouseY <= dots[j][i+1].y - dots[j][i+1].r){
          currLine = new Line(dots[j][i], dots[j][i+1], 0);
        }
      }
    }
    //console.log("Mouse clicked at", mouseX, mouseY);
};

function BoxReady() {
  var br = 0;
  var lP = 0;
  for (var i = 0; i < boxes.length; i++) {
    for (var j = 0; j < boxes[i].length; j++) {
      var box = boxes[i][j];
      if(box.l1 != null && box.l2 != null && box.l3 != null && box.l4 != null && !box.isFull){
        box.isFull = true;
        box.isMine = box.l4.player;
        lP = box.l4.player;
        br++;
      }
    }
  }

  if(br>0){
    updateGameScore(lP);
    currPlayer = lP;
    red--;
  }
}

function createBoard(n) {
  var diff = (WIDTH) / (n);
  for(var i = 0; i <n; i++){
    dots[i] = [];
    for (var j = 0; j < n; j++) {
      var x = diff * (i%n) + diff/2;
      var y = diff * (j%n) + diff/2;
      dots[i][j] = new Dot(x, y);
    }
  }

  createBoxes(n-1);
}

function createBoxes(n) {
  for (var i = 0; i < n; i++) {
    boxes[i] = [];
    for(var j = 0; j < n; j++){
      boxes[i][j] = new Box(dots[i][j], dots[i+1][j], dots[i+1][j+1], dots[i][j+1]);
    }
  }
}

function getAllBoxesByDots(d1, d2) {

  var bs = [];
  for (var i = 0; i < boxes.length; i++) {
    for (var j = 0; j < boxes[i].length; j++) {
      var box = boxes[i][j];
      if(box.d1 == d1 || box.d2 == d1 || box.d3 == d1 || box.d4 == d1){
        if(box.d1 == d2 || box.d2 == d2 || box.d3 == d2 || box.d4 == d2){

            if(box.l1 == null){
              box.l1 = new Line(d1, d2, 1, currPlayer);
            }else if(box.l2 == null){
              box.l2 = new Line(d1, d2, 1, currPlayer);
            }else if(box.l3 == null){
              box.l3 = new Line(d1, d2, 1, currPlayer);
            }else if(box.l4 == null){
              box.l4 = new Line(d1, d2, 1, currPlayer);
            }
              bs.push(box);
        }
      }
    }
  }

  return bs;
}

function getPointsByBoxes(pl) {
  var br = 0;
  for (var i = 0; i < boxes.length; i++) {
    for (var j = 0; j < boxes[i].length; j++) {
      var box = boxes[i][j];
      if(box.isMine == pl){
        br++;
      }
    }
  }

  return br;
}

function updateGameScore(plId) {
  document.getElementById(""+plId+"").removeChild(document.getElementById(""+plId+"").childNodes[0]);
  var txtNode = document.createTextNode("Player "+plId+ " : "+ getPointsByBoxes(plId));

  document.getElementById(""+plId+"").appendChild(txtNode);
}

function LineExists(d1, d2) {
  for (var i = 0; i < lines.length; i++) {
    if(lines[i].dot1 == d1 && lines[i].dot2 == d2){
      return true;
    }
  }

  return false;
}

function gameEnd() {
  var br = 0;
  for (var i = 0; i < boxes.length; i++) {
    for (var j = 0; j < boxes[i].length; j++) {
      var box = boxes[i][j];

        if(box.isFull){
          br++;
        }
    }
  }

if(br >= boxes.length*boxes.length){
  console.log(br);
  return true;
}

return false;

}
