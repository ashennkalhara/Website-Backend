import express from 'express';
import { createReservation, getReservations, updateStatus } from '../controllers/ReservationController.js';

const router = express.Router();

router.post('/', createReservation); // Create a reservation
router.get('/', getReservations); // Get all reservations
router.put('/:id', updateStatus)

export default router;
