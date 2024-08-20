import Image from '../models/ImageModel.js';
import fs from 'fs';
import path from 'path';

// Controller to upload an image and save it to the database
export const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const image = new Image({
            filePath: `/uploads/${req.file.filename}`
        });

        await image.save();
        res.status(201).send({ filePath: image.filePath });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Controller to get all images
export const getAllImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Controller to delete an image
export const deleteImage = async (req, res) => {
    const imageId = req.params.id;

    try {
        const image = await Image.findById(imageId);
        if (!image) {
            return res.status(404).send({ message: 'Image not found' });
        }

        const filePath = path.join('public', 'uploads', path.basename(image.filePath));

        // Check if the file exists before attempting to delete
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            console.warn('File does not exist:', filePath);
        }

        // Delete the image document from the database
        await Image.findByIdAndDelete(imageId);
        res.status(200).send({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error during deletion:', error);
        res.status(500).send({ error: error.message });
    }
};
