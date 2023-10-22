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

      let tr = document.createElement("tr");
      let tdId = document.createElement("th");
      let tdRemetente = document.createElement("td");
      let tdDestinatario = document.createElement("td");
      let tdData = document.createElement("td");
      let tdValor = document.createElement("td");

      let id = pix.id;
      let remetente = pix.sender.name;
      let destinatario = pix.recipient.name;
      let data = pix.createdAt;
      let valor = `R$ ${pix.value}`;

      let dataHora = new Date(data);    
      let dia = dataHora.getDate();
      let mes = dataHora.getMonth();
      let ano = dataHora.getFullYear();
      let hora = `${dataHora.getHours()}:${dataHora.getMinutes()}`;
      let dataFormatada = `${dia}/${mes}/${ano} ${hora}`
  
      tdId.innerText = id;
      tdRemetente.innerText = remetente;
      tdDestinatario.innerText = destinatario;
      tdData.innerText = dataFormatada;
      tdValor.innerText = valor.replace('.',',');
  
      tr.appendChild(tdId);
      tr.appendChild(tdRemetente);
      tr.appendChild(tdDestinatario);
      tr.appendChild(tdData);
      tr.appendChild(tdValor);
      pixList.appendChild(tr);
    }
  }

  getPixUsuario();