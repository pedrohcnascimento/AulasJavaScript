async function carregarDados() { 
    const resposta = await fetch("http://localhost:3000/tarefas"); 
    const dados = await resposta.json(); 

    let lista = document.getElementById("lista"); 
    lista.innerHTML = ""; 

    dados.forEach(tarefa => { 
        let item = document.createElement("li");
        item.innerHTML = `
            <span style="text-decoration: ${tarefa.concluida ? "line-through" : "none"};">
                Nome da tarefa:
                <strong>${tarefa.nome}</strong>
                Data de vencimento: <br> 
                 ${tarefa.dataVencimento} <br>
    
                <em>${tarefa.descricao}</em>
            </span>
            <div>
                <button onclick="editarTarefa(${tarefa.id})">Editar</button>
                <button onclick="marcarConcluida(${tarefa.id}, ${!tarefa.concluida})">
                    ${tarefa.concluida ? "Desmarcar" : "Concluir"}
                </button>
                <button onclick="excluirCadastro(${tarefa.id})">Excluir</button>
            </div>
        `;

        lista.appendChild(item); 
    }); 
} 

async function adicionarTarefa() { 
    const nome = document.getElementById("nome").value; 
    const dataVencimento = document.getElementById("dataVencimento").value;
    const descricao = document.getElementById("descricao").value; 

    if(!nome || !dataVencimento || !descricao){
        alert("Por favor, preencha todos os campos");
        return;
    }    

    const resposta = await fetch("http://localhost:3000/tarefas", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ nome, dataVencimento , descricao }) 
    }); 

    if (resposta.ok) { 
        carregarDados(); 
        document.getElementById("nome").value = "";
        document.getElementById("dataVencimento").value = "";
        document.getElementById("descricao").value = "";
    } 
}

async function editarTarefa(id){
    const nome = prompt("Novo nome: ");
    const dataVencimento = prompt("Nova data de vencimento (YYYY-MM-DD): ");
    const descricao = prompt("Nova descrição: ");

    if(!nome || !dataVencimento || !descricao){
        alert("Por favor, preencha todos os campos");
        return;
    }

    const resposta = await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, dataVencimento, descricao })
    });

    if(resposta.ok){
        carregarDados();
    } else{
        alert("Erro ao editar tarefa.")
    }
}

async function marcarConcluida(id, concluida) {
    const resposta = await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concluida })
    });

    if (resposta.ok) {
        carregarDados();
    } else {
        alert("Erro ao atualizar status da tarefa");
    }    
}

async function excluirCadastro(id) {
    const resposta = await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE"
    });

    if (resposta.ok) {
        carregarDados();
    } else {
        alert("Erro ao excluir o cadastro");
    }
} 

carregarDados();