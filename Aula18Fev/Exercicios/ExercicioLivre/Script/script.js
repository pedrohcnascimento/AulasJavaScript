let produtos = []; // Array para armazenar os produtos
        let xmlString = ""; // Variável para armazenar o XML gerado

        function adicionarProduto() {
            // Obtém os valores dos campos do formulário
            let nome = document.getElementById("nome").value;
            let categoria = document.getElementById("categoria").value;
            let preco = document.getElementById("preco").value;

            if (nome === "" || categoria === "" || preco === "") {
                alert("Preencha todos os campos!");
                return;
            }

             // Adiciona o produto ao array
             produtos.push({ nome, categoria, preco });

            // Atualiza a tabela na tela
            atualizarTabela();

            // Limpa os campos do formulário
            document.getElementById("produtoForm").reset();
        }

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

        function excluirProduto(index) {
            produtos.splice(index, 1);
            atualizarTabela();
        }
        function editarProduto(index) {
            document.getElementById("nome").value = produtos[index].nome;
            document.getElementById("categoria").value = produtos[index].categoria;
            document.getElementById("preco").value = produtos[index].preco;
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
            document.getElementById("xmlOutput").textContent = xmlString;
        }

        function baixarXML() {
            if (xmlString === "") {
                alert("Primeiro gere o XML!");
                return;
            }            

            // Cria um objeto Blob para armazenar o XML
            let blob = new Blob([xmlString], { type: "application/xml" });
            let link = document.createElement("a");

            let now = new Date();
            let dateString = now.toISOString().replace(/[:.]/g, "-");


            // Cria um link para download do arquivo XML
            link.href = URL.createObjectURL(blob);
            link.download = `produtos_${dateString}.xml`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }   