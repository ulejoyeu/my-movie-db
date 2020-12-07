class Movie {
    id;
    id_mdb;
    original_title;
    original_language;
    poster_url;
    title;
    overview;
    note_average;
    genres;

    constructor(id, id_mdb, original_title, original_language, poster_url, title, overview, note_average) {
        this.id_mdb = id_mdb;
        this.original_title = original_title;
        this.original_language = original_language;
        this.poster_url = poster_url;
        this.title = title;
        this.overview = overview;
        this.note_average = note_average;
    }
}