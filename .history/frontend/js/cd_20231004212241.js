let selectedRow = null;
let id = 0;
let citySelect = document.getElementById("cty");
let inputNome = document.getElementById("name");

async function buscarCds() {
  let response = await fetch(`http://localhost:3000/cds`);
  let cds = await response.json();
  return cds;
}
