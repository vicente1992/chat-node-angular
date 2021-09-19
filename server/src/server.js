const express = require('express')
const cors = require('cors')
const app = express()


const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});
const socket = require('./socket/socket');
socket.init(io)

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la api'
  })
})



const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('🐱‍🏍 API lista por el puerto ', PORT)
})