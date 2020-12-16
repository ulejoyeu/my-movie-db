import { Request, Response } from "express-serve-static-core";
import mysql from "mysql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { NextFunction } from "express";
import { send } from "process";

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'mymoviedb'
};

exports.signup = (req: Request, res: Response, next: NextFunction) => {
    // Connexion bdd
    let db = mysql.createConnection(dbConfig);

    db.connect();

    bcrypt.hash(req.body.password, 10)
    .then((hash: string) => {
        const login = req.body.login;
        const name = req.body.name;
        const surname = req.body.surname;
        const description = req.body.description;

        if(login == null || hash == null || hash == '') {
            res.status(500).json({ message: 'Missing input parameters' });
        }

        db.query(
            'INSERT INTO user (login, hash, name, surname, description) VALUES (?, ?, ?, ?, ?)',
            [login, hash, name, surname, description],
            (err, rows, fields) => {
                if(!err) {
                    let user = new User(rows.insertId, login, hash, name, surname, description);
                    res.status(201).json(user);
                } else {
                    res.status(500).json({ message: 'Could not create user' });
                }
            }
        );
    })
    .catch(error => res.status(500).json({ error }));
}

exports.login = (req: Request, res: Response, next: NextFunction) => {
    const login = req.body.login;
    const password = req.body.password;
    let db = mysql.createConnection(dbConfig);

    db.query(
        'SELECT * FROM user WHERE login = ?',
        [login],
        (err, rows, fields) => {
            if(!err && rows.length === 1) {
                const user: any = rows[0];
                bcrypt.compare(password, user.hash)
                    .then(valid => {            
                        if(!valid) {
                            res.status(401).json({ error: 'Bad password !' });
                        } else {
                            res.status(200).json({
                                userId: user.id,
                                token: jwt.sign(
                                    { userId: user.id},
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    );
}

exports.details = (req: Request, res: Response, next: NextFunction) => {
    let db = mysql.createConnection(dbConfig);
    const id = req['userId'];

    db.query(
        'SELECT * FROM user WHERE id = ?',
        [id],
        (err, rows, fields) => {
            if(!err && rows.length === 1) {
                const user: any = rows[0];
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }
    );
}

export default exports;