let produtos = [];

        document.getElementById("produtoForm").addEventListener("submit", function(event) {
            event.preventDefault();
            let index = document.getElementById("editIndex").value;
            let produto = document.getElementById("produto").value;
            let categoria = document.getElementById("categoria").value;
            let disponibilidade = document.querySelector('input[name="disponibilidade"]:checked').value;
            let preco = parseFloat(document.getElementById("preco").value).toFixed(2);
            
            if (index === "-1") {
                produtos.push({ produto, categoria, disponibilidade, preco });
            } else {
                produtos[index] = { produto, categoria, disponibilidade, preco };
                document.getElementById("editIndex").value = "-1";
            }
            
            atualizarTabela();
            document.getElementById("produtoForm").reset();
        });

        function atualizarTabela() {
            let tabelaBody = document.getElementById("tabelaBody");
            tabelaBody.innerHTML = "";

            produtos.forEach((item, index) => {
                let newRow = tabelaBody.insertRow();
                newRow.insertCell(0).textContent = item.produto;
                newRow.insertCell(1).textContent = item.categoria;
                newRow.insertCell(2).textContent = item.disponibilidade;
                newRow.insertCell(3).textContent = item.preco;
                
                let cellAcoes = newRow.insertCell(4);
                let botaoEditar = document.createElement("button");
                botaoEditar.textContent = "Editar";
                botaoEditar.onclick = function() {
                    editarProduto(index);
                };

                let botaoExcluir = document.createElement("button");
                botaoExcluir.textContent = "Excluir";
                botaoExcluir.onclick = function() {
                    excluirProduto(index);
                };
                
                cellAcoes.appendChild(botaoEditar);
                cellAcoes.appendChild(botaoExcluir);
                botaoEditar.style.marginRight = "5px";
            });
        }

        function excluirProduto(index) {
            produtos.splice(index, 1);
            atualizarTabela();
        }

        function editarProduto(index) {
            document.getElementById("editIndex").value = index;
            document.getElementById("produto").value = produtos[index].produto;
            document.getElementById("categoria").value = produtos[index].categoria;
            document.querySelector(`input[name="disponibilidade"][value="${produtos[index].disponibilidade}"]`).checked = true;
            document.getElementById("preco").value = produtos[index].preco;
        }
        function salvarDadosJSON() {
            const jsonData = JSON.stringify(produtos, null, 2);
            const blob = new Blob([jsonData], { type: "application/json" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "produtos.json";
            link.click();
            URL.revokeObjectURL(link.href);
        }
         async function carregarDados() {
            try {
                // Faz a requisição para obter o conteúdo do arquivo 'produtos.json'
                // O uso de 'await' faz com que o código aguarde a resposta antes de continuar
                const response = await fetch('bd/produtos.json'); 
                
                // Converte a resposta para um objeto JSON
                // 'await' é necessário porque a conversão do JSON também é assíncrona
                const data = await response.json();

                produtos = data; // Atribui o JSON convertido à variável 'produtos'
                atualizarTabela(); // Atualiza a tabela com os dados obtidos
            } catch (error) {
                // Caso ocorra um erro na requisição, exibe uma mensagem no console
                console.error("Erro ao carregar os dados:", error);
            }
        }