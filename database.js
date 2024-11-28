const { Pool } = require("pg");

// Configuração do pool usando a URL do banco de dados
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render define esta variável automaticamente
  ssl: {
    rejectUnauthorized: false, // Necessário para conexões SSL no Render
  },
});

// Verificação e criação da tabela se não existir
pool.query(
  `CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL
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
