const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks");

app.use(express.json());
app.use("/api", tasksRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the To-Do List API");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
