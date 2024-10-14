const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all tasks
router.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new task
router.post("/tasks", (req, res) => {
  const { task } = req.body;
  db.query("INSERT INTO tasks (task) VALUES (?)", [task], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, task, completed: false });
  });
});

// Delete a task
router.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Task deleted" });
  });
});

// Update task completion status
router.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.query(
    "UPDATE tasks SET completed = ? WHERE id = ?",
    [completed, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Task updated" });
    }
  );
});

module.exports = router;
