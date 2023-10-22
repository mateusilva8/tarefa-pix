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

      if (mensagem.mensagem) {
          console.log(mensagem);
          alert(mensagem.mensagem);
      }else {
        console.log(mensagem);
        if (mensagem.error == 'The attribute "value" is required.')
        alert('Digite um valor válido');
        if (mensagem.error == 'The attribute "senderId" is required.')
        alert('Informe o ID do remetente');
        if (mensagem.error == 'The attribute "value" is required.')
        alert('Digite um valor válido');


      }

}

let botaoPix = document.getElementById('botaoEnviar');
  botaoPix.addEventListener('click', () => {
    realizarPix();
  })