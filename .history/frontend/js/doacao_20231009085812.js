let selectedRow = null;
let id = 0;
let itemSelect = document.getElementById("item");
let cdSelect = document.getElementById("cd");
let inputNome = document.getElementById("nome");
let inputQtdade = document.getElementById("qtdade");

async function buscarItens() {
  let response = await fetch(`http://localhost:3000/itens`);
  let itens = await response.json();
  return itens;
}

async function definirItens() {
  let itens = await buscarItens();
  let selectOption = document.createElement("option");
  selectOption.selected = true;
  selectOption.disabled = true;
  selectOption.innerText = "Selecione";
  itemSelect.appendChild(selectOption);

  for (let item of itens) {
    let option = document.createElement("option");
    option.value = item.id;
    option.innerText = item.nome;

    itemSelect.appendChild(option);
  }
}

definirItens();

async function buscarCds() {
  let response = await fetch(`http://localhost:3000/cds`);
  let cds = await response.json();
  return cds;
}

async function definirCds() {
  let cds = await buscarCds();
  let selectOption = document.createElement("option");
  selectOption.selected = true;
  selectOption.disabled = true;
  selectOption.innerText = "Selecione";
  cdSelect.appendChild(selectOption);

  for (let cd of cds) {
    let option = document.createElement("option");
    option.value = cd.id;
    option.innerText = cd.nome;

    cdSelect.appendChild(option);
  }
}

definirCds();

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

//Adicionar ou editar
document.querySelector("#item-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  let tipo = "E";
  let doador_nome = inputNome.value;
  let qtde = inputQtdade.value;
  let itens_idItem = itemSelect.value;
  let cds_idCd = cdSelect.value;

  let payload = {
    tipo,
    doador_nome,
    qtde,
    itens_idItem,
    cds_idCd,
  };

  let url = "http://localhost:3000/movimentacoes";
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
