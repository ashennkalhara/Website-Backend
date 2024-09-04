import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from '../routes/authRoutes.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock dependencies
jest.mock('../models/User.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

describe('Auth Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should not register a user if email already exists', async () => {
        User.findOne.mockResolvedValue({
            name: 'Jane Doe',
            email: 'jane@example.com',
            password: 'hashedPassword'
        });

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'John Doe',
                email: 'jane@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User already exists');
    });

    test('should login a user successfully', async () => {
        User.findOne.mockResolvedValue({
            _id: 'user_id_123',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashedPassword',
            isAdmin: false
        });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('fake-jwt-token');

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'john@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token', 'fake-jwt-token');
        expect(response.body.user).toHaveProperty('id', 'user_id_123');
        expect(response.body.user).toHaveProperty('name', 'John Doe');
        expect(response.body.user).toHaveProperty('email', 'john@example.com');
        expect(response.body.user).toHaveProperty('isAdmin', false);
    });

    test('should not login a user with invalid credentials', async () => {
        User.findOne.mockResolvedValue({
            _id: 'user_id_123',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashedPassword'
        });
        bcrypt.compare.mockResolvedValue(false);  // Password doesn't match

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'john@example.com',
                password: 'wrongpassword'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid email or password');
    });
});
