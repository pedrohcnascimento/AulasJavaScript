const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

const db = require('./database.js');
// Cadastrar usuário (CREATE)
app.post('/cadastrar', (req, res) => {
    const { nome, email, telefone } = req.body;

    if (telefone.length !== 11 || isNaN(telefone)) {
        return res.status(400).json({ error: 'O telefone deve conter exatamente 11 números.' });
    }
    db.run(
        'INSERT INTO usuarios (nome, email, telefone) VALUES (?, ?, ?)',
        [nome, email, telefone],
        (err) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: 'Usuário cadastrado!' });
        }
    );
});
// Atualizar usuário (UPDATE)
app.post('/atualizar', (req, res) => {
    const { nome, email, telefone } = req.body;

    if (telefone.length !== 11 || isNaN(telefone)) {
        return res.status(400).json({ error: 'O telefone deve conter exatamente 11 números.' });
    }
    db.run(
        'UPDATE usuarios SET email = ?, telefone = ? WHERE nome = ?',
        [email, telefone, nome],
        (err) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: 'Usuário atualizado!' });
        }
    );
});
// Excluir usuário (DELETE)
app.post('/excluir', (req, res) => {
    const { nome } = req.body;
    db.run(
        'DELETE FROM usuarios WHERE nome = ?',
        [nome],
        (err) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: 'Usuário excluído!' });
        }
    );
});

app.get('/usuarios', (req, res) => {
    db.all('SELECT * FROM usuarios', [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});