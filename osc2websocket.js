var osc = require('node-osc');
var express = require('express');
//var monitorio = require('monitor.io');

var sendingPort = 8081;
var listeningPort = 3333;

var app = express();
var server = app.listen(sendingPort);

console.log('forwarding messages to socket.io on http://127.0.0.1:'+ sendingPort);

//websockets
var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', function (socket) {
  console.log('connection: ' + socket.id);
 // console.log(socket);

});


var oscServer, oscClient;

//var ip = '127.0.0.1';
var ip = '10.0.1.2';
//this is where we are listening for OSC messages
console.log('listening to OSC messages on ' + ip + ':'+ listeningPort);
 oscServer = new osc.Server(listeningPort, ip);
 console.log('created server');
  oscServer.on('message', function(msg, rinfo) {
      console.log(msg, rinfo);
    //console.log(msg[0]);
      io.sockets.emit("muse", msg);
    });



