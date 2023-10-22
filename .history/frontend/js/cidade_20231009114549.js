let selectedRow = null;
let id = 0;
let inputNome = document.getElementById("name");

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
document.querySelector("#city-list").addEventListener("click", (event) => {
  target = event.target;

  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Cidade removida", "danger");
  }
});

//Limpar campos
function clearFields() {
  document.querySelector("#name").value = "";
}

//Adicionar ou editar
document.querySelector("#city-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  let nome = inputNome.value;

  let payload = {
    nome,
  };

  let url = "http://localhost:3000/cidades";
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
let cityList = document.getElementById("city-list");
let trCidades = document.getElementById("tr-user");

async function buscarCidades() {
  let resposta = await fetch(`http://localhost:3000/cidades`);
  let cidades = await resposta.json();

  for (let cidade of cidades) {
    console.log(cidade);
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdNome = document.createElement("td");
    let tdActions = document.createElement("td");
    let buttonEdit = document.createElement("a");
    let buttonDelete = document.createElement("a");
    buttonEdit.setAttribute("class", "btn btn-warning btn-sm edit");
    buttonDelete.setAttribute("class", "btn btn-danger btn-sm delete");
    buttonDelete.style.marginRight = "10px";

    let id = cidade.id;
    let nome = cidade.nome;

    tdId.innerText = id;
    tdNome.innerText = nome;
    buttonEdit.innerText = "Editar";
    buttonDelete.innerText = "Deletar";

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tdActions.appendChild(buttonDelete);
    tdActions.appendChild(buttonEdit);
    tr.appendChild(tdActions);
    cityList.appendChild(tr);
  }
}
buscarCidades();

//Editar
document.querySelector("#city-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement.children[0].textContent;
    id = selectedRow;
    console.log(selectedRow);
    console.log(id);
    buscarDados();
  }
});

async function buscarDados() {
  let resposta = await fetch(`http://localhost:3000/cidades/${selectedRow}`);
  if (resposta.ok) {
    let cidade = await resposta.json();
    inputNome.value = cidade.nome;
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert("Ops! Algo deu errado!");
  }
}
