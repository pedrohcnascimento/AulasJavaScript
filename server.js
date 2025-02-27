const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const e = require("express");
const app = express();
const PORT = 3000;
// Middleware 
app.use(cors());
app.use(bodyParser.json());
// Rota para obter os usuários 
app.get("/users", (req, res) => {
    fs.readFile("banco.json", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Erro ao ler o arquivo" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});
// Rota para adicionar um novo usuário 
app.post("/users", (req, res) => {
    fs.readFile("banco.json", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Erro ao ler o arquivo" });
        } else {
            let users = JSON.parse(data);
            const novoUsuario = req.body;
            const maxId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;
            novoUsuario.id = maxId + 1;
            users.push(novoUsuario);
            fs.writeFile("banco.json", JSON.stringify(users, null, 2), err => {
                if (err) {
                    res.status(500).json({ error: "Erro ao salvar" });
                } else {
                    res.status(201).json(novoUsuario);
                }
            });
        }
    });
});

// Rota para excluir um usuário
app.delete("/users/:id", (req, res) => {
    fs.readFile("banco.json", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Erro ao ler o arquivo" });
        } else {
            let users = JSON.parse(data);
            const userId = parseInt(req.params.id);
            users = users.filter(user => user.id !== userId);
            fs.writeFile("banco.json", JSON.stringify(users, null, 2), err => {
                if (err) {
                    res.status(500).json({ error: "Erro ao salvar" });
                } else {
                    res.status(204).end();
                }
            });
        }
    });
});
// Iniciar servidor 
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});