 // Função para carregar os dados da tabela diretamente do servidor
 function carregarDados() {
    fetch('/atualizacao') // Faz uma requisição para o handler Java no servidor
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let html = '';

            // Constrói o HTML das linhas da tabela
            data.forEach(registro => {
                html += `<tr>
                            <td><img src="${registro.imagem}" alt="Imagem"></td>
                            <td>${registro.nome}</td>
                            <td>${registro.horario}</td>
                        </tr>`;
            });

            // Atualiza a tabela
            document.getElementById('registros').innerHTML = html;
        })
        .catch(error => console.error('Erro:', error));
}

// Atualiza a tabela ao carregar a página
carregarDados();

// Atualiza a tabela a cada 2 segundos
setInterval(carregarDados, 2000);