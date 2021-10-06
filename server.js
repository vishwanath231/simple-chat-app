const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const colors = require('colors');


const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/user');
const formatMessage = require('./utils/message');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());

const server = http.createServer(app);


const io = new Server(server, {
    cors:{
        origin:'*'
    }
});

const botName = 'ChatCord Bot';

io.on("connection", (socket) => {

    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)
    
        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

        // Broadcast when a user connects
        socket.broadcast
        .to(user.room)
        .emit(
            'message',
            formatMessage(botName, `${user.username} has joined the chat`) 
        );

        io.to(user.room).emit('roomUser', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

    })

    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    })


    socket.on('disconnect', () => {

        const user = userLeave(socket.id);

        if (user) {
            socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(botName, `${user.username} has left the chat`) 
            );
            io.to(user.room).emit('roomUser', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    })
})



const PORT = process.env.PORT || 5000;

server.listen(PORT, (req, res) => {
    console.log(`server running a ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.bgYellow.bold);
})

