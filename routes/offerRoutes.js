import express from 'express';
import Offer from '../models/Offer.js'; // Adjust the import path as necessary

const router = express.Router();

// GET all offers
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST a new offer
router.post('/', async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const newOffer = new Offer({ title, description, image });
    const offer = await newOffer.save();
    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// DELETE an offer
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findByIdAndDelete(id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.status(200).json({ message: 'Offer removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
