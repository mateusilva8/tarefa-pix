let selectedRow = null;
let id = 0
let categorySelect = document.getElementById('category')
let inputNome = document.getElementById('name')


async function buscarCategorias(){
    let response = await fetch(`http://localhost:3000/categorias`)
    let categories = await response.json()
    return categories
}

async function definirCategorias () {
  let categories = await buscarCategorias()
  let selectOption = document.createElement('option');
  selectOption.innerText = 'Selecione';
  categorySelect.appendChild(selectOption);

  for (let category of categories) {
    let option = document.createElement('option');
    option.value = category.id;
    option.innerText = category.nome;

    categorySelect.appendChild(option);
  }
}

definirCategorias()

categorySelect.addEventListener('change', () => {
    console.log(categorySelect.value);
});

clearFields()

// Mostrar alertas
function showAlert(message, className){
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container")
  const main = document.querySelector(".main")
  container.insertBefore(div, main)

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//Deletar
document.querySelector("#item-list").addEventListener("click", (event) =>{
  target = event.target

  if(target.classList.contains("delete")){
    target.parentElement.parentElement.remove()
    showAlert("Item removido", "danger")
  }
})

//Editar
document.querySelector("#item-list").addEventListener("click", (e) =>{
  target = e.target;
  if(target.classList.contains("edit")){
    selectedRow = target.parentElement.parentElement.children[0].textContent;
    id = selectedRow;
    buscarDados()
  }
})


//Limpar campos
function clearFields(){
  categorySelect.value = '';
  inputNome.value = '';
}

//Adicionar ou editar
document.querySelector("#item-form").addEventListener("submit", async (e) =>{
  e.preventDefault()
  e.stopPropagation()

  let nome = inputNome.value
  let categorias_idCategoria = categorySelect.value

  let payload = {
    nome,
    categorias_idCategoria,
  }

  let url = 'http://localhost:3000/itens'
  let method = 'POST';
  
  if(id !== 0){
    url += '/' + id;
    method = 'PUT';
  }

  let resposta = await fetch(url, {
    method: method,
    headers: {
        "Content-type" : 'application/json',
        "Acccept": 'appplication/json'
    },
    body: JSON.stringify(payload)
  })

  if(resposta.ok){
    window.location.reload()
  } else{
    alert("Ops! Algo deu errado")
  }
})

//Buscar usuários no banco
let itemList = document.getElementById('item-list');
let trUsuario = document.getElementById('tr-user');

async function buscarItens () {
  let resposta = await fetch(`http://localhost:3000/itens`);
  let itens = await resposta.json();

  for (let item of itens) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td')
    let tdNome = document.createElement('td');
    let tdCategoria = document.createElement('td');
    let tdActions = document.createElement('td');
    let buttonEdit = document.createElement('a');
    let buttonDelete = document.createElement('a');
    buttonEdit.setAttribute('class', 'btn btn-warning btn-sm edit',);
    buttonDelete.setAttribute('class', 'btn btn-danger btn-sm delete');
    buttonDelete.style.marginRight = '10px'


    let id = item.id;
    let nome = item.nome;
    let categoria = item.categoria;

    tdId.innerText = id
    tdNome.innerText = nome
    tdCategoria.innerText = categoria
    buttonEdit.innerText = 'Editar'
    buttonDelete.innerText = 'Deletar'

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdCategoria);
    tdActions.appendChild(buttonDelete)
    tdActions.appendChild(buttonEdit)
    tr.appendChild(tdActions)
    itemList.appendChild(tr)

  }
}

async function buscarDados(){
  let resposta = await fetch(`http://localhost:3000/itens/${selectedRow}`)
  if(resposta.ok){
    let item = await resposta.json();
    inputNome.value = item.nome
    categorySelect.value = item.idCategoria
  } else if(resposta.status === 422){
    let e = await resposta.json()
    alert(e.error)
  } else{
    alert('Ops! Algo deu errado!')
  }
}


buscarItens()