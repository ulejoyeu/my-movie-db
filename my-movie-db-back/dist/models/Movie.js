"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Movie {
    constructor(id_mdb, original_title, original_language, poster_path, title, overview, vote_average, genres) {
        this.id = null;
        this.id_mdb = id_mdb;
        this.original_title = original_title;
        this.original_language = original_language;
        this.poster_path = poster_path;
        this.title = title;
        this.overview = overview;
        this.vote_average = vote_average;
        this.genres = genres;
    }
    // 4 possible input values: "small", "medium", "large", "full"
    // Size has 4 possible values: "w300", "w780", "w1280", "original" for server
    getPosterUrl(size) {
        let definition = "w300";
        switch (size) {
            case "small":
                definition = "w300";
                break;
            case "medium":
                definition = "w780";
                break;
            case "large":
                definition = "w1280";
                break;
            case "full":
                definition = "original";
                break;
        }
        return `https://image.tmdb.org/t/p/${definition}/${this.poster_path}.jpg`;
    }
}
exports.default = Movie;
