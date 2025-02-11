function displayData(){
    const numeroEscolhido = document.getElementById("numero").value;
    const outputDiv = document.getElementById("output");

    if (numeroEscolhido > 0){
        outputDiv.innerHTML = `
        <h2<Strong>O número escolhido é positivo</h2></strong>
        `;
    } else if(numeroEscolhido == 0){
        outputDiv.innerHTML = `
        <h2<Strong>O número escolhido é zero</h2></strong>
        `;
    }else{
        outputDiv.innerHTML = `
        <h2<Strong>O número escolhido é negativo</h2></strong>
        `;
    }
}