let selectedRow = null;
let id = 0;
let inputNome = document.getElementById("name");
clearFields();
// Mostrar alertas
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Deletar
document.querySelector("#user-list").addEventListener("click", (event) => {
  target = event.target;

  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Usuário removido", "danger");
  }
});

//Limpar campos
function clearFields() {
  document.querySelector("#name").value = "";
}

//Adicionar ou editar
document.querySelector("#user-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  let nome = inputNome.value;

  let payload = {
    nome,
  };

  let url = "http://localhost:3000/categorias";
  let method = "POST";

  if (id !== 0) {
    url += "/" + id;
    method = "PUT";
    console.log(url);
  }

  let resposta = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
    },
    body: JSON.stringify(payload),
  });

  if (resposta.ok) {
    window.location.reload();
  } else {
    alert("Ops! Algo deu errado");
  }
});

//Buscar usuários no banco
let userList = document.getElementById("user-list");
let trCategorias = document.getElementById("tr-user");

async function getCategorias() {
  let resposta = await fetch(`http://localhost:3000/categorias`);
  let categorias = await resposta.json();

  for (let categoria of categorias) {
    console.log("teste");
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdNome = document.createElement("td");
    let tdActions = document.createElement("td");
    let buttonEdit = document.createElement("a");
    let buttonDelete = document.createElement("a");
    buttonEdit.setAttribute("class", "btn btn-warning btn-sm edit");
    buttonDelete.setAttribute("class", "btn btn-danger btn-sm delete");
    buttonDelete.style.marginRight = "10px";

    let id = categoria.id;
    let nome = categoria.nome;

    tdId.innerText = id;
    tdNome.innerText = nome;
    buttonEdit.innerText = "Editar";
    buttonDelete.innerText = "Deletar";

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tdActions.appendChild(buttonDelete);
    tdActions.appendChild(buttonEdit);
    tr.appendChild(tdActions);
    userList.appendChild(tr);
  }
}

//Editar
document.querySelector("#user-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement.children[0].textContent;
    id = selectedRow;
    console.log(selectedRow);
    console.log(id);
    buscarDados();
  }
});

//Deletar
document.querySelector("#user-list").addEventListener("click", async (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    showAlert("Usuário removido", "danger");
    selectedRow = target.parentElement.parentElement.children[0].textContent;
    await fetch(`http://localhost:3000/categorias/${selectedRow}`, {
      method: "DELETE",
    });
  }
});

async function buscarDados() {
  let resposta = await fetch(`http://localhost:3000/categorias/${selectedRow}`);
  if (resposta.ok) {
    let categoria = await resposta.json();
    inputNome.value = categoria.nome;
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert("Ops! Algo deu errado!");
  }
}

getCategorias();
