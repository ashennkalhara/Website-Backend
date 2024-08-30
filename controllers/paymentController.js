import Payment from '../models/Payment.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const processPayment = async (req, res) => {
    try {
        const { name, items, total, cardNumber, expiryDate, cvv, email } = req.body;

        if (!name || !items || !total || !cardNumber || !expiryDate || !cvv || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const payment = new Payment({
            name,
            items,
            total,
            cardNumber,
            expiryDate,
            cvv,
            email,
            status: 'Pending'
        });

        await payment.save();

        await sendEmail(email, 'Payment Received', `Dear ${name}, your payment of Rs.${total.toFixed(2)} has been received and is being processed. Thank you for your purchase!`);

        res.status(200).json({ message: 'Payment successful and email sent', payment });
    } catch (error) {
        console.error('Payment error:', error.message);
        res.status(500).json({ error: 'Payment processing failed', details: error.message });
    }
};

export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error.message);
        res.status(500).json({ message: 'Error fetching payments', error: error.message });
    }
};

export const confirmPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        payment.status = 'Confirmed';
        await payment.save();

        await sendEmail(payment.email, 'Payment Confirmed', `Dear ${payment.name}, your payment of Rs.${payment.total.toFixed(2)} has been confirmed. Your order will be ready soon.`);

        res.status(200).json({ message: 'Payment confirmed and email sent', payment });
    } catch (error) {
        console.error('Error confirming payment:', error.message);
        res.status(500).json({ error: 'Error confirming payment', details: error.message });
    }
};

export const markOrderAsReady = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        payment.status = 'Ready';
        await payment.save();

        await sendEmail(payment.email, 'Order Ready', `Dear ${payment.name}, your order is now ready for pickup. Thank you for choosing us..!`);

        res.status(200).json({ message: 'Order marked as ready and email sent', payment });
    } catch (error) {
        console.error('Error marking order as ready:', error.message);
        res.status(500).json({ error: 'Error marking order as ready', details: error.message });
    }
};


const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_APP_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error;
    }
};

export const getCount = async (req, res) => {
    try {
        const pendingCount = await Payment.countDocuments({ status: 'Pending' });
        const confirmedCount = await Payment.countDocuments({ status: 'Confirmed' });
        const readyCount = await Payment.countDocuments({ status: 'Ready' });

        res.status(200).json({
            pending: pendingCount,
            confirmed: confirmedCount,
            ready: readyCount,
            total: pendingCount + confirmedCount + readyCount
        });
    } catch (error) {
        console.error('Error fetching order counts:', error.message);
        res.status(500).json({ error: 'Error fetching order counts', details: error.message });
    }
};



