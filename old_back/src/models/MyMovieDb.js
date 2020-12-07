export class MyMovieDb {
    static movieDbUrl = "https://api.themoviedb.org/3";
    static apiKey = "3964c252a9aff1920a5f962db576b066";

    static getTrendingMovies(language) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.movieDbUrl}&language=${language}`, true);
            xhr.responseType = 'json';
            xhr.onload = () => resolve(xhr.responseText);
            xhr.send();
        });
    }
}