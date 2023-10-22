let selectedRow = null;
let id = 0;
let citySelect = document.getElementById("city");
let inputNome = document.getElementById("name");

async function buscarCds() {
  let response = await fetch(`http://localhost:3000/cds`);
  let cds = await response.json();
  return cds;
}
console.log(buscarCds());

async function definirCidades() {
  let cidades = await buscarCds();
  console.log(cidades);
  let selectOption = document.createElement("option");
  selectOption.selected = true;
  selectOption.disabled = true;
  selectOption.innerText = "Selecione";
  citySelect.appendChild(selectOption);

  cidades.forEach((element) => {
    let option = document.createElement("option");
    option.value = element.idCidade;
    option.innerText = element.cidade;

    citySelect.appendChild(option);
  });

  // for (let cidade of cidades) {
  //   let option = document.createElement("option");
  //   option.value = cidade.idCidade;
  //   option.innerText = cidade.cidade;

  //   citySelect.appendChild(option);
  // }
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
document.querySelector("#cd-list").addEventListener("click", (event) => {
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
let cdList = document.getElementById("cd-list");
let trUsuario = document.getElementById("tr-list");

async function buscarCds() {
  let resposta = await fetch(`http://localhost:3000/cds`);
  let cds = await resposta.json();

  for (let cd of cds) {
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdNome = document.createElement("td");
    let tdCidade = document.createElement("td");
    let tdActions = document.createElement("td");
    let buttonEdit = document.createElement("a");
    let buttonDelete = document.createElement("a");
    buttonEdit.setAttribute("class", "btn btn-warning btn-sm edit");
    buttonDelete.setAttribute("class", "btn btn-danger btn-sm delete");
    buttonDelete.style.marginRight = "10px";

    let id = cd.id;
    let nome = cd.nome;
    let cidade = cd.cidade.nome;

    tdId.innerText = id;
    tdNome.innerText = nome;
    tdCidade.innerText = cidade;
    buttonEdit.innerText = "Editar";
    buttonDelete.innerText = "Deletar";

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdCidade);
    tdActions.appendChild(buttonDelete);
    tdActions.appendChild(buttonEdit);
    tr.appendChild(tdActions);
    cdList.appendChild(tr);
  }
}

//Buscar dados
async function buscarDados() {
  let resposta = await fetch(`http://localhost:3000/cds/${selectedRow}`);
  if (resposta.ok) {
    let cd = await resposta.json();
    inputNome.value = cd.nome;
    citySelect.value = cd.cidade.id;
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert("Ops! Algo deu errado!");
  }
}

buscarCds();
