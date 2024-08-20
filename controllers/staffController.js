import Staff from '../models/staffModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerStaff = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const staffExists = await Staff.findOne({ email });
    if (staffExists) {
      return res.status(400).json({ message: 'Staff already exists' });
    }

    const staff = new Staff({ name, email, password });
    const savedStaff = await staff.save();

    res.status(201).json({
      _id: savedStaff._id,
      name: savedStaff.name,
      email: savedStaff.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register staff' });
  }
};

export const loginStaff = async (req, res) => {
  const { email, password } = req.body;
  try {
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ _id: staff._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      token,
      staff: {
        _id: staff._id,
        name: staff.name,
        email: staff.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login staff' });
  }
};

export const getStaffList = async (req, res) => {
  try {
    const staffList = await Staff.find().select('-password');
    res.json(staffList);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve staff list' });
  }
};
