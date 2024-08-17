import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from '../routes/authRoutes.js';
import reservationRoutes from '../routes/resRoutes.js';
import galleryRoutes from '../routes/galleryRoutes.js';
import offerRoutes from '../routes/offerRoutes.js';
import foodRoutes from '../routes/foodRoutes.js' // Import food routes
import paymentRoutes from '../routes/paymentRoutes.js';
import queryRoutes from '../routes/queryRoutes.js';
import path from 'path';

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the application if MongoDB connection fails
});

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Serve static files from the 'public/uploads' directory
app.use('/uploads', express.static(path.join('public', 'uploads')));

// API Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.use('/api/auth', authRoutes); // Authentication routes
app.use('/reservations', reservationRoutes); // Reservation routes
app.use('/gallery', galleryRoutes); // Gallery management routes
app.use('/api/offers', offerRoutes); // Offer management routes
app.use('/api/foods', foodRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/queries', queryRoutes);
app.use('/uploads', express.static('public/uploads'));


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});