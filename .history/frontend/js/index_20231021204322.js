let userId = document.getElementById('id');
let type = document.querySelector('#form-check-input:checked');

let pixList = document.getElementById("pix-list");

async function getPixUsuario() {
    let payload = {
        userId: 1,
        type: 'sent',
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

      let listaPix = await resposta.json();

      console.log(listaPix);
    
    for (let pix of listaPix) {
      console.log(pix.recicipent);

      let tr = document.createElement("tr");
      let tdId = document.createElement("td");
      let tdRemetente = document.createElement("td");
      let tdDestinatario = document.createElement("td");
      let tdData = document.createElement("td");
      let tdValor = document.createElement("td");

      let remetente = pix.sender.name;
      let destinatario = pix.recicipent.name;
      let data = pix.createdAt;
      let valor = pix.value;
  
      let id = categoria.id;
      let nome = categoria.nome;
  
      tdId.innerText = id;
      tdRemetente.innerText = remetente;
      tdDestinatario.innerText = destinatario;
      tdData.innerText = data;
      tdValor.innerText = valor;
  
      tr.appendChild(tdId);
      tr.appendChild(tdRemetente);
      tr.appendChild(tdDestinatario);
      tr.appendChild(tdData);
      tr.appendChild(tdValor);
      pixList.appendChild(tr);
    }
  }

  getPixUsuario();