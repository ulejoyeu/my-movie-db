import express from 'express';
import { MyMovieDb } from '../models/MyMovieDb';
import userCtrl from '../controllers/user';
import auth from '../middleware/auth';
const router = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Routes protégées
router.get('/details', auth, userCtrl.details);

export default router;