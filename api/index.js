import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from '../routes/authRoutes.js';
import reservationRoutes from '../routes/resRoutes.js';
import galleryRoutes from '../routes/galleryRoutes.js';
import offerRoutes from '../routes/offerRoutes.js'; // Ensure this route file exists

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
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Serve static files from the 'public/uploads' directory
app.use('/uploads', express.static('public/uploads'));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.use('/api/auth', authRoutes); // Authentication routes
app.use('/reservations', reservationRoutes); // Reservation routes
app.use('/gallery', galleryRoutes); // Gallery management routes
app.use('/api/offers', offerRoutes); // Offer management routes

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
