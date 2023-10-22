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
  let categories = await buscarItens();
  let selectOption = document.createElement("option");
  selectOption.selected = true;
  selectOption.disabled = true;
  selectOption.innerText = "Selecione";
  categorySelect.appendChild(selectOption);

  for (let category of categories) {
    let option = document.createElement("option");
    option.value = category.id;
    option.innerText = category.nome;

    categorySelect.appendChild(option);
  }
}

definirItens();
