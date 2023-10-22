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
  let resposta = await fetch(`http://localhost:3000/cds/${selectedRow}`);
  if (resposta.ok) {
    let cd = await resposta.json();
    inputNome.value = cd.nome;
    citySelect.value = cd.cidade.id;
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert("Ops! Algo deu errado!");
  }
}
