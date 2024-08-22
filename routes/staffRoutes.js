// src/routes/staffRoutes.js

import express from 'express';
import { registerStaff, loginStaff, getStaffList, deleteStaff } from '../controllers/staffController.js';

const router = express.Router();

router.post('/register', registerStaff);
router.post('/login', loginStaff);
router.get('/', getStaffList);
router.delete('/delete/:id', deleteStaff); // Ensure this route exists

export default router;
