import express from 'express';
import { newArticle } from '../controllers/articleController.mjs';
import { authmiddleware } from '../middleware/authmiddleware.mjs';

const articlerouter = express.Router();

// Ensure the middleware is correctly used
articlerouter.post('/create', authmiddleware(['Editor', 'Admin']), newArticle);

export default articlerouter;
