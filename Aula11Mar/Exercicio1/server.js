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
app.get("/tarefas", (req, res) => {
    fs.readFile(`${__dirname}/BD/tarefas.json`, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Erro ao ler o arquivo" });
        } else {
            res.json(JSON.parse(data));
        }
    });
});
// Rota para adicionar um novo usuário 
app.post("/tarefas", (req, res) => {
    fs.readFile(`${__dirname}/BD/tarefas.json`, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Erro ao ler o arquivo" });
        } else {
            let tarefas = JSON.parse(data);
            const novaTarefa = req.body;
            const maxId = tarefas.length > 0 ? Math.max(...tarefas.map(tarefa => tarefa.id)) : 0;
            novaTarefa.id = maxId + 1;
            novaTarefa.dataCriacao = new Date().toISOString().split("T")[0];
            novaTarefa.concluida = false;
            tarefas.push(novaTarefa);
            fs.writeFile(`${__dirname}/BD/tarefas.json`, JSON.stringify(tarefas, null, 2), err => {
                if (err) {
                    res.status(500).json({ error: "Erro ao salvar" });
                } else {
                    res.status(201).json(novaTarefa);
                }
            });
        }
    });
});

app.put("/tarefas/:id", (req, res) => {
    fs.readFile(`${__dirname}/BD/tarefas.json`, (err, data) => {
        if(err) {
            res.status(500).json({ error: "Erro ao ler o arquivo" });
        } else {
            let tarefas = JSON.parse(data);
            const tarefaId = parseInt(req.params.id);
            const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id === tarefaId);

            if(tarefaIndex !== -1){
                tarefas[tarefaIndex] = { ...tarefas[tarefaIndex], ...req.body };
                fs.writeFile(`${__dirname}/BD/tarefas.json`, JSON.stringify(tarefas, null, 2), err => {
                    if(err){
                        res.status(500).json({ error: "Erro ao salvar" });
                    } else {
                        res.json(tarefas[tarefaIndex]);
                    }
                });
            }
        }
    });
});

// Rota para excluir um usuário
app.delete("/tarefas/:id", (req, res) => {
    fs.readFile(`${__dirname}/BD/tarefas.json`, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Erro ao ler o arquivo" });
        } else {
            let tarefas = JSON.parse(data);
            const tarefaId = parseInt(req.params.id);
            tarefas = tarefas.filter(tarefa => tarefa.id !== tarefaId);
            fs.writeFile(`${__dirname}/BD/tarefas.json`, JSON.stringify(tarefas, null, 2), err => {
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
