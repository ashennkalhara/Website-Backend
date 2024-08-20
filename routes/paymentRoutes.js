import express from 'express';
import { processPayment, getPayments } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', processPayment); 
router.get('/', getPayments); 

export default router;
