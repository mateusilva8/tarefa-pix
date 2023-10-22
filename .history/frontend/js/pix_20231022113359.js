let idRemetente = document.getElementById('idRemetente');
let idDestinatario = document.getElementById('idDestinatario');
let valor = document.getElementById('valor')


async function realizarPix () {
    let payload = {
        senderId: idRemetente.value,
        recipientId: idDestinatario.value,
        value: valor.value,
      };
    
      let resposta = await fetch(`http://localhost:3000/pix-api/pix`, {
        method: 'POST',
        headers: {
            "Content-type" : 'application/json',
            "Acccept": 'appplication/json'
        },
        body: JSON.stringify(payload)
      });

      let mensagem = await resposta.json()

      console.log(mensagem);

      alert(mensagem.mensagem);
}

let botaoPix = document.getElementById('botaoEnviar');
  botaoPix.addEventListener('click', () => {
    realizarPix();
  })