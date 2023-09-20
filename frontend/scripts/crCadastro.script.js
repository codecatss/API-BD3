function toggleMode(liElement) {
    if (liElement.classList.contains('moved')) {
        liElement.classList.remove('moved');
        liElement.classList.add('light');
    } else {
        liElement.classList.remove('light');
        liElement.classList.add('moved');
    }
}

function enableCenterResult(codigoCr, liElement) {
    const apiUrl = `http://localhost:8080/cr/enable/${codigoCr}`;

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    fetch(apiUrl, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Centro de resultado ativado com sucesso:', data);

            const statusElement = liElement.querySelector('p:first-child');
            statusElement.textContent = 'ativo';


            statusElement.classList.remove('status-item-inativo');
            statusElement.classList.add('status-item');


        })
        .catch((error) => {
            console.error('Erro ao ativar o centro de resultado:', error);
        });
}

function softDeleteCenterResult(codigoCr, liElement) {
    const apiUrl = `http://localhost:8080/cr/${codigoCr}`;

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    fetch(apiUrl, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Soft delete realizado com sucesso:', data);

            const statusElement = liElement.querySelector('p:first-child');
            statusElement.textContent = 'inativo';


            statusElement.classList.add('status-item-inativo');
        })
        .catch((error) => {
            console.error('Erro ao realizar o soft delete:', error);
        });
}


function addSwitchClickEvent(liElement, codigoCr) {
    const switchElement = liElement.querySelector('.switch');
    const statusElement = liElement.querySelector('p:first-child');

    switchElement.addEventListener('click', function () {
        if (statusElement.textContent === 'inativo') {
            enableCenterResult(codigoCr, liElement);
        } else {
            softDeleteCenterResult(codigoCr, liElement);
        }

        switchElement.classList.toggle('moved');
        switchElement.classList.toggle('light');
    });
}

function fetchAndRenderData() {
    const apiUrl = 'http://localhost:8080/cr';
    const ulElement = document.querySelector('.list-of-itens');

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            ulElement.innerHTML = '';
            console.log(data);

            data.forEach((item) => {
                const liElement = document.createElement('li');
                liElement.classList.add('rendered-lista');
                const codigoCr = item.codigoCr;

                const switchClass = item.statusCr === 'inativo' ? 'light' : 'moved';
                const statusClass = item.statusCr === 'inativo' ? 'status-item-inativo' : 'status-item';


                liElement.innerHTML = `
          <p class=${statusClass}>${item.statusCr}</p>
          <p>${item.nome}</p>
          <p>${item.codigoCr}</p>
          <p>${item.sigla}</p>
          
          <div class="actions">
            <div class="switch ${switchClass}">
              <button></button>
              <span></span>
            </div>
            <img src="../assets/dots.svg" alt="">
          </div>
        `;

                ulElement.appendChild(liElement);

                addSwitchClickEvent(liElement, codigoCr, item.statusCr);
            });
        })
        .catch((error) => {
            console.error('Erro ao buscar dados da API:', error);
        });
}


function searchCRByTerm(searchTerm) {
    const apiUrl = `http://localhost:8080/cr`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const ulElement = document.querySelector('.list-of-itens');
            ulElement.innerHTML = '';

            const searchTermLowerCase = searchTerm.toLowerCase();

            if (searchTermLowerCase.trim() === '') {

                data.forEach((item) => {
                    renderListItem(ulElement, item);
                });
            } else {

                const filteredData = data.filter((item) => {
                    return (
                        item.nome.toLowerCase().includes(searchTermLowerCase) ||
                        item.codigoCr.toLowerCase().includes(searchTermLowerCase) ||
                        item.sigla.toLowerCase().includes(searchTermLowerCase)
                    );
                });

                filteredData.forEach((item) => {
                    renderListItem(ulElement, item);
                });
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar dados da API:', error);
        });
}


function renderListItem(ulElement, item) {
    const liElement = document.createElement('li');
    liElement.classList.add('rendered-lista');
    const codigoCr = item.codigoCr;

    const switchClass = item.statusCr === 'inativo' ? 'light' : 'moved';


    const statusClass = item.statusCr === 'inativo' ? 'status-item-inativo' : 'status-item';

    liElement.innerHTML = `
    <p class="${statusClass}">${item.statusCr}</p>
    <p>${item.nome}</p>
    <p>${item.codigoCr}</p>
    <p>${item.sigla}</p>
    
    <div class="actions">
      <div class="switch ${switchClass}">
        <button></button>
        <span></span>
      </div>
      <img src="../assets/dots.svg" alt="">
    </div>
  `;

    ulElement.appendChild(liElement);

    addSwitchClickEvent(liElement, codigoCr, item.statusCr);
}


const searchImage = document.querySelector('.search-bar img');
searchImage.addEventListener('click', function () {
    const searchTerm = document.querySelector('.input-search').value;
    searchCRByTerm(searchTerm);
});


const addButton = document.querySelector('button');
const modal = document.getElementById('myModal');
const closeModal = document.querySelector('#closeModal');


function openModal() {
    modal.style.display = 'block';
}

addButton.addEventListener('click', openModal);


closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
});


window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});




function closeModalFunction() {
    modal.style.display = 'none';
}

closeModal.addEventListener('click', closeModalFunction);




function handleEnviarClick(event) {
    event.preventDefault();


    const nomeInput = document.querySelector('input[name="nome"]');
    const siglaInput = document.querySelector('input[name="sigla"]');
    const codigoCrInput = document.querySelector('input[name="codigoCr"]');


    const dados = {
        codigoCr: codigoCrInput.value,
        sigla: siglaInput.value,
        nome: nomeInput.value,
        statusCr: "ativo",
    };

    console.log('Dados a serem enviados:', dados);


    saveCenterResult(dados);

    // Limpa os campos de entrada
    nomeInput.value = "";
    codigoCrInput.value = "";
    siglaInput.value = "";
}





function saveCenterResult(data) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };


    const apiUrl = 'http://localhost:8080/cr';

    fetch(apiUrl, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na requisição POST');
            }
            return response.json();
        })
        .then((responseData) => {
            console.log('Resposta da requisição POST:', responseData);
        })
        .catch((error) => {
            console.error('Erro ao fazer a requisição POST:', error);
        });
}







const confirmarButton = document.querySelector('.confirmar');
confirmarButton.addEventListener('click', handleEnviarClick);







window.addEventListener('click', function (event) {
    if (event.target === modal) {
        closeModalFunction();
    }
});






window.addEventListener('load', fetchAndRenderData);