let selectedRow = null;
let id = 0;
let cdSelect = document.getElementById("cd");

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

async function buscarItens(code) {
  let response = await fetch(`http://localhost:3000/itensdocd/${code}`);
  let itens = await response.json();
  return itens;
}

//Buscar estoque
let entregaList = document.getElementById("entrega-list");

async function buscarEstoque() {
  let estoque = await buscarItens(3);
  console.log(estoque);
  for (let e of estoque) {
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdDoador = document.createElement("td");
    let tdItem = document.createElement("td");
    let tdCd = document.createElement("td");
    let tdQtdade = document.createElement("td");
    let tdActions = document.createElement("td");
    let buttonEdit = document.createElement("a");
    let buttonDelete = document.createElement("a");
    buttonEdit.setAttribute("class", "btn btn-warning btn-sm edit");
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
    buttonEdit.innerText = "Editar";
    buttonDelete.innerText = "Deletar";

    tr.appendChild(tdId);
    tr.appendChild(tdDoador);
    tr.appendChild(tdItem);
    tr.appendChild(tdCd);
    tr.appendChild(tdQtdade);
    tdActions.appendChild(buttonDelete);
    tdActions.appendChild(buttonEdit);
    tr.appendChild(tdActions);
    entregaList.appendChild(tr);
  }
}
buscarEstoque();
