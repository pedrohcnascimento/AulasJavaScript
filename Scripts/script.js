async function carregarDados() { 
    const resposta = await fetch("http://localhost:3000/users"); 
    const dados = await resposta.json(); 

    let lista = document.getElementById("lista"); 
    lista.innerHTML = ""; 

    dados.forEach(user => { 
        let item = document.createElement("li"); 
        item.textContent = `${user.nome} - ${user.email}`;
        
        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.onclick = () => excluirCadastro(user.id);
        item.appendChild(botaoExcluir);

        lista.appendChild(item); 
    }); 
} 

async function adicionarUsuario() { 
    const nome = document.getElementById("nome").value; 
    const email = document.getElementById("email").value; 

    

    const resposta = await fetch("http://localhost:3000/users", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ nome, email }) 
    }); 

    if (resposta.ok) { 
        carregarDados(); 
    } 
}

async function excluirCadastro(id) {
    const resposta = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE"
    });

    if (resposta.ok) {
        carregarDados();
    } else {
        alert("Erro ao excluir o cadastro");
    }
} 

carregarDados(); 