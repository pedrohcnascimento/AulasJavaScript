const express = require('express');
const cors = require('cors');
const db = require('./database.js'); 
const app = express();
const path = require('path');


app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

app.get('/produtos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'produtos.html'));
});

app.get('/comandosAdm', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'comandosAdm.html'));
});

app.post('/cadastrar', (req, res) => {
    const { username, email, senha } = req.body;

    if (!username || !email || !senha) {
        return res.status(400).json({ error: 'Preencha todos os campos!' });
    }

    db.run(
        'INSERT INTO clientes (username, email, senha) VALUES (?, ?, ?)',
        [username, email, senha],
        (err) => {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'E-mail já cadastrado!' });
                }
                console.error('Erro ao inserir no banco:', err.message);
                return res.status(500).json({ error: 'Erro no servidor ao cadastrar cliente.' });
            }

            res.json({ message: 'Cliente cadastrado com sucesso!' });
        }
    );
});

app.post('/login', (req, res) => {
    const { usernameEmail, senha } = req.body;

    db.get(
        'SELECT * FROM clientes WHERE (username = ? OR email = ?) AND senha = ?',
        [usernameEmail, usernameEmail, senha],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Erro no servidor' });
            }
            if (row) {
                res.json({ message: 'Login realizado com sucesso!', user: row });
            } else {
                res.status(401).json({ error: 'Credenciais inválidas' });
            }
        }
    );
});


app.post('/excluir', (req, res) => {
    const { usernameEmail } = req.body;
    db.run(
        'DELETE FROM clientes WHERE (username = ? OR email = ?)',
        [usernameEmail, usernameEmail],
        (err) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: 'Usuário excluído!' });
        }
    );
});

app.get('/usuarios', (req, res) => {
    db.all('SELECT * FROM clientes', [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});