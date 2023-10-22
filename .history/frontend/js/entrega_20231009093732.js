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
