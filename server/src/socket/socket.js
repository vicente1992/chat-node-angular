let connectedUsers = [];


const userFind = (id = null) => {
  return connectedUsers.find(user => user.id === id)
}
exports.init = (io = {}) => {
  io.on('connection', async (socket) => {
    console.log('Conexión de socket', socket.id)
    socket.on('loggedin', (data = {}) => {
      if (!data) return
      data.hash = socket.id
      connectedUsers = connectedUsers.filter(item => item.id != data.id);
      connectedUsers.push(data)
      io.emit('updateUserList', connectedUsers)
      io.to(data.hash).emit('loggedin', data)
    });

    socket.on('createRoom', (data) => {
      const { userTo = null } = data
      socket.join(data.room);
      io.to(data.room).emit('invite', data)
      io.to(userTo.hash).emit('invite', data)

    });

    socket.on('joinRoom', (data) => {
      socket.join(data.room);
    });

    socket.on('message', (data) => {
      const userTo = userFind(data.to)
      data.userTo = userTo
      io.to(data.room).emit('message', data)
    })

    socket.on('logout', (data) => {
      connectedUsers = connectedUsers.filter(item => item.id !== data.id);
      console.log('Usuarios activos', connectedUsers)
      io.emit('updateUserList', connectedUsers)
    })

    socket.on('disconnect', (reason) => {
      console.log('disconnect', socket.id)
      connectedUsers = connectedUsers.filter(item => item.hash !== socket.id);
      io.emit('updateUserList', connectedUsers)
    });

  })
}