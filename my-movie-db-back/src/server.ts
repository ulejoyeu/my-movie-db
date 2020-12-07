import { Request, Response } from "express-serve-static-core";
import express from 'express';
import { MyMovieDb } from "./models/MyMovieDb";

export default class Server {
    readonly port: number;

    constructor(port: number) {
        this.port = port;
    }

    start() {
        const app = express();
        app.use((req,res,next) => {
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

        app.get('/', (req: Request, res: Response) => {
            res.send({'code':200, 'msg': 'success'});
        });

        // Routes movieDb
        app.get('/moviedb/trending', (req: Request, res: Response) => {
            MyMovieDb.getTrendingMovies('fr-FR').then(trendingMovies => {
                res.send(trendingMovies);
            });
        });

        app.get('/moviedb/movie/:id', (req: Request, res: Response) => {
            MyMovieDb.getMovie(req.params.id, 'fr-FR').then(movie => {
                res.send(movie);
            });
        });

        app.listen(this.port, () => {
            console.log("Server démarré");
        });
    }
}