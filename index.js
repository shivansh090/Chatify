const express = require('express')
const path = require("path");
const app=express();

const server= require("http").createServer(app);
const io= require("socket.io")(server)
app.use(express.static(path.join(__dirname+"/public")))
const users={}
const conn={}
io.sockets.on('connection', socket=>{
    socket.on('new-user-joined',data=>{ 
      socket.join(data.roomid);// Just added this for joining a particular room
      console.log(data.roomid);
        users[socket.id]=data.namee;
        conn[socket.id]=data.roomid;
        socket.to(data.roomid).emit('user-joined',data.namee);
    })   
    socket.on('send',(data)=>{
        socket.to(data.roomid).emit('receive', {message:data.msg,name:data.namee/*users[socket.id]*/})
    })
  socket.on('disconnect',()=>{
    socket.to(conn[socket.id]).emit('left',users[socket.id]);
    delete users[socket.id];
  })
})

server.listen(process.env.PORT ||3000);
