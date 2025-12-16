const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./betting.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      match TEXT,
      rate REAL,
      amount REAL,
      potentialWin REAL
    )
  `);
});

module.exports = db;

