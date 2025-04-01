//Recebe o id do campo e a mensagem a ser exibida
//Exibe uma mensagem de erro do campo correspondente
function exibirErro(campo, mensagem) {
    document.getElementById(`error-${campo}`).textContent = mensagem;
}
//Remove todas as mensagem de erro do formulário
//Chama a função exibirErro para limpar os erros dos campos
function limparErros() {
    exibirErro('nome', '');
    exibirErro('email', '');
    exibirErro('telefone', '');
    exibirErro('id', '');
}
//Valida os campos do formulário antes do envio
//Retorna 'true' se todos os campos estiverem preenchidos corretamente e 'false' caso o contrário
function validarCampor() {
    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let telefone = document.getElementById('telefone').value.trim();

    let valido = true;//Variavel armazena se a validação esta correta
    limparErros();//remove mensagem de erro antes de validar

    if (nome === '') {
        exibirErro('nome', 'Nome é obrigatório.');
        valido = false;
    }
    if (email === '') {
        exibirErro('email', 'Email é obrigatório.');
        valido = false;
    } else if (!email.includes('@')) {
        exibirErro('email', 'Email inválido.');
        valido = false;
    }
    if (telefone === '') {
        exibirErro('telefone', 'Telefone é obrigatório.');
        valido = false;
    }
    return valido;
}

//Função para cadastrar usuarios
function cadastrar() {
    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let telefone = document.getElementById('telefone').value.trim();

    limparErros();
    if (nome === '') {
        exibirErro('nome', 'Nome é obrigatório.');
        return;
    }
    if (email === '') {
        exibirErro('email', 'Email é obrigatório.');
        return;
    } else if (!email.includes('@')) {
        exibirErro('email', 'Email inválido.');
        return;
    }
    if (telefone === '') {
        exibirErro('telefone', 'Telefone é obrigatório.');
        return;
    }
    fetch('/cadastrar', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, telefone })
    })
        .then(response => response.json())//Converte a resposta do servidor para json
        .then(data => alert('Usuário cadastrado com sucesso!'))
        .catch(error => console.error('Erro', error));

    document.getElementById('formulario').reset();    
}

function atualizar() {
    limparErros();

    const id = document.getElementById('id').value.trim();
    if (id === "") {
        exibirErro('id','Id é obrigatório para atualizar um usuário!');
        return;
    } else if (id <= 0) {
        exibirErro('id', 'Id inválido!')
        return;
    }

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    if (nome === '') {
        exibirErro('nome', 'Nome é obrigatório.');
        return;
    }
    if (email === '') {
        exibirErro('email', 'Email é obrigatório.');
        return;
    } else if (!email.includes('@')) {
        exibirErro('email', 'Email inválido.');
        return;
    }
    if (telefone === '') {
        exibirErro('telefone', 'Telefone é obrigatório.');
        return;
    }

    fetch(`/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, telefone })
    })
        .then(response => {
            if (response.ok) {
                alert('Usuário atualizado com sucesso!');
            } else {
                return response.json().then(data => {
                    throw new Error(data.erro || 'Erro ao atualizar usuário.');
                });
            }
        })
        .catch(error => {
            console.error('Erro: ' + error);
        });
    document.getElementById('formulario').reset();
}


function excluir() {
    limparErros();
    const id = document.getElementById('id').value.trim();
    if (id === "") {
        exibirErro('id', 'Id é necessário para deletar um usuário!')
        return;
    } else if (id <= 0) {
        exibirErro('id', 'Id inválido!')
        return;
    }

    fetch(`/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                alert('Usuário excluído com sucesso!');
            } else {
                return response.json().then(data => {
                    throw new Error(data.erro || 'Erro ao excluir usuário.');
                });
            }

        })
        .catch(error => {
            console.error('Erro: ' + error);
        });
    document.getElementById('formulario').reset();
}