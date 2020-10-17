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
var uppressed=false;
var downpressed=false;

var Xpos=canvas.width-30;
var Ypos=0;
var Wpressed=false;
var Spressed=false;


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

this.socket = io();
this.socket.on('scored', function(scores) {
  score1 = scores.score1;
  score2 = scores.score2;
});
this.socket.on('player1Moved', function(y1) {
  paddleY1 = y1;
});
this.socket.on('player2Moved', function(y2) {
  paddleY2 = y2;
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
    ctx.rect(Xpos,paddleY2, paddlewidth2, paddleheight2);
    ctx.fillStyle="orange";
    ctx.fill();
    ctx.closePath();

}

//collsion with paddle
function ballhitp1()
{
    if(ball.x+ball.dx>canvas.width-ball.radius)
    {
        if(ball.x>paddleY1&&x<paddleY1-paddlewidth1)
        {
            ball.dy-=ball.dy;
        }
    }

}
function ballhitp2()
{
}

function movementp1()
{
    if(uppressed)
    {
        paddleY1-=7;
        this.socket.emit('player1Movement', paddleY1);
    }
    if(downpressed)
    {
        paddleY1+=7;
        this.socket.emit('player1Movement', paddleY1);
    }
}
function movementp2()
{
    if(Wpressed)
    {
        paddleY2-=7;
        this.socket.emit('player2Movement', paddleY2);
    }
    if(Spressed)
    {
        paddleY2+=7;
        this.socket.emit('player2Movement', paddleY2);
        console.log("hi")
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
    drawball();
    drawpaddle1();
    drawpaddle2();
    ballhitp1()
    movementp1();
    movementp2();

}
disableScroll();
setInterval(draw, 10);
