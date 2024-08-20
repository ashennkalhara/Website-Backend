import Payment from '../models/Payment.js';

// Function to process a payment
export const processPayment = async (req, res) => {
    try {
        const { name, items, total, cardNumber, expiryDate, cvv } = req.body;

        if (!name || !items || !total || !cardNumber || !expiryDate || !cvv) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const payment = new Payment({
            name,
            items,
            total,
            cardNumber, 
            expiryDate,
            cvv 
        });

        await payment.save();

        res.status(200).json({ message: 'Payment successful', payment });
    } catch (error) {
        console.error('Payment error:', error.message);
        res.status(500).json({ error: 'Payment processing failed', details: error.message });
    }
};

// Function to get all payments
export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find(); // Fetch all payments from the database
        res.json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error.message);
        res.status(500).json({ message: 'Error fetching payments', error: error.message });
    }
};
