var canvas, canvasContext;
var ballX = 50;
var ballXSpeed = 5;

window.onload = function (){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    var FPS = 30;
    setInterval(function() {
        moveElements();
        drawCanvas();
    }, 1000/FPS);
}

function moveElements() {
    ballX = ballX + ballXSpeed;
    //ballXSpeed = ballXSpeed + 1;

    //to left
    if (ballX >= canvas.width) {
        ballXSpeed = -ballXSpeed;
    }

    //to right
    if (ballX <= 0) {
        ballXSpeed = -ballXSpeed;
    }
}

function drawCanvas() {
    makeElement(0,0,canvas.width,canvas.height,"black"); //full canvas
    makeElement(0,210,10,100,"white"); //bat
    makeElement(ballX,100,10,10,"red"); //ball
}

function makeElement(leftX,topY,width,height,color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX,topY,width,height);
}