const groupsSocket = require('./groups/groups-socket.service');
const usersSocket = require('./users/user-socket.service');


module.exports = io => {

    const onlineUsers = [];

    io.on('connection', socket => {
        console.log('a user connected');
        console.log(socket);

        // handle socket disconnection
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


        // groups socket events
        groupsSocket(io, socket);

        // users socket events
        usersSocket(io, socket);
    });
}

