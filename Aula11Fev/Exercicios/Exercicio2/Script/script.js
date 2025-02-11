// Array para armazenar os produtos adicionados
let agendamentos = [];

// Captura o evento de envio do formulário e adiciona os dados na tabela
document.getElementById("pacienteForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Obtém os valores inseridos no formulário
    let index = document.getElementById("editIndex").value;
    var nomePaciente = document.getElementById("nomePaciente").value;
    var medicoResponsavel = document.getElementById("medicoResponsavel").value;
    var especialidadeMedica = document.getElementById("especialidadeMedica").value;
    var precoConsulta = parseFloat(document.getElementById("precoConsulta").value).toFixed(2); // Formata o preço para duas casas decimais
    var diaHoraConsulta = document.getElementById("diaHoraConsulta").value;

    if (index === "-1") {
        agendamentos.push({ nomePaciente, medicoResponsavel, especialidadeMedica, precoConsulta, diaHoraConsulta });
    } else {
        agendamentos[index] = { nomePaciente, medicoResponsavel, especialidadeMedica, precoConsulta, diaHoraConsulta };
        document.getElementById("editIndex").value = "-1";
    }
    
    // Adiciona o produto ao array

    // Atualiza a tabela
    atualizarTabela();

    // Limpa o formulário após a adição dos dados
    document.getElementById("pacienteForm").reset();
});

// Função para atualizar a tabela sempre que um produto for adicionado ou removido
function atualizarTabela() {
    var tabelaBody = document.getElementById("tabelaBody");
    tabelaBody.innerHTML = ""; // Limpa a tabela antes de recriar os itens

    agendamentos.forEach((agendamentos, index) => {
        var newRow = tabelaBody.insertRow();

        newRow.insertCell(0).textContent = agendamentos.nomePaciente;
        newRow.insertCell(1).textContent = agendamentos.medicoResponsavel;
        newRow.insertCell(2).textContent = agendamentos.especialidadeMedica;
        newRow.insertCell(3).textContent = agendamentos.precoConsulta;
        newRow.insertCell(4).textContent = agendamentos.diaHoraConsulta;

        // Cria um botão de exclusão para remover o item
        var cellAcoes = newRow.insertCell(5);
        var botaoExcluir = document.createElement("button");
        var botaoEditar = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoEditar.textContent = "Editar";

        // Define a função do botão de exclusão, chamando excluirProduto(index) quando clicado
        botaoExcluir.onclick = function() {
            excluirAgendamento(index);
        };

        botaoEditar.onclick = function() {
            editarAgendamento(index);
        };

        // Adiciona o botão de exclusão dentro da célula da tabela
        // appendChild() é usado para inserir o botão dentro da célula <td>
        cellAcoes.appendChild(botaoEditar);
        cellAcoes.appendChild(botaoExcluir);
    });
}

function editarAgendamento(index) {
    document.getElementById("editIndex").value = index;
    document.getElementById("nomePaciente").value = agendamentos[index].nomePaciente;
    document.getElementById("medicoResponsavel").value = agendamentos[index].medicoResponsavel;
    document.getElementById("especialidadeMedica").value = agendamentos[index].especialidadeMedica;
    document.getElementById("precoConsulta").value = agendamentos[index].precoConsulta;
    document.getElementById("diaHoraConsulta").value = agendamentos[index].diaHoraConsulta;
}

// Função para excluir um produto da lista
function excluirAgendamento(index) {
    // splice() remove um item do array, especificando o índice e a quantidade a ser removida
    // No caso, removemos 1 item no índice fornecido
    agendamentos.splice(index, 1);

    // Atualiza a tabela após a exclusão
    atualizarTabela();
}

// Função para salvar os dados cadastrados em um arquivo JSON
function salvarDadosJSON() {
    // Converte o array 'produtos' para uma string JSON formatada
    const jsonData = JSON.stringify(agendamentos, null, 2);

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
}