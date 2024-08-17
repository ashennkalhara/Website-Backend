// routes/queryRoutes.js
import express from 'express';
import { saveQuery, getAllQueries } from '../controllers/queryController.js';

const router = express.Router();

// Route to save a new query
router.post('/save', saveQuery);

// Route to get all queries
router.get('/all', getAllQueries);

export default router;
