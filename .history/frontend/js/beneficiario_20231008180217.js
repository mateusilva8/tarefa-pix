let selectedRow = null;
let id = 0;
let inputNome = document.getElementById("nome");
let inputCpf = document.getElementById("cpf");
let inputNascimento = document.getElementById("nascimento");
let cidadeSelect = document.getElementById("cidade");

clearFields();

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
document
  .querySelector("#beneficiario-list")
  .addEventListener("click", (event) => {
    target = event.target;

    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
      showAlert("Usuário removido", "danger");
    }
  });

//Limpar campos
function clearFields() {
  document.querySelector("#nome").value = "";
  document.querySelector("#cpf").value = "";
  document.querySelector("#nascimento").value = "";
  document.querySelector("#cidade").value = "";
}

async function buscarCidades() {
  let response = await fetch(`http://localhost:3000/beneficiarios`);
  let cidades = await response.json();
  return cidades;
}

async function definirCidades() {
  let cidades = await buscarCidades();
  let selectOption = document.createElement("option");
  selectOption.selected = true;
  selectOption.disabled = true;
  selectOption.innerText = "Selecione";
  cidadeSelect.appendChild(selectOption);

  for (let cidade of cidades) {
    let option = document.createElement("option");
    option.value = cidade.idCidade;
    option.innerText = cidade.nomeCidade;

    cidadeSelect.appendChild(option);
  }
}

definirCidades();

//Editar
document.querySelector("#beneficiario-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement.children[0].textContent;
    id = selectedRow;
    buscarDados();
  }
});

//Buscar dados para edição
async function buscarDados() {
  let resposta = await fetch(
    `http://localhost:3000/beneficiarios/${selectedRow}`
  );
  if (resposta.ok) {
    let beneficiario = await resposta.json();
    inputNome.value = beneficiario.nome;
    inputCpf.value = beneficiario.cpf;
    inputNascimento.value = beneficiario.data_nascimento;
    cidadeSelect.value = beneficiario.idCidade;
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert("Ops! Algo deu errado!");
  }
}

//Buscar beneficiários no banco
let cdList = document.getElementById("beneficiario-list");

async function definirBeneficiarios() {
  let resposta = await fetch(`http://localhost:3000/beneficiarios`);
  let beneficiarios = await resposta.json();

  for (let beneficiario of beneficiarios) {
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdNome = document.createElement("td");
    let tdCpf = document.createElement("td");
    let tdNascimento = document.createElement("td");
    let tdCidade = document.createElement("td");
    let tdActions = document.createElement("td");
    let buttonEdit = document.createElement("a");
    let buttonDelete = document.createElement("a");
    buttonEdit.setAttribute("class", "btn btn-warning btn-sm edit");
    buttonDelete.setAttribute("class", "btn btn-danger btn-sm delete");
    buttonDelete.style.marginRight = "10px";

    let id = beneficiario.id;
    let nome = beneficiario.nome;
    let cpf = beneficiario.cpf;
    let nascimento = beneficiario.nascimento;
    let cidade = beneficiario.nomeCidade;

    tdId.innerText = id;
    tdNome.innerText = nome;
    tdCpf.innerText = cpf;
    tdNascimento.innerText = nascimento;
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
