const express = require('express');
const cors = require('cors');
const db = require('./database.js'); 
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.post('/cadastrar', (req, res) => {
    const { username, email, senha } = req.body;

    db.run(
        'INSERT INTO usuarios (username, email, senha) VALUES (?, ?, ?)',
        [username, email, senha],
        (err) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: 'Usuário cadastrado!' });
        }
    );
});

app.post('/login', (req, res) => {
    const { usernameEmail, senha } = req.body;

    db.get(
        'SELECT * FROM usuarios WHERE (username = ? OR email = ?) AND senha = ?',
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
