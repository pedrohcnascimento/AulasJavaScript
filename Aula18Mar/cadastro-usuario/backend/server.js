const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
// Conectar ao banco de dados SQLite
const db = new sqlite3.Database("users.db", (err) => {
 if (err) return console.error(err.message);
 console.log("Conectado ao banco de dados SQLite.");
});
// Criar tabela de usuários se não existir
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");
// Rota para cadastrar um usuário
app.post("/users", (req, res) => {
 const { name, email } = req.body;
 db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email],
function(err) {
 if (err) return res.status(500).json({ error: err.message });
 res.json({ id: this.lastID });
 });
});
// Rota para listar todos os usuários
app.get("/users", (req, res) => {
 db.all("SELECT * FROM users", [], (err, rows) => {
 if (err) return res.status(500).json({ error: err.message });
 res.json(rows);
 });
});
// Iniciar o servidor na porta 3000
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));