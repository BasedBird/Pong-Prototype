//canvas painter
var canvas=document.querySelector('canvas');
var ctx=canvas.getContext('2d');


var paddleOne = {
  width: 20,
  height: 90,
  y: (canvas.height-200)/2,
  x: canvas.width-790
}

var paddleTwo = {
  width: 20,
  height: 90,
  y: (canvas.height-200)/2,
  x: canvas.width-30
}

var ball = {
  radius: 10,
  dx: 2,
  dy: 2,
  x: 400,
  y: 400
};

//keys pressed
var uppressed=false;
var downpressed=false;
var Wpressed=false;
var Spressed=false;
var spacepressed=false;

//point
var score1 = 0;
var score2 = 0;

//checks wheter key is pressed
document.addEventListener("keydown",keydownhandler1,false);
document.addEventListener("keyup",keyuphandler1,false);

this.socket = io();
this.socket.on('scored', function(scores) {
  score1 = scores.score1;
  score2 = scores.score2;
});
this.socket.on('player1Moved', function(y) {
  paddleOne.y = y;
});
this.socket.on('player2Moved', function(y) {
  paddleTwo.y = y;
});
this.socket.on('updateBall', function(otherBall) {
  ball.x = otherBall.x;
  ball.y = otherBall.y;
  ball.dx = otherBall.dx;
  ball.dy = otherBall.dy;
});

//functions for what to do when the key is pressed or not
//player1
function keydownhandler1(e)
{
  console.log(e);
    if(e.key=="Up"||e.key=="ArrowUp")
    {
        uppressed=true;
    }
    if(e.key=="Down"||e.key=="ArrowDown")
    {
        downpressed=true;
    }
    if(e.key=="w")
    {
        Wpressed=true;
    }
    if(e.key=="s")
    {
        Spressed=true;
    }
    if(e.key==" ")
    {
        spacepressed=true;
    }
}
function keyuphandler1(e)
{
console.log(e + "up");
    if(e.key=="Up"||e.key=="ArrowUp")
    {
        uppressed=false;
    }
    if(e.key=="Down"||e.key=="ArrowDown")
    {
        downpressed=false;
    }

    if(e.key=="w")
    {
        Wpressed=false;

    }

    if(e.key=="s")
    {

        Spressed=false;
    }
    if(e.key==" ")
    {
        spacepressed=false;
    }
}
this.socket.emit('spce',spacepressed);
//draws assets for game
//draws ball
function drawball()
{
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
    ctx.fillStyle="#ecf1f4";
    ctx.fill();
    ctx.closePath();
}
//draws paddle for player 1
function drawpaddle(paddle)
{
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle="#ABD1F3";
    ctx.fill();
    ctx.closePath();
}

function movementp1()
{
    if(uppressed)
    {
        paddleOne.y-=7;
        this.socket.emit('player1Movement', paddleOne.y);
    }
    if(downpressed)
    {
        paddleOne.y+=7;
        this.socket.emit('player1Movement', paddleOne.y);
    }
}
function movementp2()
{
    if(Wpressed)
    {
        paddleTwo.y-=7;
        this.socket.emit('player2Movement', paddleTwo.y);
    }
    if(Spressed)
    {
        paddleTwo.y+=7;
        this.socket.emit('player2Movement', paddleTwo.y);
    }
}
//keeps track of score
function drawScore()
{
  var score1Text = canvas.getContext("2d");
  score1Text.font = "30px Arial";
  ctx.fillText(score1.toString(), 10,50);
  var score2Text = canvas.getContext("2d");
  score2Text.font = "30px Arial";
  ctx.fillText(score2.toString(), 50,50);
}

//main function for where everything is drawn
function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawball();
    drawpaddle(paddleOne);
    drawpaddle(paddleTwo);
    movementp1();
    movementp2();

}

setInterval(draw, 10);
