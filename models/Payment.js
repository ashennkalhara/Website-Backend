import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: [{ title: String, price: Number }],
    total: { type: Number, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    email: { type: String, required: true }, 
    status: { type: String, default: 'Pending' } 
});

export default mongoose.model('Payment', paymentSchema);
