const { Pool } = require("pg");

// Configurações da conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: "yuridevops", // Substitua pelo seu usuário do PostgreSQL
  host: "localhost", // Ou o host do seu servidor PostgreSQL
  database: "db-devnotas", // Nome do banco de dados
  password: "90352415", // Substitua pela sua senha
  port: 5432, // Porta padrão do PostgreSQL
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
