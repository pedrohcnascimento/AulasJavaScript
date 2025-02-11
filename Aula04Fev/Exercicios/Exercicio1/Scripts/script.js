function displayData(){
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const outputDiv = document.getElementById("output");

    if(age < 0 ){
        if(age >= 18){
            outputDiv.innerHTML = `
            <h2>Dados preenchidos:</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Idade:</strong> ${age}</p>
            <p><strong><h2>Você é maior de idade</h2></strong></p>
        `;
        } else {
            outputDiv.innerHTML = `
            <h2>Dados preenchidos:</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Idade:</strong> ${age}</p>
            <p><strong><h2>Você não é maior de idade</h2></strong></p>
        `;
        }
    } else{
        outputDiv.innerHTML = `
            <h2><strong> A idadade precisa ser maior que zero.</strong></h2>
            ` ;
    }
}