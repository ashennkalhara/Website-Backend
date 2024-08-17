import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: [{ type: Object, required: true }], // Adjust schema as needed
    total: { type: Number, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
