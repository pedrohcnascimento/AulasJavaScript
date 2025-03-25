const e = require("express");

function exibirErro(campo, mensagem) {
    document.getElementById(`error-${campo}`).textContent = mensagem;
}

function limparErros() {
    exibirErro('nome', '');
    exibirErro('email', '');
    exibirErro('telefone', '');
}

function validarCampor(){
    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let telefone = document.getElementById('telefone').value.trim();

    let valido = true;
    limparErros();
    
    if(nome === '') {
        exibirErro('nome', 'Nome é obrigatório.');
        valido = false;
    } 
    if(email === '') {
        exibirErro('email', 'Email é obrigatório.');
        valido = false;
    } else if(!email.includes('@')) {
        exibirErro('email', 'Email inválido.');
        valido = false;
    }
    if(telefone === '') {
        exibirErro('telefone', 'Telefone é obrigatório.');
        valido = false;
    }
    return valido;
}

function cadastrar(){
    if(validarCampor()){
        alert('Cadastro realizado com sucesso!');
        document.getElementById('formulario').reset();
        limparErros();
    }
}

function atualizar(){
    if(validarCampor()){
        alert('Dados atualizados com sucesso!');
        limparErros();
    }

}

function excluir(){
    document.getElementById('formulario').reset();
    limparErros();
    alert('Cadastro excluído com sucesso!');

}