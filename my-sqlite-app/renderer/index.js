const addBtn = document.getElementById("add");
const usersList = document.getElementById("users");

addBtn.addEventListener("click", async () => {
  const name = prompt("Nome do usuário:");
  const email = prompt("Email:");
  if (!name || !email) return;

  await window.api.query("INSERT INTO users (name, email) VALUES (?, ?)", [
    name,
    email,
  ]);
  loadUsers();
});

async function loadUsers() {
  const users = await window.api.query("SELECT * FROM users");
  usersList.innerHTML = "";
  users.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = `${u.id} - ${u.name} (${u.email})`;
    usersList.appendChild(li);
  });
}

loadUsers();
