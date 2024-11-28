const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./notes.db", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
    db.run(
      "CREATE TABLE IF NOT EXISTS notes ( id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)",
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela:", err.message);
        }
      }
    );
  }
});
module.exports = db;