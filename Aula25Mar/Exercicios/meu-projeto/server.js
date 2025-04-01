const express = require('express');
const path = require('path');
const cors = require('cors');
const sqlite3 =  require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./usuarios.bd');

app.use(express.json());
app.use(cors());

//Criar tabela de usuários se não existir
db.run(`CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT NOT NULL
)`);

//middleware para validar dados do usuário
const validarUsuario = (req, res, next) => {
    const {nome, email, telefone} = req.body;
    if(!nome || !email || !telefone){
        return res.status(400).json({erro: 'Todos os campos são obrigatorios'});
    }
    next();
}

//Define a pasta public como estatica para servir arquivos html, css e js
app.use(express.static(path.join(__dirname, 'public')));
//Rota principal para o link da pagina principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Rota para listar todos os usuários
app.get('/usuarios', (req, res) =>{
    db.all(`
        SELECT id, nome, email, telefone from usuarios;`, //Rota do SQL para a seleção dos campos preenchidos
        [], //Array vazio pois não há parametros dinamicos na consulta
        (err, rows) =>{//Callback "Recebe o erro (se houver) e a linha retornada"
            if(err)
            return res.status(500).json({erro: err.message})//Retorna erro 500, caso tenha falha
            res.json(rows);//Retorna os dados obtidos do banco em json
        }
    )
});

//Rota para cadastrar usuario
app.post('/cadastrar', validarUsuario, (req, res) =>{
    //Obtem os dados eviados no corpo da requisição
    const {nome, email, telefone} = req.body;
    //Insere um novo usuario na tablea usuarios
    db.run(`
        INSERT INTO usuarios (nome, email, telefone)
        VALUES(?, ?, ?)`, 
        [nome, email, telefone],// Valores que serão inseridos
        function(err){//Se houver um erro, uma função é passada como argumento
            if(err){
                if(err.code === 'SQLITE_CONSTRAINT'){//Verifica uma violação
                    return res.status(400).json({erro: 'Email já cadastrado'})
                }
                return res.status(500).json({erro: err.message})
            }
            res.json({id: this.lastId, mensagem:'Usuario cadastrado com sucesso'});
        }
    )
});

//Rota para deletar usuario
app.delete('/usuarios/:id', (req, res) =>{
    const {id} = req.params
    db.run(`
        DELETE FROM usuarios WHERE id = ?`,
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ erro: 'Usuário não encontrado' });
            }
            res.json({ mensagem: 'Usuário excluído com sucesso' });
        }
    )

})

//Rota para atualizar usuario
app.put('/usuarios/:id', (req, res) => {
    const {id} = req.params;
    const {nome, email, telefone} = req.body;
    db.run(`
        UPDATE usuarios SET nome = ?, email = ?, telefone = ? WHERE id = ?`,
        [nome, email, telefone, id],
        function(err){
            if(err){
                return res.status(500).json({erro: err.message});
            }
            if(this.changes === 0){
                return res.status(404).json({erro: 'Usuario não encontrado'});
            }
            res.json({mensagem: 'Usuario atualizado com sucesso'});
        }
    )
})

//Define a porta de IP
const PORT = 3000;
const HOST = '0.0.0.0';//Permite conexões de outros dispositivos na rede
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://${HOST}:${PORT}`);
    console.log(`Acesse via IP LOCAL: http://10.83.138.62:${PORT}`);//Substitue pelo ip realocado
    console.log('Para derrubar o servidor: ctrl + c');
});