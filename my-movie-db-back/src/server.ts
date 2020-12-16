import { Request, Response } from "express-serve-static-core";
import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import mysql from 'mysql';
import User from "./models/User";
import movieDbRoutes from "./routes/moviedb";
import userRoutes from "./routes/user";

export default class Server {
    readonly port: number;
    db: mysql.Connection;

    constructor(port: number) {
        this.port = port;

        // Connexion bdd
        this.db = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'mymoviedb'
        });

        this.db.connect();
    }

    start() {
        const app = express();
        app.use((req,res,next) => {
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
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());


        app.get('/', (req: Request, res: Response) => {
            res.send({'code':200, 'msg': 'success'});
        });

        // Routes movieDb
        app.use('/moviedb', movieDbRoutes);
        // Routes users
        app.use('/user', userRoutes);

        app.listen(this.port, () => {
            console.log("Server démarré");
        });
    }
}