import request from 'supertest';
import express from 'express';
import foodRoutes from '../routes/foodRoutes.js';
import Food from '../models/foodModel.js';

// Mock Mongoose methods
jest.mock('../models/foodModel.js');

const app = express();
app.use(express.json());
app.use('/api/foods', foodRoutes);

const testFoodData = {
    name: 'Pizza',
    price: 12.99,
    image: 'dummy.jpg'
};

describe('Food Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    // Test adding a food item
    it('should add a new food item', async () => {
        // Mock the save method to return the test food data
        Food.prototype.save = jest.fn().mockResolvedValue({
            _id: '123',
            ...testFoodData
        });

        const response = await request(app)
            .post('/api/foods')
            .attach('image', Buffer.from('dummy file content'), 'dummy.jpg') // Simulate file upload
            .field('name', testFoodData.name)
            .field('price', testFoodData.price);

        // Check response structure
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', testFoodData.name);
        expect(response.body).toHaveProperty('price', testFoodData.price);
        expect(response.body).toHaveProperty('image', testFoodData.image);
    });

    // Test getting all food items
    it('should get all food items', async () => {
        // Mock Food.find
        Food.find.mockResolvedValue([
            { _id: '123', name: 'Burger', price: 9.99, image: 'burger.jpg' },
            { _id: '124', name: 'Pizza', price: 12.99, image: 'pizza.jpg' }
        ]);

        const response = await request(app).get('/api/foods');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test updating a food item
    it('should update a food item', async () => {
        // Mock Food.findByIdAndUpdate
        Food.findByIdAndUpdate.mockResolvedValue({
            _id: '123',
            name: 'Pasta Updated',
            price: 17.99,
            image: 'updated.jpg'
        });

        const response = await request(app)
            .put('/api/foods/123')
            .attach('image', Buffer.from('dummy file content'), 'updated.jpg')
            .field('name', 'Pasta Updated')
            .field('price', 17.99);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Pasta Updated');
        expect(response.body).toHaveProperty('price', 17.99);
        expect(response.body).toHaveProperty('image', 'updated.jpg');
    });

    // Test deleting a food item
    it('should delete a food item', async () => {
        // Mock Food.findByIdAndDelete
        Food.findByIdAndDelete.mockResolvedValue({
            _id: '123',
            name: 'Sushi',
            price: 20.99,
            image: 'sushi.jpg'
        });

        const response = await request(app).delete('/api/foods/123');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Food deleted');
    });
});
