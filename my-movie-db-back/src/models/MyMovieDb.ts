import Movie from "./Movie";

const request = require("request");

export class MyMovieDb {
    static movieDbUrl: string = "https://api.themoviedb.org/3";
    static apiKey: string = "SECRET_API_KEY";

    static getTrendingMovies(language: string): Promise<Movie[]> {
        return new Promise((resolve, reject) => {
            request.get(`${this.movieDbUrl}/trending/movie/week?api_key=${this.apiKey}&language=${language}`, (error, response, body) => {
                const res = JSON.parse(body);
                resolve(res.results.map(res => this.createMovieFromMovieDb(res)));
            });
        });
    }

    static getMovie(id: string, language: string): Promise<Movie> {
        return new Promise((resolve, reject) => {
            request.get(`${this.movieDbUrl}/movie/${id}?api_key=${this.apiKey}&language=${language}`, (error, response, body) => {
                const res = JSON.parse(body);
                resolve(this.createMovieFromMovieDb(res));
            });
        })
    }

    static createMovieFromMovieDb(movie: any): Movie {
        let id_mdb = movie['id'];
        let original_title = movie['original_title'];
        let original_language = movie['original_language'];
        let poster_path = movie['poster_path'];
        let title = movie['title'];
        let overview = movie['overview'];
        let vote_average = movie['vote_average'];
        let genres = movie['genres'];

        return new Movie(id_mdb, original_title, original_language, poster_path, title, overview, vote_average, genres);
    }
}