const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

// ROUTES IMPORT
const routes = require('./routes/routes');


app.use(cors({
    origin: ['*'],
    credentials: true // enable set cookie
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'chat app',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        expires: 600000
    }
}));
app.use(routes);

// SOCKETS INIT
const socketService = require('./services/socket.service');
const socketIo = require('socket.io');
const http = require('http').Server(app);
const io = socketIo(http);
socketService(io);

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});