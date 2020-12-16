"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'mymoviedb'
};
exports.signup = (req, res, next) => {
    // Connexion bdd
    let db = mysql_1.default.createConnection(dbConfig);
    db.connect();
    bcrypt_1.default.hash(req.body.password, 10)
        .then((hash) => {
        const login = req.body.login;
        const name = req.body.name;
        const surname = req.body.surname;
        const description = req.body.description;
        if (login == null || hash == null || hash == '') {
            res.status(500).json({ message: 'Missing input parameters' });
        }
        db.query('INSERT INTO user (login, hash, name, surname, description) VALUES (?, ?, ?, ?, ?)', [login, hash, name, surname, description], (err, rows, fields) => {
            if (!err) {
                let user = new User_1.default(rows.insertId, login, hash, name, surname, description);
                res.status(201).json(user);
            }
            else {
                res.status(500).json({ message: 'Could not create user' });
            }
        });
    })
        .catch(error => res.status(500).json({ error }));
};
exports.login = (req, res, next) => {
    const login = req.body.login;
    const password = req.body.password;
    let db = mysql_1.default.createConnection(dbConfig);
    db.query('SELECT * FROM user WHERE login = ?', [login], (err, rows, fields) => {
        if (!err && rows.length === 1) {
            const user = rows[0];
            bcrypt_1.default.compare(password, user.hash)
                .then(valid => {
                if (!valid) {
                    res.status(401).json({ error: 'Bad password !' });
                }
                else {
                    res.status(200).json({
                        userId: user.id,
                        token: jsonwebtoken_1.default.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
                    });
                }
            })
                .catch(error => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    });
};
exports.details = (req, res, next) => {
    let db = mysql_1.default.createConnection(dbConfig);
    const id = req['userId'];
    db.query('SELECT * FROM user WHERE id = ?', [id], (err, rows, fields) => {
        if (!err && rows.length === 1) {
            const user = rows[0];
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    });
};
exports.default = exports;
