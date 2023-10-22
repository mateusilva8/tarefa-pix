let idRemetente = document.getElementById('idRemetente');
let idDestinatario = document.getElementById('idDestinatario');
let valor = document.getElementById('valor')


async function realizarPix {
    let payload = {
        senderId: idRemetente.value,
        recipientId: idDestinatario.value,
        value: valor.value,
      };
    
      console.log(JSON.stringify(payload));
    
      let resposta = await fetch(`http://localhost:3000/pix-api/pix`, {
        method: 'POST',
        headers: {
            "Content-type" : 'application/json',
            "Acccept": 'appplication/json'
        },
        body: JSON.stringify(payload)
      });

      resposta = await resposta.json();
      console.log(resposta);
}