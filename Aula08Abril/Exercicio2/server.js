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

    if (!username || !email || !senha) {
        return res.status(400).json({ error: 'Preencha todos os campos!' });
    }

    db.run(
        'INSERT INTO usuarios (username, email, senha) VALUES (?, ?, ?)',
        [username, email, senha],
        (err) => {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'E-mail já cadastrado!' });
                }
                console.error('Erro ao inserir no banco:', err.message);
                return res.status(500).json({ error: 'Erro no servidor ao cadastrar usuário.' });
            }

            res.json({ message: 'Usuário cadastrado com sucesso!' });
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


app.get('/lista', (req, res) =>{

    db.all(
        'SELECT * FROM usuarios',
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Erro no servidor' });
            }
            res.json(rows);
        }
    );
})

app.delete('/deletar/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID do usuário é obrigatório!' });
    }

    db.run(
        'DELETE FROM usuarios WHERE id = ?',
        [id],
        function (err) {
            if (err) {
                console.error('Erro ao deletar usuário:', err.message);
                return res.status(500).json({ error: 'Erro no servidor ao deletar usuário.' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado!' });
            }

            res.json({ message: 'Usuário deletado com sucesso!' });
        }
    );
});
