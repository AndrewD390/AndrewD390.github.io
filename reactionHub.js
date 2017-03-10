// GLOBAL VARIABLES
var pages = ["home", "test"];
var shapes = ["Triangle", "Rectangle", "Circle", "Oval"]; // Feel free to add or remove these shapes.
                                                          // Available Shapes ["Triangle", "Rectangle", "Circle", "Oval"]

// GAMEMODE
var gamemode;
function toGamemode(currentPage, gamemode) {
  toPage(currentPage,'test');
  resetTimer();
  var func = window[gamemode];
  if(typeof func === "function")func();
}

function normal () {
  gamemode = "normal";
  var delay = Math.floor(Math.random()*3000);
  setTimeout(randShape, delay);
  setTimeout(startTimer, delay);
}


// LOCATION
function toPage(from, to) {
  vanish(from);
  clearShape();
  resetTimer();
  appear(to);
}

function reset(from, to) {
  resetTimer();
  toPage(from, to);
}

// DISPLAY
function clear () {
  for (var page in pages) {
    document.getElementById(pages[page]).style.display = 'none';
  }
}

function vanish (show) {
  if(document.getElementById(show) === null) {
    return;
  }
  document.getElementById(show).style.display = 'none';
}

function appear (show) {
  if(document.getElementById(show) === null) {
    document.getElementById('home').style.display = 'block';
    return;
  }
  document.getElementById(show).style.display = 'block';
}


//CORDS
function setPosition(id) {
  var shape = document.getElementById(id);
  var xSize = Math.floor(Math.random()*15)+5;
  var ySize = Math.floor(Math.random()*15)+5;
  shape.style.position = "absolute";
  shape.style.left = setPosX(xSize) + "%";
  shape.style.top = setPosY(ySize) + "%";
  shape.style.width = xSize + "%";
  shape.style.height = ySize + "%";
  shape.style.display = "block";
  shape.style.backgroundColor = randColor();
}

function setPosX(sizeX) {
  var fill = 1-(sizeX/80);
  return Math.floor(Math.random()*fill*80)+20;
}

function setPosY(sizeY) {
  var fill = 1-(sizeY/80);
  return Math.floor(Math.random()*fill*80)+20;
}


// COLOR
function randColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


// SHAPE
function randShape() {
  var rand = Math.random();
  var slope = 1/shapes.length;
  for(var shape in shapes) {
    shape++;
    if(rand <= slope*shape) {
      var func = window["create" + shapes[shape-1]];
      if(typeof func === "function")func();
      return;
    }
  }
}

function createRectangle() {
  var shape = document.getElementById("Rectangle");
  setPosition("Rectangle");
}

function createCircle() {
  var shape = document.getElementById("Circle");
  setPosition("Circle");
  shape.style.borderRadius = 100 + "%";
}

function createOval() {
  var shape = document.getElementById("Oval");
  setPosition("Oval");
  shape.style.borderRadius = Math.random()*100+"% " + Math.random()*100+"% " + Math.random()*100+"% " + Math.random()*100+"%";
}

function createTriangle() {
  var shape = document.getElementById("Triangle");
  var size = Math.floor(Math.random()*60)+40;
  setPosition("Triangle");
  shape.style.width = 0+"px";
  shape.style.height = 0+"px";
  shape.style.borderTop = size + "px solid #99ccff";
  shape.style.borderBottom = size + "px solid #99ccff";
  shape.style.borderLeft = size + "px solid #99ccff";
  var direction = Math.floor(Math.random()*2.99);
  switch(direction) {
    case 0:
      shape.style.borderTopColor = randColor();
      break;
    case 1:
      shape.style.borderBottomColor = randColor();
      break;
    case 2:
      shape.style.borderLeftColor = randColor();
      break;
  }
}

function clearShape() {
  for(var shape in shapes) {
    document.getElementById(shapes[shape]).style.display = "none";
  }
}

// TIME
var timer=0;
function startTimer() {
  var begin = new Date();
  timer = begin.getTime();
}

function endTimer() {
  var end = new Date();
  timer -= end.getTime();
  timer = Math.abs(timer)/1000;
}

function resetTimer() {
  var currentTime = document.getElementById("current");
  var average = document.getElementById("average");
  totalClicks = 0;
  timer=0;
  currentTime.innerHTML = 0;
  average.innerHTML = 0;
}

// CLICK
var totalClicks = 0;
function clicked(shape) {
  endTimer();
  var shape = document.getElementById(shape);
  var currentTime = document.getElementById("current");
  var average = document.getElementById("average");
  currentTime.innerHTML = timer;
  average.innerHTML = Math.round(1000*((parseFloat(average.innerHTML)*totalClicks + timer)/(++totalClicks)))/1000;
  shape.style.display = "none";
  var func = window[gamemode];
  if(typeof func === "function")func();
}