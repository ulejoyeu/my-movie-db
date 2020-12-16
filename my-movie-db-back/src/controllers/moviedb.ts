import { NextFunction } from "express";
import { Request, Response } from "express-serve-static-core";
import { MyMovieDb } from "../models/MyMovieDb";

exports.getTrendingMovies = (req: Request, res: Response, next: NextFunction) => {
    MyMovieDb.getTrendingMovies('fr-FR').then(trendingMovies => {
        res.send(trendingMovies);
    });
}

exports.getMovie = (req: Request, res: Response, next: NextFunction) => {
    MyMovieDb.getMovie(req.params.id, 'fr-FR').then(movie => {
        res.send(movie);
    });
}

export default exports;