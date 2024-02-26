const Database = require("better-sqlite3");
const db = new Database("app.db");

const query = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title STRING NOT NULL,
    description STRING NOT NULL,
    completed BOOLEAN
  );
`;

try {
  db.exec(query);
  console.log("Database connected and tables created successfully.");
} catch (error) {
  console.error("Error connecting to the database:", error);
}

module.exports = db;
