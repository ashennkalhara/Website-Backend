import { uploadImage, getAllImages, deleteImage } from '../controllers/galleryController.js';
import Image from '../models/ImageModel.js';
import fs from 'fs';
import path from 'path';

// Mock the dependencies
jest.mock('../models/ImageModel.js');
jest.mock('fs');
jest.mock('path');

describe('Image Controller', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getAllImages should return all images', async () => {
        const images = [{ filePath: '/uploads/image1.png' }, { filePath: '/uploads/image2.png' }];
        Image.find.mockResolvedValue(images);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllImages(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(images);
    });

    test('deleteImage should delete the image file and document', async () => {
        const imageId = '123';
        const image = { _id: imageId, filePath: '/uploads/test.png' };
        const req = { params: { id: imageId } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        Image.findById.mockResolvedValue(image);
        Image.findByIdAndDelete.mockResolvedValue(image);
        fs.existsSync.mockReturnValue(true);
        fs.unlinkSync.mockReturnValue();

        await deleteImage(req, res);

        expect(fs.existsSync).toHaveBeenCalledWith(path.join('public', 'uploads', 'test.png'));
        expect(fs.unlinkSync).toHaveBeenCalledWith(path.join('public', 'uploads', 'test.png'));
        expect(Image.findByIdAndDelete).toHaveBeenCalledWith(imageId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ message: 'Image deleted successfully' });
    });
});
