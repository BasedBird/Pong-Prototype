var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require('socket.io').listen(server);
var port = 8324;

var players = {};
var scores = {
  score1: 0,
  score2: 0
};
var ball = {
  radius: 10,
  dx: 2,
  dy: 2,
  x: 400,
  y: 400
};
var canvas = {
  width: 800,
  height : 800
};


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('user connected');
  players[socket.id] = {
    playerId: socket.id
  }
  socket.on('player1Movement', function(moveData) {
    console.log(moveData)
    socket.broadcast.emit('player1Moved', moveData);
  })
  socket.on('player2Movement', function(moveData) {
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
}, 10);

server. listen(port, function() {
  console.log("Listening on: " + port);
});
