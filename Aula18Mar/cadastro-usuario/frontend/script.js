// Enviar dados para o backend
document.getElementById("userForm").addEventListener("submit",
    async function(event) {
     event.preventDefault();
     const name = document.getElementById("name").value;
     const email = document.getElementById("email").value;
    
     const response = await fetch("http://localhost:3000/users", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ name, email })
     });
     if (response.ok) {
     document.getElementById("userForm").reset();
     loadUsers();
     }
     });
     // Carregar usuários do backend
     async function loadUsers() {
     const response = await fetch("http://localhost:3000/users");
     const users = await response.json();
     const userTable = document.getElementById("userTable");
     userTable.innerHTML = "";
     users.forEach(user => {
     const row =
    `<tr><td>${user.id}</td><td>${user.name}</td><td>${user.email}</td></tr>`;
     userTable.innerHTML += row;
     });
     }
     loadUsers(); // Carrega os usuários ao iniciar a página