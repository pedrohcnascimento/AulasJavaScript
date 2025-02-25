let produtos = [];
let xmlString = "";

function login() {
    // Obtém os valores digitados nos campos de usuário e senha
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    let formatacao = document.querySelector('input[name="fileType"]:checked').value;
    // Verifica se o usuário e a senha estão corretos
    if (user === "admin" && pass === "1234" && formatacao === "xml") {
        // Esconde o container de login
        document.getElementById('loginContainer').classList.add('hidden');
        document.getElementById('produtoContainerXML').classList.remove('hidden');
    } else if (user === "admin" && pass === "1234" && formatacao === "json") {
        document.getElementById('loginContainer').classList.add('hidden');
        document.getElementById('produtoContainerJSON').classList.remove('hidden');
    } else {
        // Exibe um alerta caso os dados estejam incorretos
        alert("Usuário ou senha incorretos!");
    }
}

function adicionarProduto(tipo) {
    let nome = document.getElementById(`nome${tipo}`).value;
    let categoria = document.getElementById(`categoria${tipo}`).value;
    let preco = document.getElementById(`preco${tipo}`).value;

    if (nome == "" || categoria == "" || preco == "") {
        alert("Preencha todos os campos");
        return;
    }

    produtos.push({ nome, categoria, preco });
    atualizarTabela(tipo);

    document.getElementById(`produtoForm${tipo}`).reset();
}

function atualizarTabela(tipo) {
    let tabelaBody = document.getElementById(`tabelaBody${tipo}`);
    tabelaBody.innerHTML = ""; // Limpa a tabela antes de atualizar

    produtos.forEach((produto, index) => {
        let newRow = tabelaBody.insertRow();
        newRow.insertCell(0).textContent = produto.nome;
        newRow.insertCell(1).textContent = produto.categoria;
        newRow.insertCell(2).textContent = parseFloat(produto.preco).toFixed(2);

        let cellAcoes = newRow.insertCell(3);
        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.onclick = () => excluirProduto(index, tipo);

        let botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.onclick = () => editarProduto(index, tipo);

        cellAcoes.appendChild(botaoEditar);
        cellAcoes.appendChild(botaoExcluir);
    });
}

function gerarXML() {
    if (produtos.length === 0) {
        alert("Adicione pelo menos um produto antes de gerar o XML!");
        return;
    }

    // Cria a estrutura XML
    xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n<produtos>\n`;
    
    produtos.forEach(produto => {
        xmlString += `    <produto>\n`;
        xmlString += `        <nome>${produto.nome}</nome>\n`;
        xmlString += `        <categoria>${produto.categoria}</categoria>\n`;
        xmlString += `        <preco>${produto.preco}</preco>\n`;
        xmlString += `    </produto>\n`;
    });

    xmlString += `</produtos>`;

    // Exibe o XML na tela
    document.getElementById("geradorOutput").textContent = xmlString;
}

function baixarXML() {
    if (xmlString === "" || xmlString === null) {
        alert("Primeiro gere o XML!");
        return;
    }
   
    // Cria um objeto Blob para armazenar o XML
    let blob = new Blob([xmlString], { type: "application/xml" });
    let link = document.createElement("a");

    // Cria um link para download do arquivo XML
    link.href = URL.createObjectURL(blob);
    link.download = "produtos.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);
}

function baixarJson() {
    // Converte o array 'produtos' para uma string JSON formatada
    const jsonData = JSON.stringify(produtos, null, 3);

    // Cria um novo objeto Blob contendo os dados do JSON
    const blob = new Blob([jsonData], { type: "application/json" });

    // Cria um elemento <a> dinamicamente, que será usado para iniciar o download
    const link = document.createElement("a");

    // Define o atributo 'href' do link como uma URL gerada a partir do Blob
    link.href = URL.createObjectURL(blob);

    // Define o nome do arquivo para o download
    link.download = "produtos.json";

    // Simula um clique no link para iniciar o download automaticamente
    link.click();

    // Remove a URL do objeto Blob da memória para evitar vazamento de recursos
    URL.revokeObjectURL(link.href);

    document.body.removeChild(link);
}

async function carregarDados(tipo) {
    const inputFile = document.getElementById(`fileInput${tipo}`).files[0];

    if (!inputFile) {
        alert("Selecione um arquivo para carregar.");
        return;
    }

    const fileName = inputFile.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (fileExtension === "xml") {
        try {
            const response = await fetch(URL.createObjectURL(inputFile));
            const text = await response.text();

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "application/xml");

            const produtosXML = xmlDoc.getElementsByTagName("produto");

            let tabelaBody = document.getElementById(`tabelaBody${tipo}`);
            tabelaBody.innerHTML = "";

            for (let i = 0; i < produtosXML.length; i++) {
                let nome = produtosXML[i].getElementsByTagName("nome")[0].textContent;
                let categoria = produtosXML[i].getElementsByTagName("categoria")[0].textContent;
                let preco = produtosXML[i].getElementsByTagName("preco")[0].textContent;

                let newRow = tabelaBody.insertRow();
                newRow.insertCell(0).textContent = nome;
                newRow.insertCell(1).textContent = categoria;
                newRow.insertCell(2).textContent = parseFloat(preco).toFixed(2);

                let cellAcoes = newRow.insertCell(3);
                let botaoEditar = document.createElement("button");
                botaoEditar.textContent = "Editar";
                botaoEditar.onclick = () => editarProduto(i, tipo);

                let botaoExcluir = document.createElement("button");
                botaoExcluir.textContent = "Excluir";
                botaoExcluir.onclick = () => excluirProduto(i, tipo);

                cellAcoes.appendChild(botaoEditar);
                cellAcoes.appendChild(botaoExcluir);
            }
        } catch (error) {
            console.error("Erro ao carregar os dados do XML:", error);
        }
    } else if (fileExtension === "json") {
        try {
            const response = await fetch(URL.createObjectURL(inputFile));
            const produtosJSON = await response.json();

            let tabelaBody = document.getElementById(`tabelaBody${tipo}`);
            tabelaBody.innerHTML = "";

            produtosJSON.forEach((produto, index) => {
                let newRow = tabelaBody.insertRow();
                newRow.insertCell(0).textContent = produto.nome;
                newRow.insertCell(1).textContent = produto.categoria;
                newRow.insertCell(2).textContent = parseFloat(produto.preco).toFixed(2);

                let cellAcoes = newRow.insertCell(3);
                let botaoEditar = document.createElement("button");
                botaoEditar.textContent = "Editar";
                botaoEditar.onclick = () => editarProduto(index, tipo);

                let botaoExcluir = document.createElement("button");
                botaoExcluir.textContent = "Excluir";
                botaoExcluir.onclick = () => excluirProduto(index, tipo);

                cellAcoes.appendChild(botaoEditar);
                cellAcoes.appendChild(botaoExcluir);
            });
        } catch (error) {
            console.error("Erro ao carregar os dados do JSON:", error);
        }
    } else {
        alert("Arquivo inválido. Por favor, selecione um arquivo XML ou JSON.");
        console.error("Arquivo inválido");
    }
}
function excluirProduto(index, tipo) {
    produtos.splice(index, 1);
    atualizarTabela(tipo);
}

function editarProduto(index, tipo) {
    document.getElementById(`nome${tipo}`).value = produtos[index].nome;
    document.getElementById(`categoria${tipo}`).value = produtos[index].categoria;
    document.getElementById(`preco${tipo}`).value = produtos[index].preco;
}