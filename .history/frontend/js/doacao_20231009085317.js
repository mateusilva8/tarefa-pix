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
