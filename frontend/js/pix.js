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

      let inputRemetente = document.getElementById('inputRemetente');
      let inputDestinatario = document.getElementById('inputDestinatario');
      let inputValor = document.getElementById('inputValor');

      let span = document.createElement('span');

      if (mensagem.mensagem) {
          console.log(mensagem);
          alert(mensagem.mensagem);
      }else {
        console.log(mensagem);
        if (mensagem.error == 'The attribute "value" is required.') {
          alert('Digite um valor válido');
        }else if (mensagem.error == 'The attribute "senderId" is required.') {
          alert('Informe o ID do remetente');
        }else if (mensagem.error == 'The attribute "recipientId" is required.') {
          alert('Informe o ID do destinatário');
        }
      }


}

let botaoPix = document.getElementById('botaoEnviar');
  botaoPix.addEventListener('click', () => {
    realizarPix();
  })