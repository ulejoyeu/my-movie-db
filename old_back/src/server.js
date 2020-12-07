const express = require('express');
const app = express();
import {MyMovieDb} from './models/MyMovieDb.js';

app.get('/', (req, res) => {
    res.send({'code':200, 'msg': 'success'});
});

app.get('/moviedb/trending', (req, res) => {
    const trendingMovies = await MyMovieDb.getTrendingMovies('fr-FR');
    res.send(trendingMovies);
});

app.listen(3000);