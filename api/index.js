import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from '../routes/authRoutes.js';
import Reservation from '../models/Reservation.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.use('/api/auth', authRoutes);

// Create a reservation
app.post('/reservations', async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).send(reservation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all reservations
app.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).send(reservations);
    } catch (error) {
        res.status(400).send(error);
    }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
