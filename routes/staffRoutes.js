import express from 'express';
import { registerStaff, loginStaff, getStaffList, deleteStaff, getStaffCount } from '../controllers/staffController.js';

const router = express.Router();

router.post('/register', registerStaff);
router.post('/login', loginStaff);
router.get('/', getStaffList);
router.delete('/:id', deleteStaff); 
router.get('/staff-count', getStaffCount); 

export default router;
