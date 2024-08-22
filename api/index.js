import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from '../routes/authRoutes.js';
import reservationRoutes from '../routes/resRoutes.js';
import galleryRoutes from '../routes/galleryRoutes.js';
import offerRoutes from '../routes/offerRoutes.js';
import foodRoutes from '../routes/foodRoutes.js' 
import paymentRoutes from '../routes/paymentRoutes.js';
import queryRoutes from '../routes/queryRoutes.js';
import staffRoutes from '../routes/staffRoutes.js'
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); 
});

const app = express();

app.use(express.json()); 
app.use(cors()); 

app.use('/uploads', express.static(path.join('public', 'uploads')));

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.use('/api/auth', authRoutes); 
app.use('/reservations', reservationRoutes); 
app.use('/gallery', galleryRoutes); 
app.use('/api/offers', offerRoutes); 
app.use('/api/foods', foodRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/staff', staffRoutes);
app.use('/uploads', express.static('public/uploads'));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});