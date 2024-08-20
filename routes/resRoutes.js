import express from 'express';
import { createReservation, getReservations } from '../controllers/ReservationController.js';

const router = express.Router();

router.post('/', createReservation); // Create a reservation
router.get('/', getReservations); // Get all reservations

export default router;
