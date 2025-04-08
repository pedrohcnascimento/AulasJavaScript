/* 
    Exibe uma mensagem de erro abaixo do campo correspondente. 
    Recebe o ID do campo e a mensagem de erro a ser exibida. 
*/
function exibirErro(campo, mensagem) {
    document.getElementById(`erro-${campo}`).textContent = mensagem;
}

/* 
    Remove todas as mensagens de erro do formulário.
    Chama a função `exibirErro` para limpar os erros dos campos nome, email e telefone.
*/
function limparErros() {
    exibirErro('nome', '');     // Limpa erro do campo Nome
    exibirErro('email', '');    // Limpa erro do campo E-mail
    exibirErro('telefone', ''); // Limpa erro do campo Telefone
}

/* 
    Valida os campos do formulário antes do envio. 
    Retorna `true` se todos os campos estiverem preenchidos corretamente, 
    e `false` caso contrário. 
*/
function validarCampos() {
    // Obtém os valores dos campos e remove espaços extras
    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let telefone = document.getElementById('telefone').value.trim();
    
    let valido = true; // Variável para armazenar se a validação está correta

    limparErros(); // Remove mensagens de erro antes de validar novamente

    /* Validação do campo Nome */
    if (nome === '') { 
        exibirErro('nome', 'O nome é obrigatório.'); // Exibe erro caso o campo esteja vazio
        valido = false;
    }

    /* Validação do campo E-mail */
    if (email === '') { 
        exibirErro('email', 'O e-mail é obrigatório.'); // Exibe erro caso o e-mail esteja vazio
        valido = false;
    } else if (!email.includes('@')) { 
        exibirErro('email', 'Informe um e-mail válido.'); // Exibe erro se o e-mail não contiver '@'
        valido = false;
    }

    /* Validação do campo Telefone */
    if (telefone === '') { 
        exibirErro('telefone', 'O telefone é obrigatório.'); // Exibe erro caso o telefone esteja vazio
        valido = false;
    }

    return valido; // Retorna `true` se todos os campos forem válidos, caso contrário `false`
}

/* 
    Função para cadastrar um novo usuário.
    Verifica se os campos estão preenchidos corretamente antes de exibir a mensagem de sucesso.
*/
function cadastrar() {
    if (validarCampos()) { // Se os campos estiverem corretos
        alert('Cadastro realizado com sucesso!'); // Exibe mensagem de sucesso
        document.getElementById('formulario').reset(); // Limpa o formulário
    }
}

   // Função para cadastrar usuário no banco SQLite3
   function cadastrar() {
    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let telefone = document.getElementById('telefone').value.trim();
    
    if (nome === '' || email === '' || telefone === '') {
        alert('Preencha todos os campos!');
        return;
    }
    
    fetch('/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, telefone })
    })
    .then(response => response.json()) // Converte a resposta do servidor para JSON
    .then(data => alert('Usuário cadastrado com sucesso!')) // Exibe um alerta informando
    .catch(error => console.error('Erro:', error)); // Captura e exibe erros no console caso ocorra algum problema na requisição
}

// Função para atualizar usuário no banco
function atualizar() {
    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let telefone = document.getElementById('telefone').value.trim();
    
    if (nome === '' || email === '' || telefone === '') {
        alert('Preencha todos os campos!');
        return;
    }
    
    fetch('/atualizar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, telefone })
    })
    .then(response => response.json())
    .then(data => alert('Usuário atualizado com sucesso!'))
    .catch(error => console.error('Erro:', error));
}

// Função para excluir usuário do banco
function excluir() {
    let nome = document.getElementById('nome').value.trim();
    
    if (nome === '') {
        alert('Informe o nome para excluir!');
        return;
    }
    
    fetch('/excluir', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome })
    })
    .then(response => response.json())
    .then(data => alert('Usuário excluído com sucesso!'))
    .catch(error => console.error('Erro:', error));
}