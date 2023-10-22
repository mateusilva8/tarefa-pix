let selectedRow = null;
let id = 0;
let citySelect = document.getElementById("city");
let inputNome = document.getElementById("name");

async function buscarCds() {
  let response = await fetch(`http://localhost:3000/cds`);
  let cds = await response.json();
  return cds;
}

async function definirCidades() {
  let cidades = await buscarCds();
  let selectOption = document.createElement("option");
  selectOption.selected = true;
  selectOption.disabled = true;
  selectOption.innerText = "Selecione";
  citySelect.appendChild(selectOption);

  for (let cidade of cidades) {
    console.log(cidade);
    let option = document.createElement("option");
    option.value = cidade.id;
    option.innerText = cidade.nome;

    citySelect.appendChild(option);
  }
}

definirCidades();

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
  document.querySelector("#city").value = "";
}

//Adicionar ou editar
document.querySelector("#cd-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  let nome = inputNome.value;
  let cidades_idCidade = citySelect.value;

  let payload = {
    nome,
    cidades_idCidade,
  };

  let url = "http://localhost:3000/cds";
  let method = "POST";

  if (id !== 0) {
    url += "/" + id;
    method = "PUT";
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
let itemList = document.getElementById("item-list");
let trUsuario = document.getElementById("tr-user");

async function buscarItens() {
  let resposta = await fetch(`http://localhost:3000/itens`);
  let itens = await resposta.json();

  for (let item of itens) {
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdNome = document.createElement("td");
    let tdCategoria = document.createElement("td");
    let tdActions = document.createElement("td");
    let buttonEdit = document.createElement("a");
    let buttonDelete = document.createElement("a");
    buttonEdit.setAttribute("class", "btn btn-warning btn-sm edit");
    buttonDelete.setAttribute("class", "btn btn-danger btn-sm delete");
    buttonDelete.style.marginRight = "10px";

    let id = item.id;
    let nome = item.nome;
    let categoria = item.categoria;

    tdId.innerText = id;
    tdNome.innerText = nome;
    tdCategoria.innerText = categoria;
    buttonEdit.innerText = "Editar";
    buttonDelete.innerText = "Deletar";

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdCategoria);
    tdActions.appendChild(buttonDelete);
    tdActions.appendChild(buttonEdit);
    tr.appendChild(tdActions);
    itemList.appendChild(tr);
  }
}