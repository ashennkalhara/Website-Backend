import Staff from '../models/staffModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new staff member
export const registerStaff = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the staff member already exists
    const staffExists = await Staff.findOne({ email });
    if (staffExists) {
      return res.status(400).json({ message: 'Staff already exists' });
    }

    // Create and save the new staff member
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

// Login a staff member
export const loginStaff = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the staff member by email
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token for the staff member
    const token = jwt.sign({ _id: staff._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

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

// Get the list of all staff members
export const getStaffList = async (req, res) => {
  try {
    const staffList = await Staff.find().select('-password'); // Exclude passwords from the result
    res.json(staffList);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve staff list' });
  }
};

// Delete a staff member by ID
export const deleteStaff = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStaff = await Staff.findByIdAndDelete(id);

    if (!deletedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete staff' });
  }
};

export const getStaffCount = async (req, res) => {
  try {
    const staffCount = await Staff.countDocuments();
    res.status(200).json({ total: staffCount });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve staff count' });
  }
};