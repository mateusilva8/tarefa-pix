let selectedRow = null;
let id = 0;
let InputEmail = document.getElementById("email");
let InputSenha = document.getElementById("senha");

document.querySelector("#login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  let payload = {
    nome,
    categorias_idCategoria,
  };

  let url = "http://localhost:3000/itens";
  let method = "POST";

  if (id !== 0) {
    url += "/" + id;
    method = "PUT";
  }

  let resposta = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
    },
    body: JSON.stringify(payload),
  });

  if (resposta.ok) {
    window.location.reload();
  } else {
    alert("Ops! Algo deu errado");
  }
});
