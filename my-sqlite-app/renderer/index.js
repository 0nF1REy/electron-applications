const addBtn = document.getElementById("add");
const usersList = document.getElementById("users");

addBtn.addEventListener("click", async () => {
  try {
    const name = prompt("Nome do usuário:");
    if (!name) return;

    const email = prompt("Email:");
    if (!email) return;

    const result = await window.api.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );

    if (result.error) {
      alert("Erro ao adicionar usuário: " + result.error);
      return;
    }

    console.log("Usuário adicionado com sucesso!");
    await loadUsers();
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao adicionar usuário");
  }
});

async function loadUsers() {
  try {
    const users = await window.api.query("SELECT * FROM users");

    if (users.error) {
      console.error("Erro ao carregar usuários:", users.error);
      return;
    }

    usersList.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.id} - ${user.name} (${user.email})`;
      usersList.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
}

// Carrega os usuários quando a página for carregada
document.addEventListener("DOMContentLoaded", () => {
  loadUsers();
});
