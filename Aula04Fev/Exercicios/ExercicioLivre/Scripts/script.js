 // Adiciona um evento ao formulário para capturar o envio dos dados
 document.getElementById("usuarioForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que a página recarregue ao enviar o formulário
    console.log("Formulário enviado!");
    
    // Captura os valores dos campos de entrada
    var nome = document.getElementById("nome").value;
    var cargo = document.getElementById("cargo").value;
    var presenca = document.querySelector('input[name="presenca"]:checked').value;
    var cpf = document.getElementById("cpf").value;

    // Mensagens de log para depuração
    console.log("Nome:", nome); 
    console.log("Cargo:", cargo); 
    console.log("Presença:", presenca); 
    console.log("CPF:", cpf); 
    
    // Obtém o corpo da tabela onde os dados serão inseridos
    var tabelaBody = document.getElementById("tabelaBody");
    var newRow = tabelaBody.insertRow(); // Cria uma nova linha na tabela
    //Cria células na linha recém-criada e insere os valores dos campos de entrada
    newRow.insertCell(0).textContent = nome; 
    newRow.insertCell(1).textContent = cargo; 
    newRow.insertCell(2).textContent = presenca; 
    newRow.insertCell(3).textContent = parseInt(cpf); 

    // Limpa o formulário após adicionar os dados
    document.getElementById("usuarioForm").reset();
});