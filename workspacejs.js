var demo = document.getElementById("demo"),
    matrix = document.getElementById("matrix"),
    base = document.getElementById("base"),
    mat = new Array(),
    rotationL = 0,
    rotationR = 0;

// Positioning Base
var parWidth = window.getComputedStyle(base.parentNode).width;
parWidth = parWidth.slice(0, parWidth.length-2);
var baseWidth = window.getComputedStyle(base).width;
baseWidth = baseWidth.slice(0, baseWidth.length-2);
base.style.left = (parWidth/2) - (baseWidth/2)  + "px";

// Filling matrix
function newLine(){
  var line = new Array();
  for (var i = 0; i < 55; i++){
    var led = document.createElement("div");
    led.onclick = function(){onOff(this)};
    led.className = "led off";
    matrix.appendChild(led);
    line[i] = led;
  }
  return line;
}
for (var i = 0; i < 11; i++)
  mat[i] = newLine();
      rotationR =  setInterval(function(){moveRight()},250);
      clearInterval(rotationL);
      rotationL = 0;

// Tturning on/off
function onOff (led) {
  if (led.className == "led off")
    led.className = "led";
  else 
    led.className = "led off"
}

function write (arr) {
  var i = 0;
  while (i < arr.length){
    mat[arr[i++]][arr[i++]].className = "led";
  }
}

var ons = new Array(0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,10,0,11,0,12,0,17,0,18,0,21,0,22,0,23,0,27,0,28,0,32,0,33,0,34,1,3,1,4,1,5,1,6,1,7,1,8,1,9,1,10,1,11,1,12,1,16,1,19,1,21,1,24,1,26,1,29,1,31,1,37,1,40,2,1,2,2,2,3,2,4,2,5,2,6,2,7,2,8,2,9,2,10,2,11,2,12,2,13,2,14,2,16,2,19,2,21,2,22,2,23,2,26,2,29,2,31,2,37,2,40,3,16,3,17,3,18,3,19,3,21,3,22,3,26,3,27,3,28,3,29,3,32,3,33,3,34,3,37,3,38,3,39,3,40,4,4,4,11,4,16,4,19,4,21,4,23,4,26,4,29,4,35,4,37,4,40,5,3,5,4,5,5,5,10,5,11,5,12,5,16,5,19,5,21,5,24,5,26,5,29,5,35,5,37,5,40,6,32,6,33,6,34,7,2,7,6,7,9,7,13,8,1,8,2,8,5,8,6,8,9,8,10,8,13,8,14,8,16,8,17,8,19,8,20,8,35,8,36,8,39,8,40,8,42,8,43,9,1,9,2,9,3,9,4,9,5,9,6,9,9,9,10,9,11,9,12,9,13,9,14,9,22,9,25,9,27,9,29,9,31,9,34,9,37,9,46,9,48,9,51,9,53,10,2,10,3,10,4,10,5,10,6,10,9,10,10,10,11,10,12,10,13);
write (ons);

function getCoords () {
  var coords = new Array(); 
  for ( var i = 0; i < mat.length; i++) 
    for ( var j = 0; j < mat[i].length; j++) 
      if (mat[i][j].className == "led") {
        coords.push(i);
        coords.push(j);
      }
  demo.innerHTML = coords;
}

function stop () {
  clearInterval(rotationL);
  clearInterval(rotationR);
  rotationL = 0;
  rotationR = 0;
}

function rotate(dir) {
    if (dir == "left" && rotationL == 0){
      rotationL =  setInterval(function(){moveLeft()},250);
      clearInterval(rotationR);
      rotationR = 0;
    }
    else if (dir == "right" && rotationR == 0){
      rotationR =  setInterval(function(){moveRight()},250);
      clearInterval(rotationL);
      rotationL = 0;
    }
}

function moveLeft(){
  for (var i = 0; i < mat.length; i++){
    var first = mat[i][0].className;
    for ( var j = 0; j < mat[i].length-1; j++) 
      mat[i][j].className = mat[i][j+1].className;
    mat[i][mat[i].length-1].className = first;
  }
}

function moveRight(){
  for (var i = 0; i < mat.length; i++){
    var last = mat[i][mat[i].length-1].className;
    for (var j = mat[i].length-1; j > 0; j--) 
      mat[i][j].className = mat[i][j-1].className;
    mat[i][0].className = last;
  }
}

function clearM() {
  for ( var i = 0; i < mat.length; i++) 
    for ( var j = 0; j < mat[i].length; j++) 
      mat[i][j].className = "led off";
}

function fill() {
    for ( var i = 0; i < mat.length; i++) 
    for ( var j = 0; j < mat[i].length; j++) 
      mat[i][j].className = "led";
}
