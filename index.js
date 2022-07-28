const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const PORT = 3004

var path = require('path')

app.use(express.static(path.join(__dirname, '')));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/getMessage', (req, res) => {
    res.sendFile(__dirname + '/message.js')
})

io.on('connection', (socket)=>{
    console.log('user connected');
    socket.on('on-chat', data => {
        io.emit('user-chat', data)
    })
})

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})
