// controllers/controller.js

const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const todos = await Todo.find().skip(skip).limit(limit);
    const total = await Todo.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.json({ todos, totalPages });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createTodo,
  getTodos, // <- Yeh updated hoga
  getTodo,
  updateTodo
};
