import Reservation from '../models/Reservation.js';

// Create a reservation
export const createReservation = async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).send(reservation);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Get all reservations
export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).send(reservations);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
