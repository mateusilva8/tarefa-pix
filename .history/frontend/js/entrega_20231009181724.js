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
  console.log(itens);
  itemSelect.innerHTML = "";

  let selectOption = document.createElement("option");
  selectOption.selected = true;
  selectOption.disabled = true;
  selectOption.innerText = "Selecione";
  itemSelect.appendChild(selectOption);

  for (let item of itens) {
    let option = document.createElement("option");
    option.value = item.item.id;
    option.innerText = item.item.nome;

    itemSelect.appendChild(option);
  }
}

cdSelect.addEventListener("change", () => {
  definirItens(cdSelect.value);
});

definirCds();

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

//Adicionar ou editar
document.querySelector("#item-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  let tipo = "S";
  let doador_nome = null;
  let itens_idItem = itemSelect.value;
  let cds_idCd = cdSelect.value;
  let qtde = inputQtdade.value;
  let pessoa_beneficiario_id = beneficiarioSelect.value;

  let payload = {
    tipo,
    doador_nome,
    qtde,
    itens_idItem,
    cds_idCd,
    pessoa_beneficiario_id,
  };

  let url = "http://localhost:3000/movimentacoes";
  let method = "POST";

  if (id !== 0) {
    url += "/" + id;
    method = "PUT";
  }

  let resposta = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
    },
    body: JSON.stringify(payload),
  });

  if (resposta.ok) {
    window.location.reload();
  } else {
    showAlert("Estoque insuficiente", "danger");
  }
});

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

//Buscar doações no banco
let entregaList = document.getElementById("entrega-list");
let trUsuario = document.getElementById("tr-user");

async function buscarDoacoes() {
  let resposta = await fetch(`http://localhost:3000/movimentacoessaida`);
  let movimentacoes = await resposta.json();

  for (let movimentacao of movimentacoes) {
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdDoador = document.createElement("td");
    let tdItem = document.createElement("td");
    let tdCd = document.createElement("td");
    let tdQtdade = document.createElement("td");
    let tdActions = document.createElement("td");
    let buttonDelete = document.createElement("a");
    buttonDelete.setAttribute("class", "btn btn-danger btn-sm delete");
    buttonDelete.style.marginRight = "10px";

    let id = movimentacao.id;
    let nome = movimentacao.pessoa_beneficiario.nome;
    let item = movimentacao.cd_item.item.nome;
    let cd = movimentacao.cd_item.cd.nome;
    let qtdade = movimentacao.qtde;

    tdId.innerText = id;
    tdDoador.innerText = nome;
    tdItem.innerText = item;
    tdCd.innerText = cd;
    tdQtdade.innerText = qtdade;
    buttonDelete.innerText = "Deletar";

    tr.appendChild(tdId);
    tr.appendChild(tdDoador);
    tr.appendChild(tdItem);
    tr.appendChild(tdCd);
    tr.appendChild(tdQtdade);
    tdActions.appendChild(buttonDelete);
    tr.appendChild(tdActions);
    entregaList.appendChild(tr);
  }
}
buscarDoacoes();

//Deletar
document
  .querySelector("#entrega-list")
  .addEventListener("click", async (event) => {
    target = event.target;

    if (target.classList.contains("delete")) {
      selectedRow = target.parentElement.parentElement.children[0].textContent;
      let resposta = await fetch(
        `http://localhost:3000/movimentacoessaida/${selectedRow}`,
        {
          method: "DELETE",
        }
      );
      if (resposta.ok) {
        target.parentElement.parentElement.remove();
        showAlert("Doação removida", "danger");
      } else {
        showAlert("Entrega do item já feita", "danger");
      }
    }
  });
