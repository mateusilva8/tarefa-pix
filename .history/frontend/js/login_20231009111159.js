let inputEmail = document.getElementById("email");
let inputSenha = document.getElementById("senha");
let form = document.getElementById("login-form");

document.querySelector("#button").addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log("clickei");
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
