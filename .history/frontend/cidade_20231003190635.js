let selectedRow = null;
let id = 0;
let inputNome = document.getElementById('name');

// Mostrar alertas
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
  
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container")
    const main = document.querySelector(".main")
    container.insertBefore(div, main)
  
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
};

// Deletar
document.querySelector("#user-list").addEventListener("click", (event) =>{
    target = event.target
  
    if(target.classList.contains("delete")){
      target.parentElement.parentElement.remove()
      showAlert("Usuário removido", "danger")
    }
});

//Limpar campos
function clearFields(){
    document.querySelector("#name").value = ""
};

//Adicionar ou editar
document.querySelector("#user-form").addEventListener("submit", async (e) =>{
    e.preventDefault()
    e.stopPropagation()
  
    let nome = inputNome.value
  
  
    let payload = {
      nome,
  
    }
  
    let url = 'http://localhost:3000/categorias'
    let method = 'POST';
    
    if(id !== 0){
      url += '/' + id;
      method = 'PUT';
      console.log(url);
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
  
});