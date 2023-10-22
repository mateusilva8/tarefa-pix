let selectedRow = null;
let id = 0;
let citySelect = document.getElementById("cty");
let inputNome = document.getElementById("name");

async function buscarCds() {
  let response = await fetch(`http://localhost:3000/cds`);
  let cds = await response.json();
  return cds;
}

async function definirCidades() {
  let categories = await buscarCategorias();
  let selectOption = document.createElement("option");
  selectOption.innerText = "Selecione";
  categorySelect.appendChild(selectOption);

  for (let category of categories) {
    let option = document.createElement("option");
    option.value = category.id;
    option.innerText = category.nome;

    categorySelect.appendChild(option);
  }
}
