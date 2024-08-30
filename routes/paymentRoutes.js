import express from 'express';
import { processPayment, getPayments, confirmPayment, markOrderAsReady, getCount } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', processPayment);

router.get('/', getPayments);

router.post('/confirm/:paymentId', confirmPayment);

router.post('/ready/:paymentId', markOrderAsReady);

router.get('/order-count', getCount);


export default router;
