export default class Movie {
    id: number;
    id_mdb: number;
    original_title: string;
    original_language: string;
    poster_path: string;
    title: string;
    overview: string;
    note_average: number;
    genres: any;

    constructor(id_mdb:number, original_title: string, original_language: string, poster_path: string, title: string, overview: string, note_average: number, genres: any) {
        this.id = null;
        this.id_mdb = id_mdb;
        this.original_title = original_title;
        this.original_language = original_language;
        this.poster_path = poster_path;
        this.title = title;
        this.overview = overview;
        this.note_average = note_average;
        this.genres = genres;
    }

    // 4 possible input values: "small", "medium", "large", "full"
    // Size has 4 possible values: "w300", "w780", "w1280", "original" for server
    getPosterUrl(size: string): string {
        let definition = "w300";
        switch(size) {
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