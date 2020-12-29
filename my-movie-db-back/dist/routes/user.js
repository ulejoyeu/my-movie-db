"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/signup', user_1.default.signup);
router.post('/login', user_1.default.login);
// Routes protégées
router.get('/details', auth_1.default, user_1.default.details);
router.get('/movies', auth_1.default, user_1.default.movies);
exports.default = router;
