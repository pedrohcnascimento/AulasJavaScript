let loginContainer = document.getElementById("loginContainer");
let cadastroContainer = document.getElementById("cadastroContainer");

function alternarFormulario(formulario) {
    const loginContainer = document.getElementById("loginContainer");
    const cadastroContainer = document.getElementById("cadastroContainer");
    const botaoLogin = document.getElementById("botaoLogin");
    const botaoCadastro = document.getElementById("botaoCadastro");

    if (formulario === "login") {
        loginContainer.style.display = "flex";
        cadastroContainer.style.display = "none";
        botaoLogin.style.display = "none";
        botaoCadastro.style.display = "block";
        botaoCadastro.style.position = "absolute";
        botaoCadastro.style.top = "10px";
        botaoCadastro.style.left = "10px";
    } else if (formulario === "cadastro") {
        cadastroContainer.style.display = "flex";
        loginContainer.style.display = "none";
        botaoCadastro.style.display = "none";
        botaoLogin.style.display = "block";
        botaoLogin.style.position = "absolute";
        botaoLogin.style.top = "10px";
        botaoLogin.style.left = "10px";
    }
}

function cadastrar(event) {
    event.preventDefault();

    const nomeUsuario = document.getElementById('username').value.trim();
    const email = document.getElementById('emailCadastro').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmacaoSenha = document.getElementById('confirmacaoSenha').value.trim();

    if (!nomeUsuario || !email || !senha || !confirmacaoSenha) {
        alert('Preencha todos os campos!');
        return;
    }
    if (!email.includes("@")) {
        alert("Informe um e-mail válido!");
        return;
    }
    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres!");
        return;
    }
    if (senha !== confirmacaoSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    fetch('/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: nomeUsuario,
            email: email,
            senha: senha
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.error || 'Erro ao cadastrar usuário');
            });
        }
        return response.json();
    })
    .then(data => {
        alert(data.message || 'Usuário cadastrado com sucesso!');
        console.log('Resposta do servidor:', data);
        cadastroContainer.reset();
    })
    .catch(error => {
        alert(`Erro: ${error.message}`);
        console.error('Erro ao cadastrar:', error);
    });
}

function login(event) {
    event.preventDefault();

    let usernameEmail = document.getElementById('username/email').value.trim();
    let senha = document.getElementById('password').value.trim();

    if (usernameEmail === '' || senha === '') {
        alert('Preencha todos os campos!');
        return;
    }

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usernameEmail: usernameEmail,
            senha: senha
        })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Credenciais inválidas');
            }
            return response.json();
        })
        .then((data) => {
            alert(data.message);
            console.log('Usuário logado:', data.user);
            window.open('https://www.youtube.com/watch?v=lx0eir2xF5E&pp=ygUYZXUgb2RlaW8gZnJvbnRlbmQgbXVzaWNh', '_blank'); 
        })
        .catch((error) => {
            alert(error.message);
            console.error('Erro:', error);
        });

    loginContainer.reset();
}