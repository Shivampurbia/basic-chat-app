
//Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 4)
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } =  require("socket.io");
const io = new Server(server);

const users = {}

//We define a route handler / that gets called when we hit our website home.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message',msg);
    });  

    socket.on('user name',(username)=>{
      console.log(username+' connected');
      io.emit('user name',username);
  });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });



server.listen(3000,()=>{
    console.log('listening on port :3000');
})
