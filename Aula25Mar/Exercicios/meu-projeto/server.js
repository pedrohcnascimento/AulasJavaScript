const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
const HOST = '0.0.0.0';
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://${HOST}:${PORT}`);
    console.log(`Acesse via IP LOCAL: http://10.83.138.62:${PORT}`);
    console.log('Para derrubar o servidor: ctrl + c');
});