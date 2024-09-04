import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import queryRoutes from '../routes/queryRoutes.js';
import Query from '../models/QueryModel.js';
import nodemailer from 'nodemailer';

// Mock dependencies
jest.mock('../models/QueryModel.js');
jest.mock('nodemailer');

// Create a test Express app and use the query routes
const app = express();
app.use(express.json());
app.use('/api/queries', queryRoutes);

describe('Query Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test fetching all queries
    test('should get all queries successfully', async () => {
        const mockQueries = [
            { _id: '1', name: 'John Doe', email: 'john.doe@example.com', message: 'Message 1', replied: false },
            { _id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', message: 'Message 2', replied: true },
        ];

        Query.find.mockResolvedValue(mockQueries);

        const response = await request(app).get('/api/queries/all');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockQueries);
    });

    // Test replying to a query
    test('should reply to a query successfully', async () => {
        const sendMailMock = jest.fn().mockResolvedValue({});
        nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

        Query.findOneAndUpdate.mockResolvedValue({ _id: '1', email: 'john.doe@example.com', replied: true });

        const response = await request(app)
            .post('/api/queries/reply')
            .send({
                email: 'john.doe@example.com',
                replyMessage: 'This is a reply to your query.',
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Reply sent successfully');
        expect(sendMailMock).toHaveBeenCalledWith({
            from: process.env.EMAIL_ADDRESS,
            to: 'john.doe@example.com',
            subject: 'Reply to Your Query',
            text: 'This is a reply to your query.',
        });
    });

    // Test error when reply message or email is missing
    test('should return error when email or reply message is missing', async () => {
        const response = await request(app)
            .post('/api/queries/reply')
            .send({
                email: '',
                replyMessage: '',
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Email and reply message are required');
    });

    // Test fetching query counts
    test('should get query counts successfully', async () => {
        Query.countDocuments.mockResolvedValueOnce(5).mockResolvedValueOnce(3);

        const response = await request(app).get('/api/queries/query-counts');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ repliedCount: 5, pendingCount: 3 });
    });
});
