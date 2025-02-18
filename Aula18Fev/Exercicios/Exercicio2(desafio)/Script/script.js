let produtos = [];

function atualizarTabela() {
    let tabelaBody = document.getElementById("tabelaBody");
    tabelaBody.innerHTML = ""; // Limpa a tabela antes de atualizar

    produtos.forEach(produto => {
        let newRow = tabelaBody.insertRow();
        newRow.insertCell(0).textContent = produto.nome;
        newRow.insertCell(1).textContent = produto.categoria;
        newRow.insertCell(2).textContent = parseFloat(produto.preco).toFixed(2);
        let cellAcoes = newRow.insertCell(3);
        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.onclick = () => excluirProduto(produtos.indexOf(produto));

        let botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.onclick = () => editarProduto(produtos.indexOf(produto));

        cellAcoes.appendChild(botaoEditar);
        cellAcoes.appendChild(botaoExcluir);
    });
}

async function carregarDados() {

    if (File.name == "produtos.xml"){
        try {
            // Faz a requisição para obter o conteúdo do arquivo 'produtos.xml'
            // O uso de 'await' faz com que o código aguarde a resposta antes de continuar
            const response = await fetch('produtos.xml'); 
            
            // Obtém o conteúdo do arquivo como texto
            const text = await response.text(); 
    
            // Cria um parser para interpretar o conteúdo XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "application/xml");
    
            // Obtém a lista de elementos <produto> do XML
            const produtos = xmlDoc.getElementsByTagName("produto");
    
            // Seleciona o corpo da tabela onde os produtos serão exibidos
            let tabelaBody = document.getElementById("tabelaBody");
            
            // Limpa a tabela antes de adicionar novos dados, evitando duplicações
            tabelaBody.innerHTML = ""; 
    
            // Percorre cada item do XML e adiciona uma nova linha na tabela
            for (let i = 0; i < produtos.length; i++) {
                // Obtém os valores dos elementos <nome> e <preco>
                let nome = produtos[i].getElementById("nome")[0].textContent;
                let categoria = produtos[i].getElementById("categoria")[0].textContent;
                let preco = produtos[i].getElementById("preco")[0].textContent;
    
                // Cria uma nova linha na tabela
                let newRow = tabelaBody.insertRow();
                
                // Adiciona as células de nome e preço na linha
                newRow.insertCell(0).textContent = nome;
                newRow.insertCell(1).textContent = categoria;
                newRow.insertCell(2).textContent = parseFloat(preco).toFixed(2)

                let cellAcoes = newRow.insertCell(3);
                let btnEditar = document.createElement("button");
                btnEditar.textContent = "Editar";
                btnEditar.onclick = () => editarProduto(produtos.indexOf(produto));

                let btnExcluir = document.createElement("button");
                btnExcluir.textContent = "Excluir";
                btnExcluir.onclick = () => excluirProduto(produtos.indexOf(produto));

                cellAcoes.appendChild(btnEditar);
                cellAcoes.appendChild(btnExcluir);
            }
        } catch (error) {
            // Caso ocorra um erro na requisição, exibe uma mensagem no console
            console.error("Erro ao carregar os dados:", error);
        }
    } else if (File.name == "produtos.json"){
        try {
            // Faz a requisição para obter o conteúdo do arquivo 'produtos.json'
            // O uso de 'await' faz com que o código aguarde a resposta antes de continuar
            const response = await fetch('produtos.json'); 
            
            // Converte a resposta para um objeto JSON
            // 'await' é necessário porque a conversão do JSON também é assíncrona
            const produtos = await response.json();
            
            // Seleciona o corpo da tabela onde os produtos serão exibidos
            let tabelaBody = document.getElementById("tabelaBody");
            
            // Limpa a tabela antes de adicionar novos dados, evitando duplicações
            tabelaBody.innerHTML = ""; 
    
            // Percorre cada item do JSON e adiciona uma nova linha na tabela
            produtos.forEach(produto => {
                let newRow = tabelaBody.insertRow(); // Cria uma nova linha na tabela
                newRow.insertCell(0).textContent = produto.nome; 
                newRow.insertCell(1).textContent = produto.categoria;
                newRow.insertCell(1).textContent = parseFloat(produto.preco).toFixed(2);
            });
        } catch (error) {
            // Caso ocorra um erro na requisição, exibe uma mensagem no console
            console.error("Erro ao carregar os dados:", error);
        }
    } else {
        alert("Arquivo inválido");
        console.error("Arquivo inválido");
    }    
}

function excluirProduto(index) {
    produtos.splice(index, 1);
    atualizarTabela();
}
function editarProduto(index) {
    document.getElementById("nome").value = produtos[index].nome;
    document.getElementById("categoria").value = produtos[index].categoria;
    document.getElementById("preco").value = produtos[index].preco;
}