import { createReservation, getReservations, updateStatus, getResCounts } from '../controllers/ReservationController.js';
import Reservation from '../models/Reservation.js';
import { sendReservationAccepted } from '../middleware/nodemailer.js';

jest.mock('../models/Reservation.js');
jest.mock('../middleware/nodemailer.js');

describe('Reservation Controller', () => {
    
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    // test('createReservation should create a reservation and return it', async () => {
    //     const req = {
    //         body: {
    //             name: 'John Doe',
    //             date: '2024-09-10',
    //             time: '18:00',
    //             email: 'john@example.com'
    //         }
    //     };
    //     const res = {
    //         status: jest.fn().mockReturnThis(),
    //         send: jest.fn()
    //     };
    
    //     // Mocking the save method to return an object with a structure similar to what the controller expects
    //     Reservation.prototype.save = jest.fn().mockResolvedValue(req.body);
    
    //     await createReservation(req, res);
    
    //     expect(Reservation.prototype.save).toHaveBeenCalledTimes(1);
    //     expect(res.status).toHaveBeenCalledWith(201);
    //     expect(res.send).toHaveBeenCalledWith(req.body);
    // });

    test('getReservations should return all reservations', async () => {
        const reservations = [{ name: 'John Doe', date: '2024-09-10', time: '18:00' }];
        Reservation.find.mockResolvedValue(reservations);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        await getReservations(req, res);

        expect(Reservation.find).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(reservations);
    });

    test('updateStatus should update reservation status and send an email', async () => {
        const req = {
            params: { id: '123' },
            body: { status: 'Approved' }
        };
        const reservation = {
            _id: '123',
            name: 'John Doe',
            date: new Date('2024-09-10'),
            time: '18:00',
            email: 'john@example.com',
            status: 'Approved',
        };

        Reservation.findByIdAndUpdate.mockResolvedValue(reservation);
        sendReservationAccepted.mockResolvedValue(true);

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await updateStatus(req, res);

        expect(Reservation.findByIdAndUpdate).toHaveBeenCalledWith(
            '123',
            { status: 'Approved' },
            { new: true }
        );
        expect(sendReservationAccepted).toHaveBeenCalledWith(
            'john@example.com',
            reservation,
            expect.any(String)
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(reservation);
    });

    test('getResCounts should return accepted and rejected reservation counts', async () => {
        Reservation.countDocuments.mockResolvedValueOnce(5).mockResolvedValueOnce(3);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getResCounts(req, res);

        expect(Reservation.countDocuments).toHaveBeenCalledWith({ status: 'Approved' });
        expect(Reservation.countDocuments).toHaveBeenCalledWith({ status: 'Rejected' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ acceptedCount: 5, rejectedCount: 3 });
    });
});
