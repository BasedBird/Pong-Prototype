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

//ball
var ballradius=10;

//keys pressed 
var uppressed1=false;
var downpressed1=false;
var uppressed2=false;
var downpressed2=false;

//speed
var dx=2;
var dy=2;


//x and y
//x is - means left and + means right
var x=canvas.width-paddlewidth1-15;
//y is + means left and - means right
var y=canvas.height/2;

//point
var score1=0;
var score2=0;

//checks wheter key is pressed
document.addEventListener("keydown",keydownhandler1,false);
document.addEventListener("keyup",keyuphandler1,false);
document.addEventListener("keydown",keydownhandler2,false);
document.addEventListener("keyup",keyuphandler2,false);


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
    ctx.arc(x,y,ballradius,0,Math.PI*2);
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
function countscore()
{

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
    drawball();
    drawpaddle1();
    drawpaddle2();

    //sets top and bottom bounds and allows the ball to bounce off boundaries
    if(y + dy > canvas.height-ballradius || y + dy < ballradius) {
        dy=-dy;
    }

    if(uppressed1)
    {
        paddleY1+=7;
        /*
        if(paddleY1+paddleheight1>canvas.height)
        {
            paddleY1=canvas.height-paddleY1;
        }
        */
    }
    else if(downpressed1)
    {
        paddleY1-=7;
      
    }



 
    x-=dx;
    y+=dy;
    
}
disableScroll();
setInterval(draw, 10);
