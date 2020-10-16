var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require('socket.io').listen(server);
var port = 8324;
var players = {};
var y1

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('user connected');
  players[socket.id] = {
    playerId: socket.id
  }
  socket.on('playerMovement', function(moveData) {
    console.log(moveData);
    y1 = moveData.y;
    socket.broadcast.emit('playerMoved', y1)
  })
})

server. listen(port, function() {
  console.log("Listening on: " + port);
});
