import express from 'express';
import { processPayment, getPayments } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', processPayment); // For processing payments
router.get('/', getPayments); // For fetching payments

export default router;
