import express from 'express';
import multer from 'multer';
import { addFood, getFoods, updateFood, deleteFood } from '../controllers/foodController.js';

const router = express.Router();
const upload = multer({ dest: 'public/uploads/' });

// Add a new food item
router.post('/', upload.single('image'), addFood);

// Get all food items
router.get('/', getFoods);

// Update a food item
router.put('/:id', upload.single('image'), updateFood);

// Delete a food item
router.delete('/:id', deleteFood);

export default router;