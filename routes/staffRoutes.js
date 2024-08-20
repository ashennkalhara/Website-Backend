import express from 'express';
import { registerStaff, loginStaff, getStaffList } from '../controllers/staffController.js';

const router = express.Router();

router.post('/register', registerStaff);

router.post('/login', loginStaff);

router.get('/', getStaffList);

export default router;
