"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioserver = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http = __importStar(require("http"));
class Server {
    constructor() {
        this.paths = {};
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000";
        this.server = http.createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.Sockets();
        this.middlewares();
    }
    Sockets() {
        // this.io.on('connect',socket => SocketController(socket,this.io));
        exports.ioserver = this.io;
        require('../sockets/socketConstroller');
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //parse body
        this.app.use(express_1.default.json());
        //public folder
        this.app.use(express_1.default.static("./src/public"));
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: `/ path`
            });
        });
        this.app.get('*', (req, res) => {
            //res.sendFile(path.join(__dirname, '../public/PageNotFound.html'));
            res.status(404).json({
                msg: `Page Not Found`
            });
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map