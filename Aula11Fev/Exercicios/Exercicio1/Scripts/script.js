// Função assíncrona para buscar os dados do arquivo JSON e exibir na tabela
async function carregarDados() {
    try {
        // Faz a requisição para obter o conteúdo do arquivo 'produtos.json'
        // O uso de 'await' faz com que o código aguarde a resposta antes de continuar
        const response = await fetch('bd\\produtos.json'); 
        
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
            newRow.insertCell(0).textContent = produto.produto; // Insere o nome do produto na primeira célula
            newRow.insertCell(1).textContent = parseFloat(produto.preco).toFixed(2); // Formata e insere o preço na segunda célula
            newRow.insertCell(2).textContent = produto.categoria; // Insere a categoria na terceira célula
        });
    } catch (error) {
        // Caso ocorra um erro na requisição, exibe uma mensagem no console
        console.error("Erro ao carregar os dados:", error);
    }
}