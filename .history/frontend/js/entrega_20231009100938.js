let selectedRow = null;
let id = 0;
let itemSelect = document.getElementById("item");
let cdSelect = document.getElementById("cd");
let beneficiarioSelect = document.getElementById("beneficiario");
let inputQtdade = document.getElementById("qtdade");

async function buscarBeneficiarios() {
  let response = await fetch("http://localhost:3000/beneficiarios");
  let beneficiario = response.json();
  return beneficiario;
}

async function definirBeneficiarios() {
  let beneficiarios = await buscarBeneficiarios();
  let selectOption = document.createElement("option");
  selectOption.selected = true;
  selectOption.disabled = true;
  selectOption.innerText = "Selecione";
  beneficiarioSelect.appendChild(selectOption);

  for (b of beneficiarios) {
    let option = document.createElement("option");
    option.value = b.id;
    option.innerText = b.nome;
    beneficiarioSelect.appendChild(option);
  }
}

definirBeneficiarios();

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

async function buscarItens(code) {
  let response = await fetch(`http://localhost:3000/itensdocd/${code}`);
  let itens = await response.json();
  return itens;
}

async function definirItens(code) {
  let itens = await buscarItens(code);
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

cdSelect.addEventListener("change", () => {
  definirItens(cdSelect.value);
});
