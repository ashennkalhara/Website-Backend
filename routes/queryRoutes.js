import express from 'express';
import { saveQuery, getAllQueries, replyToQuery, getQueryCounts } from '../controllers/queryController.js';

const router = express.Router();

router.post('/save', saveQuery);
router.get('/all', getAllQueries);
router.post('/reply', replyToQuery);
router.get('/query-counts', getQueryCounts);

export default router;
