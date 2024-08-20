import Query from '../models/QueryModel.js';

// Save a new query
export const saveQuery = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newQuery = new Query({ name, email, message });
    await newQuery.save();
    res.status(201).json(newQuery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all queries
export const getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find();
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
