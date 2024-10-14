const express = require('express');
const mysql = require('mysql2');
const app = express();

// MySQL connection
const connection = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12737060',
  password: 'mLugmZtXpC',
  database: 'sql12737060',
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js API');
});

// Get all tasks
app.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM tasks', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a task
app.post('/tasks', (req, res) => {
  const task = req.body.task;
  connection.query('INSERT INTO tasks (task) VALUES (?)', [task], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, task, completed: false });
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Task deleted' });
  });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;
  connection.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], (err) => {
    if (err) throw err;
    res.json({ message: 'Task updated' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
