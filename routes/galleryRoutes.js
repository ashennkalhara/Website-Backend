import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { uploadImage, getAllImages, deleteImage } from '../controllers/galleryController.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join('public', 'uploads'); 
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

const router = express.Router();

// Route to upload an image
router.post('/upload', upload.single('image'), uploadImage);

// Route to get all images
router.get('/images', getAllImages);

// Route to delete an image
router.delete('/delete/:id', deleteImage);

export default router;
