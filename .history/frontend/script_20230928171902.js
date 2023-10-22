let selectedRow = null;
let id = 0
let inputNome = document.getElementById('name')
let inputEmail = document.getElementById('email')
let inputSenha = document.getElementById('password')
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

// Deletar
document.querySelector("#user-list").addEventListener("click", (event) =>{
  target = event.target

  if(target.classList.contains("delete")){
    target.parentElement.parentElement.remove()
    showAlert("Usuário removido", "danger")
  }
})

//Limpar campos
function clearFields(){
  document.querySelector("#name").value = ""
  document.querySelector("#email").value = ""
  document.querySelector("#password").value = ""
}

//Adicionar ou editar
document.querySelector("#user-form").addEventListener("submit", async (e) =>{
  e.preventDefault()
  e.stopPropagation()

  let nome = inputNome.value
  let email = inputEmail.value
  let senha = inputSenha.value

  let payload = {
    nome,
    email,
    senha,
  }

  let url = 'http://localhost:3000/usuarios'
  let method = 'POST';
  
  // if(id =! 0){
  //   url += '/' + id;
  //   method = 'PUT';
  //   console.log(url);
  // }
  // Somente ajeitar aqui que o código funcionará

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

// Mostrar e esconder senha
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
togglePassword.addEventListener('click', () => {
const type = password
    .getAttribute('type') === 'password' ?
    'text' : 'password';
password.setAttribute('type', type);
this.classList.toggle('bi-eye');
});

//Buscar usuários no banco
let userList = document.getElementById('user-list');
let trUsuario = document.getElementById('tr-user');

async function getUsuarios () {
  let resposta = await fetch(`http://localhost:3000/usuarios`);
  let usuarios = await resposta.json();

  for (let usuario of usuarios) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td')
    let tdNome = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdSenha = document.createElement('td');
    let tdActions = document.createElement('td');
    let buttonEdit = document.createElement('a');
    let buttonDelete = document.createElement('a');
    buttonEdit.setAttribute('class', 'btn btn-warning btn-sm edit',);
    buttonDelete.setAttribute('class', 'btn btn-danger btn-sm delete');
    buttonDelete.style.marginRight = '10px'


    let id = usuario.id;
    let nome = usuario.nome;
    let email = usuario.email;
    let senha = usuario.senha;

    tdId.innerText = id
    tdNome.innerText = nome
    tdEmail.innerText = email
    tdSenha.innerText = senha
    buttonEdit.innerText = 'Editar'
    buttonDelete.innerText = 'Deletar'

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdSenha);
    tdActions.appendChild(buttonDelete)
    tdActions.appendChild(buttonEdit)
    tr.appendChild(tdActions)
    userList.appendChild(tr)

  }
}

//Editar
document.querySelector("#user-list").addEventListener("click", (e) =>{
  target = e.target;
  if(target.classList.contains("edit")){
    selectedRow = target.parentElement.parentElement.children[0].textContent;
    id = selectedRow
    console.log(selectedRow);
    console.log(id);
    buscarDados()
  }
})

//Deletar
document.querySelector("#user-list").addEventListener("click", async (e) =>{
  target = e.target;
  if(target.classList.contains("delete")){
    selectedRow = target.parentElement.parentElement.children[0].textContent;
    await fetch(`http://localhost:3000/usuarios/${selectedRow}`,{
      method: 'DELETE'
    })
  }
})


async function buscarDados(){
  let resposta = await fetch(`http://localhost:3000/usuarios/${selectedRow}`)
  if(resposta.ok){
    let usuario = await resposta.json();
    inputNome.value = usuario.nome
    inputEmail.value = usuario.email
    inputSenha.value = usuario.senha
  } else if(resposta.status === 422){
    let e = await resposta.json()
    alert(e.error)
  } else{
    alert('Ops! Algo deu errado!')
  }
}

getUsuarios();
