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

    switchElement.classList.toggle('light');
    switchElement.classList.toggle('moved');
  });
}

function fetchAndRenderData() {
  const apiUrl = 'http://localhost:8080/cr';
  const ulElement = document.querySelector('.teste');

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      ulElement.innerHTML = '';
      console.log(data);

      data.forEach((item) => {
        const liElement = document.createElement('li');
        liElement.classList.add('teste-lista');
        const codigoCr = item.codigoCr;

        const switchClass = item.statusCr === 'inativo' ? 'moved' : 'light';

        liElement.innerHTML = `
          <p>${item.statusCr}</p>
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
      const ulElement = document.querySelector('.teste');
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