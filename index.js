const express = require('express')
const path = require("path");
const app=express();

const server= require("http").createServer(app);
const io= require("socket.io")(server)
app.use(express.static(path.join(__dirname+"/public")))
const users={}

io.on('connection', socket=>{
    socket.on('new-user-joined',namee=>{ 
        users[socket.id]=namee;
        socket.broadcast.emit('user-joined',namee);
    })   
    socket.on('send',message=>{
        socket.broadcast.emit('receive', {message:message,name:users[socket.id]})
    })
  socket.on('disconnect',message=>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
  })
})

server.listen(process.env.PORT ||3000);