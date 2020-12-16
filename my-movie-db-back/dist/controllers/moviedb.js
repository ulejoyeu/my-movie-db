"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MyMovieDb_1 = require("../models/MyMovieDb");
exports.getTrendingMovies = (req, res, next) => {
    MyMovieDb_1.MyMovieDb.getTrendingMovies('fr-FR').then(trendingMovies => {
        res.send(trendingMovies);
    });
};
exports.getMovie = (req, res, next) => {
    MyMovieDb_1.MyMovieDb.getMovie(req.params.id, 'fr-FR').then(movie => {
        res.send(movie);
    });
};
exports.default = exports;
