let desconto = 0.10;
function calcularDesconto(preco){
    return preco - (preco * desconto);
}
// Função assíncrona para buscar os dados do arquivo XML e exibir na tabela
async function carregarDados() {
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
            let nome = produtos[i].getElementsByTagName("nome")[0].textContent;
            let preco = produtos[i].getElementsByTagName("preco")[0].textContent;

            // Cria uma nova linha na tabela
            let newRow = tabelaBody.insertRow();
            
            // Adiciona as células de nome e preço na linha
            newRow.insertCell(0).textContent = nome;
            newRow.insertCell(1).textContent = parseFloat(preco).toFixed(2); // Formata o preço com duas casas decimais
            newRow.insertCell(2).textContent = calcularDesconto(parseFloat(preco)).toFixed(2); // Formata o preço com duas casas decimais
        }
    } catch (error) {
        // Caso ocorra um erro na requisição, exibe uma mensagem no console
        console.error("Erro ao carregar os dados:", error);
    }
}