import express from 'express';
import { saveQuery, getAllQueries, replyToQuery } from '../controllers/queryController.js';

const router = express.Router();

// Route to save a new query
router.post('/save', saveQuery);

// Route to get all queries
router.get('/all', getAllQueries);

// Route to reply to a query
router.post('/reply', replyToQuery);

export default router;
