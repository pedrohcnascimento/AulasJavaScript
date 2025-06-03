document.getElementById('fileInput').addEventListener('change', function (e) {
    const preview = document.getElementById('filePreview');
    preview.innerHTML = '';
    Array.from(e.target.files).forEach(file => {
        let icon = 'bi-file-earmark';
        const ext = file.name.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) icon = 'bi-file-earmark-image';
        else if (['pdf'].includes(ext)) icon = 'bi-file-earmark-pdf';
        else if (['doc', 'docx'].includes(ext)) icon = 'bi-file-earmark-word';

        preview.innerHTML += `
            <div class="file-preview-bar">
                <i class="bi ${icon}"></i>
                <span>${file.name}</span>
            </div>
        `;
    });
});

function autoGrow(element) {
    element.style.height = "2.5rem";
    element.style.height = (element.scrollHeight) + "px";
}

document.querySelector('.calendar-trigger').addEventListener('keydown', function(e) {
    if (e.key === "Enter" || e.key === " ") {
        document.getElementById('dateInput').showPicker && document.getElementById('dateInput').showPicker();
        document.getElementById('dateInput').focus();
    }
});

const uploadBox = document.querySelector('.upload-box');
const fileInput = document.getElementById('fileInput');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadBox.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
    });
});

uploadBox.addEventListener('dragover', () => uploadBox.classList.add('drag-over'));
uploadBox.addEventListener('dragleave', () => uploadBox.classList.remove('drag-over'));
uploadBox.addEventListener('drop', e => {
    uploadBox.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    fileInput.files = files;

    // Dispara evento change para atualizar preview
    const changeEvent = new Event('change');
    fileInput.dispatchEvent(changeEvent);
});

// Simulação de busca de usuário em "banco de dados"
function buscarUsuario() {
    // Simule os dados vindos do backend
    return {
        nome: "Nome do usuário",
        fotoUrl: "" // Coloque a URL da foto ou deixe vazio para placeholder
    };
}

function renderizarUsuario() {
    const usuario = buscarUsuario();
    const fotoDiv = document.getElementById('fotoUsuario');
    const nomeDiv = document.getElementById('nomeUsuario');
    if (usuario.fotoUrl) {
        fotoDiv.innerHTML = `<img src="${usuario.fotoUrl}" alt="Foto do usuário">`;
    } else {
        fotoDiv.innerHTML = `<span>Foto do<br>usuário</span>`;
    }
    nomeDiv.textContent = usuario.nome;
}

function voltarParaLandingPage() {
    // Redirecione para a landing page (coloque o caminho correto depois)
    window.location.href = "";
}

// Inicializa painel ao carregar
document.addEventListener('DOMContentLoaded', renderizarUsuario);

// ...existing code...