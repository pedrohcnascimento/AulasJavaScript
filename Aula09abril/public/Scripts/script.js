document.addEventListener('DOMContentLoaded', function () {
    const carousel = new bootstrap.Carousel('#carouselExample', {
        interval: 3000, // Tempo entre slides (3 segundos)
        ride: 'carousel'
    });
});

let loginContainer = document.getElementById("loginContainer");
let cadastroContainer = document.getElementById("cadastroContainer");

document.addEventListener('DOMContentLoaded', function () {
    const botaoLogin = document.getElementById('botaoLogin');
    const botaoCadastro = document.getElementById('botaoCadastro');

    if (botaoLogin) {
        botaoLogin.addEventListener('click', () => {
            window.location.href = '/login'; 
        });
    }

    if (botaoCadastro) {
        botaoCadastro.addEventListener('click', () => {
            window.location.href = '/cadastro'; 
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se há um hash na URL (ex: #sobre ou #contato)
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            // Rola suavemente até o elemento correspondente
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const menu = document.querySelector("nav.menu");

    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("show"); // Alterna a classe 'show' para exibir/ocultar o menu
    });
});

document.getElementById("botaoProdutos").addEventListener("click", () => {
    window.location.href = "/produtos";
});

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
            window.location.href = '/comandosAdm'; 
        })
        .catch((error) => {
            alert(error.message);
            console.error('Erro:', error);
        });

    loginContainer.reset();
}
function excluir() {
    let usernameEmail = document.getElementById('nome').value.trim();

    if (usernameEmail === '') {
        alert('Informe o nome para excluir!');
        return;
    }

    fetch('/excluir', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usernameEmail })
    })
        .then(response => response.json())
        .then(data => alert('Usuário excluído com sucesso!'))
        .catch(error => console.error('Erro:', error));

    formulario.reset();
}

function mostrarLista() {
    fetch('/usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const tabelaContainer = document.getElementById('tabela-container');
            const tabelaBody = document.querySelector('#tabela-usuarios tbody');

            // Limpa a tabela antes de preencher
            tabelaBody.innerHTML = '';

            // Preenche a tabela com os dados recebidos
            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.username}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.senha}</td>
                `;
                tabelaBody.appendChild(row);
            });

            // Exibe a tabela
            tabelaContainer.style.display = 'block';
        })
        .catch(error => console.error('Erro ao buscar lista de usuários:', error));
}
/*
const products = [
    { name: "Queijo coalho", category: "salgados", price: 8.90, original: 10.90, image: "https://images.tcdn.com.br/img/img_prod/1074417/espetinho_de_queijo_coalho_04_unids_400gr_289_1_9f43efd0eb8a42f51de08a32e52f53cd.jpg", description: "Espetinho de queijo coalho" },
    { name: "Bolo", category: "doces", price: 10.90, original: 15.90, image: "https://camptortas.com.br/wp-content/uploads/2024/06/B.Brigadeiro-Gourmet.jpg", description: "Bolo de chocolate trufado" },
    { name: "Suco de laranja", category: "bebidas", price: 10.00, original: 14.90, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIPFQqxyTpu5hxVS1R7q4f1mhSTFhQ1WJFqA&s", description: "Suco natural de laranja" },
    { name: "Lanche mini", category: "lanches", price: 19.90, original: 26.90, image: "https://www.comboiguassu.com.br/wp-content/uploads/2021/01/Lanchonetes-em-Foz-do-Iguacu-Melhores-hamburguerias-2.png.webp", description: "Lanche de carne com queijo" },
    { name: "Batata frita", category: "salgados", price: 22.90, original: 25.90, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEzZk4cE0_5Fao5IbEcxDgihw6Ahgb17UVlw&s", description: "Batata frita com bacon e cheddar" },
    { name: "Mousse", category: "doces", price: 12.00, original: 16.00, image: "https://www.receitasnestle.com.br/sites/default/files/srh_recipes/369562012750bd46ceaeef5d59a23229.jpg", description: "Creme de chocolate" },
    { name: "Drink", category: "bebidas", price: 20.00, original: 23.90, image: "https://content.paodeacucar.com/wp-content/uploads/2017/05/receitas-de-drinks-capa-2.jpg", description: "Bebida sem álcool" },
    {name: "pão", category: "salgados", price: 5.90, original: 7.90, image: "Imagens/imagem1.jpg", description: "Pão de padaria" },
    { name: "Lanche supremo", category: "lanches", price: 29.90, original: 36.90, image: "https://churrasco.coz.br/wp-content/uploads/2021/01/hamburguer-gourmet.jpg", description: "Lanche com o dobro de carne com queijo" },
];

function displayProducts(filteredProducts) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpa a lista de produtos

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="preco-original">R$ ${product.original.toFixed(2)}</p>
            <span>R$ ${product.price.toFixed(2)}</span>
        `;
        productList.appendChild(productDiv);
    });
}

function filterProducts() {
    const categoryFilter = document.getElementById('category').value;
    const searchFilter = document.getElementById('search').value.toLowerCase();

    const filteredProducts = products.filter(product => {
        const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
        const matchesSearch = product.name.toLowerCase().includes(searchFilter);
        return matchesCategory && matchesSearch;
    });

    displayProducts(filteredProducts);
}

// Inicializa com todos os produtos
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);

    // Event listeners para os filtros
    document.getElementById('category').addEventListener('change', filterProducts);
    document.getElementById('search').addEventListener('input', filterProducts);
});*/