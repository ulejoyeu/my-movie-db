"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyMovieDb = void 0;
const Movie_1 = __importDefault(require("./Movie"));
const request = require("request");
class MyMovieDb {
    static getTrendingMovies(language) {
        return new Promise((resolve, reject) => {
            request.get(`${this.movieDbUrl}/trending/movie/week?api_key=${this.apiKey}&language=${language}`, (error, response, body) => {
                const res = JSON.parse(body);
                resolve(res.results.map(res => this.createMovieFromMovieDb(res)));
            });
        });
    }
    static createMovieFromMovieDb(movie) {
        let id_mdb = movie['id'];
        let original_title = movie['original_title'];
        let original_language = movie['original_language'];
        let poster_path = movie['poster_path'];
        let title = movie['title'];
        let overview = movie['overview'];
        let note_average = movie['note_average'];
        let genres = movie['genres'];
        return new Movie_1.default(id_mdb, original_title, original_language, poster_path, title, overview, note_average, genres);
    }
}
exports.MyMovieDb = MyMovieDb;
MyMovieDb.movieDbUrl = "https://api.themoviedb.org/3";
MyMovieDb.apiKey = "3964c252a9aff1920a5f962db576b066";
