const { Pool } = require("pg");

// Configurações da conexão com o banco de dados PostgreSQL
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://yuridevops:90352415@db-devnotas.onrender.com:5432/db-devnotas",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;

// Verificação e criação da tabela se não existir
pool.query(
  `CREATE TABLE IF NOT EXISTS notes (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
  )`,
  (err) => {
    if (err) {
      console.error("Erro ao criar tabela:", err.message);
    } else {
      console.log("Tabela 'notes' verificada/criada com sucesso.");
    }
  }
);

module.exports = pool;
