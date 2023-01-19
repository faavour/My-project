const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true});

const todoSchema = new mongoose.Schema({
  task: String
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(todos);
  });
});

app.post('/todos', (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err, todo) => {
    if (err) return res.status(500).send(err);
    return res.status(201).send(todo);
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});