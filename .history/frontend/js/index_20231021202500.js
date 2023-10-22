let userId = document.getElementById('id');
let type = document.querySelector('#form-check-input:checked');

async function getPixUsuario() {
    let payload = {
        userId: userId,
        type: type,
      };
    
      console.log(JSON.stringify(payload));
    
      let resposta = await fetch(`http://localhost:3000/pix-api/pix/usuarios`, {
        method: 'POST',
        headers: {
            "Content-type" : 'application/json',
            "Acccept": 'appplication/json'
        },
        body: JSON.stringify(payload)
      });

  
    for (let categoria of categorias) {
      console.log("teste");
      let tr = document.createElement("tr");
      let tdId = document.createElement("td");
      let tdNome = document.createElement("td");
      let tdActions = document.createElement("td");
      let buttonEdit = document.createElement("a");
      let buttonDelete = document.createElement("a");
      buttonEdit.setAttribute("class", "btn btn-warning btn-sm edit");
      buttonDelete.setAttribute("class", "btn btn-danger btn-sm delete");
      buttonDelete.style.marginRight = "10px";
  
      let id = categoria.id;
      let nome = categoria.nome;
  
      tdId.innerText = id;
      tdNome.innerText = nome;
      buttonEdit.innerText = "Editar";
      buttonDelete.innerText = "Deletar";
  
      tr.appendChild(tdId);
      tr.appendChild(tdNome);
      tdActions.appendChild(buttonDelete);
      tdActions.appendChild(buttonEdit);
      tr.appendChild(tdActions);
      userList.appendChild(tr);
    }
  }