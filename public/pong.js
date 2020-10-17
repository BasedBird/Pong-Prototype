//canvas painter
var canvas=document.querySelector('canvas');
var ctx=canvas.getContext('2d');

//paddle1
var paddlewidth1=20;
var paddleheight1=90;
var paddleY1=(canvas.height-200)/2;

//paddle2
//height controls the width
var paddlewidth2=20;
//width controls the height
var paddleheight2=90;
var paddleY2=(canvas.height-200)/2;

//keys pressed
var uppressed1=false;
var downpressed1=false;
var uppressed2=false;
var downpressed2=false;

//point
var score1 = 0;
var score2 = 0;

var ball = {
  radius: 10,
  dx: 2,
  dy: 2,
  x: 400,
  y: 400
};

//checks wheter key is pressed
document.addEventListener("keydown",keydownhandler1,false);
document.addEventListener("keyup",keyuphandler1,false);
document.addEventListener("keydown",keydownhandler2,false);
document.addEventListener("keyup",keyuphandler2,false);

this.socket = io();
this.socket.on('reset', function(scores) {
  console.log("score");
  ball.x = canvas.width/2 + 10;
  ball.y = canvas.height/2;
  score1 = scores.score1;
  score2 = scores.score2;
});
this.socket.on('playerMoved', function(y1) {
  console.log(y1);
  paddleY1 = y1;
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
    if(e.key=="Up"||e.key=="ArrowUp")
    {
        uppressed1=true;

    }
    if(e.key=="Down"||e.key=="ArrowDown")
    {
        downpressed1=true;
    }

}
function keyuphandler1(e)
{
    if(e.key=="Up"||e.key=="ArrowUp")
    {
        uppressed1=false;
    }
    if(e.key=="Down"||e.key=="ArrowDown")
    {
        downpressed1=false;
    }

}
//player2
function keydownhandler2(e)
{
    if(e.keycode==87)
    {
        uppressed2=true;

    }
    if(e.keycode==83)
    {
        downpressed2=true;
    }
}
function keyuphandler2(e)
{
    if(e.keycode==87)
    {
        uppressed2=false;
    }
    if(e.keycode==83)
    {
        downpressed2=false;
    }

}
//draws assets for game
//draws ball
function drawball()
{
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
    ctx.fillStyle="blue";
    ctx.fill();
    ctx.closePath();
}
//draws paddle for player 1
function drawpaddle1()
{
    ctx.beginPath();
    ctx.rect(canvas.width-790,paddleY1, paddlewidth1, paddleheight1);
    ctx.fillStyle="green";
    ctx.fill();
    ctx.closePath();

}
//draws paddle for player 2
function drawpaddle2()
{
    ctx.beginPath();
    ctx.rect(canvas.width-30,paddleY2, paddlewidth2, paddleheight2);
    ctx.fillStyle="orange";
    ctx.fill();
    ctx.closePath();

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
function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
//main function for where everything is drawn
function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawpaddle1();
    drawpaddle2();

    if(uppressed1)
    {
        paddleY1 -= 7;
        this.socket.emit('playerMovement', {y: paddleY1});
    }
    else if(downpressed1)
    {
        paddleY1 += 7;
        this.socket.emit('playerMovement', {y: paddleY1});
    }

    drawball();
}
disableScroll();
setInterval(draw, 10);
