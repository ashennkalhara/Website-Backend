import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from '../routes/authRoutes.js';
import reservationRoutes from '../routes/resRoutes.js';
import galleryRoutes from '../routes/galleryRoutes.js'; // Import gallery routes

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

// Serve static files from the 'public/uploads' directory
app.use('/uploads', express.static('public/uploads'));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.use('/api/auth', authRoutes);
app.use('/reservations', reservationRoutes);
app.use('/gallery', galleryRoutes); // Use gallery routes

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
