let selectedRow = null;
let id = 0;
let inputNome = document.getElementById("nome");
let inputCpf = document.getElementById("cpf");
let inputNascimento = document.getElementById("nascimento");
let cidadeSelect = document.getElementById("nascimento");

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
  // document.querySelector("#name").value = "";
  // document.querySelector("#city").value = "";
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
