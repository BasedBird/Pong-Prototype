var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require('socket.io').listen(server);

var port = 8324;

var canvas = {
  width: 800,
  height: 800
}

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

var scores = {
  score1: 0,
  score2: 0
}

var ball = {
  radius: 10,
  dx: 2,
  dy: 2,
  x: 400,
  y: 400
}

var canvas = {
  width: 800,
  height : 800
}


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('player1Movement', function(moveData) {
    paddleOne.y = moveData;
    socket.broadcast.emit('player1Moved', moveData);
  })
  socket.on('player2Movement', function(moveData) {
    paddleTwo.y = moveData;
    socket.broadcast.emit('player2Moved', moveData);
  })
})

setInterval(() => {
  io.emit('updateBall', ball);
  if(ball.y + ball.dy > canvas.height-ball.radius || ball.y + ball.dy < ball.radius) {
    ball.dy=-ball.dy;
  }
  if(ball.x - ball.dx + ball.radius < 0)
  {
    scores.score1 += 1;
    io.emit('scored', scores);
    ball.x = 400;
    ball.y = 400;
  }
  if(ball.x + ball.dx - ball.radius > canvas.width)
  {
    scores.score2 += 1;
    io.emit('scored', scores);
    ball.x = 400;
    ball.y = 400;
  }
  ball.x-=ball.dx;
  ball.y+=ball.dy;
  ballhitp1();
  ballhitp2();
}, 10);

server. listen(port, function() {
  console.log("Listening on: " + port);
});

function ballhitp1()
{
  if (ball.x + ball.dx + ball.radius < paddleOne.x + paddleOne.width)
  {
    if (ball.y < paddleOne.y + paddleOne.height && paddleOne.y < ball.y)
    {
      ball.x = paddleOne.x + paddleOne.width + 1;
      ball.dx = -ball.dx
    }
  }
}
function ballhitp2()
{
  if (ball.x + ball.dx - ball.radius > paddleTwo.x)
  {
    if (ball.y < paddleTwo.y + paddleTwo.height && paddleTwo.y < ball.y)
    {
      ball.x = paddleTwo.x - 1;
      ball.dx = -ball.dx
    }
  }
}
