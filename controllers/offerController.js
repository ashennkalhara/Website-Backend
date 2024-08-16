const Offer = require('../models/Offer');

// Get all offers
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new offer
exports.createOffer = async (req, res) => {
  const offer = new Offer({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  });

  try {
    const newOffer = await offer.save();
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an offer
exports.updateOffer = async (req, res) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOffer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an offer
exports.deleteOffer = async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Offer deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
