import express from 'express';
import { MyMovieDb } from '../models/MyMovieDb';
import movieDbCtrl from '../controllers/moviedb';
const router = express.Router();

router.get('/trending', movieDbCtrl.getTrendingMovies);
router.get('/movie/:id', movieDbCtrl.getMovie);

export default router;