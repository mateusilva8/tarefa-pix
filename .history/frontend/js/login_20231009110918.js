let selectedRow = null;
let id = 0;
let email = document.getElementById("email");
let senha = document.getElementById("senha");

document.querySelector("#login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  let payload = {
    email,
    senha,
  };

  let url = "http://localhost:3000/login";
  let method = "POST";

  let resposta = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
    },
    body: JSON.stringify(payload),
  });

  if (resposta.ok) {
    alert("ok");
  } else {
    alert("Senha ou usuários incorretos!");
  }
});
