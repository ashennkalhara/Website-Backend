import express from 'express';
import { processPayment, getPayments, confirmPayment, markOrderAsReady } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', processPayment);

router.get('/', getPayments);

router.post('/confirm/:paymentId', confirmPayment);

router.post('/ready/:paymentId', markOrderAsReady);

export default router;
