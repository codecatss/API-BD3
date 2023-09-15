function toggleMode(liElement) {

  if (liElement.classList.contains('moved')) {

    liElement.classList.remove('moved');
    liElement.classList.add('light');
  } else {

    liElement.classList.remove('light');
    liElement.classList.add('moved');
  }
}


function fetchAndRenderData() {

  const apiUrl = 'http://localhost:8080/cr';


  const ulElement = document.querySelector('.teste');


  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {

      ulElement.innerHTML = '';
      console.log(data)

      data.forEach((item) => {
        const liElement = document.createElement('li');
        liElement.classList.add('teste-lista');
        console.log(item.statusCr)

        liElement.innerHTML = `
          <p>${item.statusCr}</p>
          <p>${item.nome}</p>
          <p>${item.codigoCr}</p>
          <p>${item.sigla}</p>

          <div class="actions">
            <div class="switch light" onclick="toggleMode(this)">
            <button></button>
            <span></span>
          </div>
            <img src="../assets/dots.svg" alt="">
          </div>
        `;


        ulElement.appendChild(liElement);
      });
    })
    .catch((error) => {
      console.error('Erro ao buscar dados da API:', error);
    });
}


window.addEventListener('load', fetchAndRenderData);