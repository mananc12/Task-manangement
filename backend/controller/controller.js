const db = require("../db/db"); // Import the database configuration

//home page logic
const home = async (req, res) => {
  console.log("Fetching tasks...");
  try {
    const tasks = await db.prepare("SELECT * FROM tasks").all();
    res.status(200).json({ message: "Successfully loaded...", tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//post request logic
const post = (req, res) => {
  const { title, description } = req.body;

  try {
    const insert = db.prepare(
      "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)"
    );
    const newTask = insert.run(title, description, 0); // Use 0 instead of false

    res.json({
      id: newTask.lastInsertRowid,
      title,
      description,
      completed: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//patch request logic
const patch = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const update = db.prepare("UPDATE tasks SET completed = ? WHERE id = ?");
    update.run(completed ? 1 : 0, id);

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//delete request logic
const deleteIt = (req, res) => {
  const { id } = req.params;

  try {
    const deleteTask = db.prepare("DELETE FROM tasks WHERE id = ?");
    deleteTask.run(id);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { home, post, patch, deleteIt };
