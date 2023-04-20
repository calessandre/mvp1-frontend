/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de plantas existentes no servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
async function getList() {
  fetch('http://127.0.0.1:5000/plantas', {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.plantas.forEach(item => insertList(item.id, item.nome, item.nome_cientifico, item.porte, item.quantidade, item.forma_aquisicao, item.luminosidade));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
function insertList (id, nome, nome_cientifico, porte, quantidade, forma_aquisicao, luminosidade) {
  var item = [nome, nome_cientifico, quantidade, forma_aquisicao, porte, luminosidade];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertTrashcan(row.insertCell(-1),id);
  
  clearInputs();
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
async function postItem(input_nome, input_nome_cientifico, input_porte, input_quantidade, input_forma_aquisicao, input_luminosidade) {
  const formData = new FormData();
  formData.append('nome', input_nome);
  formData.append('nome_cientifico', input_nome_cientifico);
  formData.append('porte', input_porte);
  formData.append('forma_aquisicao', input_forma_aquisicao);
  formData.append('luminosidade', input_luminosidade);
  formData.append('quantidade', input_quantidade);

  fetch('http://127.0.0.1:5000/planta', {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
        if (typeof data.message != 'undefined'){
          alert(data.message);
        }
        else{
          insertList(data.id, input_nome, input_nome_cientifico, input_porte, input_quantidade, input_forma_aquisicao, input_luminosidade);
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

  if (input_nome === '') {
    alert("Escreva o nome da planta!");
  } else if (isNaN(input_quantidade)) {
    alert("Quantidade precisam ser numérica!");
  } else {
    postItem(input_nome, input_nome_cientifico, input_porte, input_quantidade, input_forma_aquisicao, input_luminosidade);
   // alert(id);
   // insertList(0,input_nome, input_nome_cientifico, input_porte, input_quantidade, input_forma_aquisicao, input_luminosidade);
   // alert("Nova planta adicionada!");
  }
}

//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
//getList()





/*
  --------------------------------------------------------------------------------------
  Função para inserir uma lixeira para deleção em uma linha da tabela
  --------------------------------------------------------------------------------------
*/
function insertTrashcan (parent, id) {
  let image = document.createElement("img");
  image.setAttribute("src","img/126468.png");
  image.setAttribute("height", "15px");
  image.setAttribute("width", "15px");
  image.setAttribute("onclick", "removeItem(this)");
  image.style.cursor = "pointer";
  image.setAttribute("id", id);
  parent.appendChild(image);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
/*
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
	  alert(this);	
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}
*/

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
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




//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

function removeItem (item) {
  const div = item.parentElement.parentElement;
  const nomeItem = div.getElementsByTagName('td')[0].innerHTML;
  
  if (confirm("Confirma a exclusão?")) {
    div.remove()
    deleteItem(item.id)
    alert("Planta removida com sucesso!")
  }
}

//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
function clearInputs () {
 /* document.getElementById("input_nome").value = "";
  document.getElementById("input_nome_cientifico").value = "";
  document.getElementById("input_quantidade").value = "";
  document.getElementById("input_luminosidade").value = "";
  document.getElementById("input_forma_aquisicao").value = "";
  document.getElementById("input_porte").value = "";*/
} 
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------