"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mysql_1 = __importDefault(require("mysql"));
const moviedb_1 = __importDefault(require("./routes/moviedb"));
const user_1 = __importDefault(require("./routes/user"));
class Server {
    constructor(port) {
        this.port = port;
        // Connexion bdd
        this.db = mysql_1.default.createConnection({
            host: 'db',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'mymoviedb'
        });
        this.db.connect();
    }
    start() {
        const app = express_1.default();
        app.use((req, res, next) => {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            // Pass to next layer of middleware
            next();
        });
        // body Parser config
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use(body_parser_1.default.json());
        app.get('/', (req, res) => {
            res.send({ 'code': 200, 'msg': 'success' });
        });
        // Routes movieDb
        app.use('/moviedb', moviedb_1.default);
        // Routes users
        app.use('/user', user_1.default);
        app.listen(this.port, () => {
            console.log("Server démarré");
        });
    }
}
exports.default = Server;
