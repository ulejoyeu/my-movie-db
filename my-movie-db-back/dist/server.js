"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MyMovieDb_1 = require("./models/MyMovieDb");
class Server {
    constructor(port) {
        this.port = port;
    }
    start() {
        const app = express_1.default();
        app.use((req, res, next) => {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            //res.setHeader('Access-Control-Allow-Credentials', true);
            // Pass to next layer of middleware
            next();
        });
        app.get('/', (req, res) => {
            res.send({ 'code': 200, 'msg': 'success' });
        });
        // Routes movieDb
        app.get('/moviedb/trending', (req, res) => {
            MyMovieDb_1.MyMovieDb.getTrendingMovies('fr-FR').then(trendingMovies => {
                res.send(trendingMovies);
            });
        });
        app.get('/moviedb/movie/:id', (req, res) => {
            MyMovieDb_1.MyMovieDb.getMovie(req.params.id, 'fr-FR').then(movie => {
                res.send(movie);
            });
        });
        app.listen(this.port, () => {
            console.log("Server démarré");
        });
    }
}
exports.default = Server;
