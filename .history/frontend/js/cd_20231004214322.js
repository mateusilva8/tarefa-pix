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