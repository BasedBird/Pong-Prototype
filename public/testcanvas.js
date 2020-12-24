var penguin=new Image();

var canvas=document.querySelector('canvas');
var ctx=canvas.getContext('2d');
function init()
{
    penguin.src='C:/Users/audrey/Documents/Web/JS/penguin.png';
    window.requestAnimationFrame(draw);
}

function draw()
{
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(penguin,500,500);

}

init();