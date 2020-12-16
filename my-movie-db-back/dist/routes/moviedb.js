"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviedb_1 = __importDefault(require("../controllers/moviedb"));
const router = express_1.default.Router();
router.get('/trending', moviedb_1.default.getTrendingMovies);
router.get('/movie/:id', moviedb_1.default.getMovie);
exports.default = router;
