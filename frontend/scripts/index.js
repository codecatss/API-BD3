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