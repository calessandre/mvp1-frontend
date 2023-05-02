/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de plantas existentes no servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
function getList() {
  fetch('http://127.0.0.1:5000/plantas', {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.plantas.forEach(item => insertList(item.id, item.nome, item.nome_cientifico, item.porte, item.quantidade, item.forma_aquisicao, item.luminosidade, item.observacao));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista que será apresentada
  --------------------------------------------------------------------------------------
*/
function insertList (id, nome, nome_cientifico, porte, quantidade, forma_aquisicao, luminosidade, obs) {
  var item = [nome, nome_cientifico, quantidade, forma_aquisicao, porte, luminosidade, obs];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length-1; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }

  insertTrashcan(row.insertCell(-1),id, obs);
  
  clearInputs();
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na base de dados via requisição POST
  --------------------------------------------------------------------------------------
*/
function postItem(input_nome, input_nome_cientifico, input_porte, input_quantidade, 
                        input_forma_aquisicao, input_luminosidade, input_obs) {
  const formData = new FormData();
  formData.append('nome', input_nome);
  formData.append('nome_cientifico', input_nome_cientifico);
  formData.append('porte', input_porte);
  formData.append('forma_aquisicao', input_forma_aquisicao);
  formData.append('luminosidade', input_luminosidade);
  formData.append('quantidade', input_quantidade);
  formData.append('observacao', input_obs);

  fetch('http://127.0.0.1:5000/planta', {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
        if (typeof data.message != 'undefined'){
          alert(data.message);
          clearInputs();
        }
        else{
          insertList(data.id, input_nome, input_nome_cientifico, input_porte, input_quantidade, input_forma_aquisicao, input_luminosidade, input_obs);
          alert("Nova planta adicionada!");      
        }  
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar uma nova planta com seus atributos
  --------------------------------------------------------------------------------------
*/
function newItem() {
  let input_nome = document.getElementById("input_nome").value;
  let input_nome_cientifico = document.getElementById("input_nome_cientifico").value;
  let input_quantidade = document.getElementById("input_quantidade").value;
  let input_forma_aquisicao = document.getElementById("input_forma_aquisicao").value;
  let input_porte = document.getElementById("input_porte").value;
  let input_luminosidade = document.getElementById("input_luminosidade").value;
  let input_obs = document.getElementById("input_obs").value;

  if (input_nome === '') {
    alert("Escreva o nome da planta!");
  } else if (isNaN(input_quantidade)) {
    alert("Quantidade precisam ser numérica!");
  } else {
    postItem(input_nome, input_nome_cientifico, input_porte, input_quantidade, input_forma_aquisicao, input_luminosidade, input_obs);
  }
}

/*
  -----------------------------------------------------------------------------------------------
  Função para inserir uma lixeira para deleção e balão de observação em uma linha da tabela
  -----------------------------------------------------------------------------------------------
*/
function insertTrashcan (parent, id, obs) {

  let ndiv = document.createElement("div");
  ndiv.setAttribute("class","tooltip");
  parent.appendChild(ndiv);
  
  let image = document.createElement("img");
  image.setAttribute("src","img/obs.png");
  image.setAttribute("height", "15px");
  image.setAttribute("width", "15px");
  image.style.paddingRight = "10px";
  ndiv.appendChild(image);
  
  let nspan = document.createElement("span");
  nspan.setAttribute("class","tooltiptext");
  nspan.innerHTML=obs;
  ndiv.appendChild(nspan);
  
  let image2 = document.createElement("img");
  image2.setAttribute("src","img/lixeira.png");
  image2.setAttribute("height", "15px");
  image2.setAttribute("width", "15px");
  image2.setAttribute("onclick", "removeItem(this)");
  image2.style.cursor = "pointer";
  image.style.paddingLeft = "10px";
  image2.setAttribute("id", id);
  parent.appendChild(image2);

}

/*
  ---------------------------------------------------------------------------------------------------
  Função para deletar uma planta do banco de dados via requisição DELETE usando o id da planta
  ---------------------------------------------------------------------------------------------------
*/
function deleteItem (id) {
  console.log(id)
  let url = 'http://127.0.0.1:5000/planta?planta_id=' + id;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*------------------------------------------------------------------------------------------------
Função para deletar uma planta no clique na lixeira associada
--------------------------------------------------------------------------------------------------
*/

function removeItem (item) {
  const div = item.parentElement.parentElement;
  const nomeItem = div.getElementsByTagName('td')[0].innerHTML;
  
  if (confirm("Confirma a exclusão?")) {
    div.remove();
    deleteItem(item.id);
    alert("Planta removida com sucesso!");
    clearInputs();
  }
}

/*------------------------------------------------------------------------------------------------
Função para limpar campos de entrada de dados após alguma operação
--------------------------------------------------------------------------------------------------
*/
function clearInputs () {
  document.getElementById("input_nome").value = "";
  document.getElementById("input_nome_cientifico").value = "";
  document.getElementById("input_quantidade").value = "";
  document.getElementById("input_luminosidade").value = "";
  document.getElementById("input_forma_aquisicao").value = "";
  document.getElementById("input_porte").value = "";
  document.getElementById("input_obs").value = "";
} 
/*------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------
*/