function displayData(){
    const nota = document.getElementById("nota").value;
    const outputDiv = document.getElementById("output");
    if (nota < 10 & nota > 0){
        if(nota >= 6){
            outputDiv.innerHTML = `
            <h2><strong> O aluno tirou uma nota maior que 6, por isso foi aprovado.</strong></h2>
            ` ;
        } else if(nota < 4){
            outputDiv.innerHTML = `
            <h2><strong> O aluno tirou uma nota menor que 4, por isso foi reprovado.</strong></h2>
            ` ;
        }else{
            outputDiv.innerHTML = `
            <h2><strong> O aluno tirou uma nota entre 4 e 6, por isso está de recuparação.</strong></h2>
            ` ;
        }
    } else{
        outputDiv.innerHTML = `
            <h2><strong> A nota precisa estar entre  0 e 10.</strong></h2>
            ` ;
    }
}