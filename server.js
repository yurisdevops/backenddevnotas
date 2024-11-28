const express = require("express");
const cors = require("cors");
const db = require("./database"); // Importa o pool de conexão

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota para buscar todas as notas
app.get("/notes", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM notes");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar notas:", err);
    res.status(500).json({ error: "Erro ao buscar notas" });
  }
});

// Rota para adicionar uma nova nota
app.post("/notes", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ error: "Campos 'title' e 'content' são obrigatórios." });
  }

  try {
    const result = await db.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING id",
      [title, content]
    );
    res
      .status(201)
      .json({ message: "Nota salva com sucesso!", id: result.rows[0].id });
  } catch (err) {
    console.error("Erro ao salvar nota:", err);
    res.status(500).json({ error: "Erro ao salvar nota" });
  }
});

// Rota para deletar uma nota
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM notes WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Nota não encontrada" });
    }
    res.json({ message: "Nota deletada com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar nota:", err);
    res.status(500).json({ error: "Erro ao deletar nota" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
