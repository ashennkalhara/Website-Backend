import express from 'express';
import { registerStaff, loginStaff, getStaffList, deleteStaff } from '../controllers/staffController.js';

const router = express.Router();

router.post('/register', registerStaff);
router.post('/login', loginStaff);
router.get('/', getStaffList);
router.delete('/:id', deleteStaff); // Updated route

export default router;
