import Query from '../models/QueryModel.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Save a new query
export const saveQuery = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newQuery = new Query({ name, email, message });
    await newQuery.save();
    res.status(201).json(newQuery);
  } catch (error) {
    console.error('Error saving query:', error.message);
    res.status(500).json({ error: 'Error saving query', details: error.message });
  }
};

// Get all queries
export const getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find();
    res.status(200).json(queries);
  } catch (error) {
    console.error('Error fetching queries:', error.message);
    res.status(500).json({ error: 'Error fetching queries', details: error.message });
  }
};

// Reply to a query
export const replyToQuery = async (req, res) => {
  const { email, replyMessage } = req.body;

  if (!email || !replyMessage) {
    return res.status(400).json({ error: 'Email and reply message are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Reply to Your Query',
      text: replyMessage,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Reply sent successfully' });
  } catch (error) {
    console.error('Error sending reply:', error.message);
    res.status(500).json({ error: 'Error sending reply', details: error.message });
  }
};
