const express = require('express');
const cors = require('cors');
const path = require('path');


const socketConstroller = require('../sockets/socketController')

class Server {

    constructor() {
        //inits
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);

        this.io = require('socket.io')(this.server)
        this.paths = {};

        this.sockets();
        this.middlewares();
        this.routes();
    }

    middlewares() {

        //Public Folders
        this.app.use(express.static(path.join(__dirname, '../public')));

        //cors
        this.app.use(cors());

        //lectura y parseo de el body 
        this.app.use(express.json());

    }

    routes() {

        this.app.get('/', (req, res) => {
            res.json({
                msg: '/'
            })
        });

        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/PageNotFound.html'));
        });
    }


    sockets() {
        this.io.on('connect', socketConstroller)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}


module.exports = Server