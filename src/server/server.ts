
import express,{Application} from 'express';
import cors from 'cors';

import {Socket} from 'socket.io'
import * as http from 'http'
import * as socket from 'socket.io';

export let ioserver:Socket;
class Server{

    private app:Application;
    private port: String ;
    private io:Socket;
    private server:http.Server;
    private paths = {

    }
    constructor(){

        this.app = express();
        this.port = process.env.PORT || "8000";
        this.server = http.createServer(this.app);
        this.io = require('socket.io')(this.server);



        this.Sockets();
        this.middlewares();
    }

    Sockets(){
        // this.io.on('connect',socket => SocketController(socket,this.io));
        ioserver =this.io;
        require('../sockets/socketConstroller');
    }

    middlewares(){
       //CORS
    this.app.use(cors());
    //parse body
    this.app.use(express.json());
    //public folder
    this.app.use(express.static("./src/public"));

 
    }

    routes(){

        this.app.get('/',(req,res)=>{
            res.json({
                msg:`/ path`
            });
        });


        this.app.get('*', (req, res) => {
            //res.sendFile(path.join(__dirname, '../public/PageNotFound.html'));
            res.status(404).json({
                msg:`Page Not Found`
            });
        });
    }

    listen(){
        this.server.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`);
        })
    }
}


export default Server;
