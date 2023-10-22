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
document.querySelector("#user-list").addEventListener("click", (event) => {
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
