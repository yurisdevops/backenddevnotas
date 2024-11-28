const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get("/notes", (req, res) => {
  db.all("SELECT * FROM notes", [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar notas" });
    }
    res.json(rows);
  });
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ error: "Título e conteúdo são obrigatórios." });
  }

  db.run(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao inserir nota" });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM notes WHERE id = ?", id, function (err) {
    if (err) {
      console.error("Erro ao deletar a nota:", err.message);
      return res.status(500).json({ error: "Erro ao deletar a nota" });
    }
    if (this.changes === 0) {
      // Se nenhuma linha foi afetada, significa que o ID não existe
      return res.status(404).json({ error: "Nota não encontrada" });
    }
    res.json({ message: "Nota Deletada" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
