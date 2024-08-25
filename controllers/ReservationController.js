import Reservation from '../models/Reservation.js';
import { sendReservationAccepted } from '../middleware/nodemailer.js'; 

export const createReservation = async (req, res) => {
    try { 
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).send(reservation);
    } catch (error) {
        console.error('Error creating reservation:', error); 
        res.status(400).send({ error: error.message });
    }
};


export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).send(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);  
        res.status(400).send({ error: error.message });
    }
};

export const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        console.log(`Received request to update reservation with ID: ${id} to status: ${status}`);

        const reservation = await Reservation.findByIdAndUpdate(
            id,
            { status: status },
            { new: true } 
        );

        if (!reservation) {
            console.error(`Reservation with ID: ${id} not found`);
            return res.status(404).json({ message: 'Reservation not found' });
        }

        const formatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const formattedDate = formatter.format(reservation.date);

        await sendReservationAccepted(reservation.email, reservation, formattedDate);

        res.status(200).json(reservation);
    } catch (error) {
        console.error('Error updating reservation status:', error);  
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};