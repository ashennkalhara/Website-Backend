import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import offerRoutes from '../routes/offerRoutes.js';
import Offer from '../models/Offer.js';

// Mock dependencies
jest.mock('../models/Offer.js');

const app = express();
app.use(express.json());
app.use('/api/offers', offerRoutes);

describe('Offer Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should get all offers successfully', async () => {
        const mockOffers = [
            { _id: '1', title: 'Offer 1', description: 'Description 1'},
            { _id: '2', title: 'Offer 2', description: 'Description 2' },
        ];
        
        Offer.find.mockResolvedValue(mockOffers);

        const response = await request(app).get('/api/offers');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockOffers);
    });

    test('should create a new offer successfully', async () => {
        const newOffer = {
            _id: '1',
            title: 'New Offer',
            description: 'New Description',
        };

        Offer.prototype.save.mockResolvedValue(newOffer);

        const response = await request(app)
            .post('/api/offers')
            .send({
                title: 'New Offer',
                description: 'New Description',
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual(newOffer);
    });

    test('should return an error when creating an offer without title or description', async () => {
        const response = await request(app)
            .post('/api/offers')
            .send({
                title: '',
                description: '',
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Title and description are required');
    });

    test('should delete an offer successfully', async () => {
        Offer.findByIdAndDelete.mockResolvedValue({
            _id: '1',
            title: 'Deleted Offer',
            description: 'Deleted Description',
        });

        const response = await request(app).delete('/api/offers/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Offer removed successfully');
    });

    test('should return an error when deleting a non-existing offer', async () => {
        Offer.findByIdAndDelete.mockResolvedValue(null);

        const response = await request(app).delete('/api/offers/999');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Offer not found');
    });
});
