
//Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 4)
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

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
      io.emit('user name',username)
      users[socket.id] = username;
      console.log(username+ ': connected');
      io.emit('user list',users);
      console.log('UserList: ',users);
    });
    socket.on('disconnect', () => {
      console.log(users[socket.id] + ': disconnected');
      io.emit('user left',users[socket.id]+' left');
      delete users[socket.id];
      io.emit('user list',users);
      console.log('UserList: ',users);
    });
  });


  http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
  });
