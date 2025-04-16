const express = require('express');
const router = express.Router();

const {
  createTodo,
  getTodos,
  getTodo,
  updateTodo
} = require('../controllers/controller');

router.post('/todos', createTodo);
router.get('/todos', getTodos);
router.get('/todos/:id', getTodo);
router.put('/todos/:id', updateTodo);

module.exports = router;
