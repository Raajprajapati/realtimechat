const io = require('socket.io')(8000);

const users = {};

io.on('connection', socket =>{
    socket.on('newUser', name=>{
        users[socket.id]=name;
        socket.broadcast.emit('userJoined', name)

    })
    // send event given by the client
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    })

    socket.on('disconnect', () =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
