var canvas, canvasContext;

var ballX = 50;
var ballXSpeed = 10;
var ballY = 50;
var ballYSpeed = 5;

const BAT_HEIGHT = 100;
const BAT_THICK = 10;
var bat1Y = 250;
var bat2Y = 250;

window.onload = function (){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    var FPS = 30;
    setInterval(function() {
        moveElements();
        drawCanvas();
    }, 1000/FPS);

    canvas.addEventListener("mousemove",
    function(event) {
        var mousePosition = findMousePosition(event);
        bat1Y = mousePosition.y -(BAT_HEIGHT/2);
    });
}

function findMousePosition(event){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

function moveElements() {
    ballX = ballX + ballXSpeed;
    ballY = ballY + ballYSpeed;
    //ballXSpeed = ballXSpeed + 1;

    //go left
    if (ballX >= canvas.width) {
        if (ballY > bat2Y && ballY < bat2Y + BAT_HEIGHT) {
            ballXSpeed = -ballXSpeed;
        } else {
            reset();
        }
    }
    //go right
    if (ballX <= 0) {
        if (ballY > bat1Y && ballY < bat1Y + BAT_HEIGHT) {
            ballXSpeed = -ballXSpeed;
        } else {
            reset();
        }
    }
    //go up
    if (ballY >= canvas.height) {
        ballYSpeed = -ballYSpeed;
    }
    //go down
    if (ballY <= 0) {
        ballYSpeed = -ballYSpeed;
    }
}

function drawCanvas() {
    createRectangle(0, 0, canvas.width, canvas.height, "black"); //full canvas
    createRectangle(0, bat1Y, BAT_THICK, BAT_HEIGHT, "white"); //bat1
    createRectangle(canvas.width-BAT_THICK, bat2Y, BAT_THICK, BAT_HEIGHT, "white"); //bat2
    createBall(ballX, ballY, 10, "white"); //ball
    
}

function createBall(centerX, centerY, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true); //0 to 360 c.clock
    canvasContext.fill();
}

function createRectangle(leftX, topY, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);
}

function reset() {
    ballXSpeed = -ballXSpeed; //reverse direction after each reset
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}