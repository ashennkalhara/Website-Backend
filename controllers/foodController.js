import Food from '../models/foodModel.js';

// Add a new food item
export const addFood = async (req, res) => {
    const { name, price } = req.body;
    if (!req.file) {
        return res.status(400).json({ error: 'Image is required' });
    }
    const image = req.file.filename;
    try {
        const newFood = new Food({ name, price, image });
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
        return; // Add return statement here
    } catch (error) {
        res.status(500).json({ error: 'Failed to add food' });
    }
};


// Get all food items
export const getFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch foods' });
    }
};

// Update a food item
export const updateFood = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const image = req.file ? req.file.filename : undefined;
    try {
        const updatedFood = await Food.findByIdAndUpdate(id, { name, price, image }, { new: true });
        res.status(200).json(updatedFood);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update food' });
    }
};

// Delete a food item
export const deleteFood = async (req, res) => {
    const { id } = req.params;
    try {
        await Food.findByIdAndDelete(id);
        res.status(200).json({ message: 'Food deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete food' });
    }
};