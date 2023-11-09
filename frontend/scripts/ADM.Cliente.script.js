function toggleMode(liElement) {
    if (liElement.classList.contains('moved')) {
        liElement.classList.remove('moved');
        liElement.classList.add('light');
    } else {
        liElement.classList.remove('light');
        liElement.classList.add('moved');
    }
}
async function checkJWTToken() {
    const token = localStorage.getItem('jwt');
    console.log(token, "token");
    if (!token) {
        window.location.href = '../pages/login.html';
        console.log("Não tem token");
    }
}
checkJWTToken()

function enableClient(cnpj, liElement) {
    const apiUrl = `http://localhost:8080/clients/enable/${cnpj}`;

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


            const statusElement = liElement.querySelector('p:first-child');
            statusElement.textContent = 'ativo';

            statusElement.classList.remove('status-item-inativo');
            statusElement.classList.add('status-item');
        })
        .catch((error) => {
            console.error('Erro ao ativar o centro de resultado:', error);
        });
}

function softDeleteClient(cnpj, liElement) {
    const apiUrl = `http://localhost:8080/clients/disable/${cnpj}`;

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
            enableClient(codigoCr, liElement);
        } else {
            softDeleteClient(codigoCr, liElement);
        }

        switchElement.classList.toggle('moved');
        switchElement.classList.toggle('light');
    });
}

function fetchAndRenderData() {
    const apiUrl = 'http://localhost:8080/clients';
    const ulElement = document.querySelector('.list-of-itens');

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            ulElement.innerHTML = '';
            console.log(data);

            data.forEach((item) => {
                renderListItem(ulElement, item);
            });
        })
        .catch((error) => {
            console.error('Erro ao buscar dados da API:', error);
        });
}

function searchClientByTerm(searchTerm) {
    const apiUrl = `http://localhost:8080/clients`;

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
                        item.razao_social.toLowerCase().includes(searchTermLowerCase) ||
                        item.cnpj.toLowerCase().includes(searchTermLowerCase)
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


async function refreshListClient() {
    const listaCR = document.querySelector(".list-of-itens")
    listaCR.innerHTML = ""
    fetchAndRenderData()
}



async function handleEnviarClick(event) {
    event.preventDefault();

    const razaoSocialInput = document.querySelector('input[name="razao_social"]');
    const cnpjInput = document.querySelector('input[name="cnpj"]');

    const dados = {
        cnpj: cnpjInput.value,
        razao_social: razaoSocialInput.value,
        status_cliente: "ativo",
    };

    console.log(dados)

    try {
        await saveClient(dados);
        refreshListClient()
        alert(`Cliente ${dados.razao_social} cadastrado Com Sucesso`)
        razaoSocialInput.value = "";
        cnpjInput.value = "";


    } catch (error) {
        console.error('Erro ao adicionar o Cliente:', error);

    }
}

async function saveClient(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    const apiUrl = 'http://localhost:8080/clients';

    try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
            throw new Error('Erro na requisição POST');
        }
        const responseData = await response.json();
        console.log(responseData)
    } catch (error) {
        console.error('Erro ao fazer a requisição POST:', error);
        throw error;
    }
}



const confirmarButton = document.getElementById('confirmarCR');

confirmarButton.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log("entrei aqui");
    await handleEnviarClick(event);
});




function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}



function renderListItem(ulElement, item) {
    const liElement = document.createElement('li');
    liElement.classList.add('rendered-lista');
    const cnpj = item.cnpj;

    const switchClass = item.status === 'inativo' ? 'light' : 'moved';
    const statusClass = item.status === 'inativo' ? 'status-item-inativo' : 'status-item';

    liElement.innerHTML = `
    <p class="${statusClass}">${item.status}</p>
    <p>${item.razao_social}</p>
    <p>${item.cnpj}</p>
    
    <div class="actions">
        <div class="switch ${switchClass}">
            <button></button>
            <span></span>
        </div>
    <div class="icons">
        
    
    <img src="../assets/Icone editar.svg" alt="" class="config" ">
    </div>
    
    </div>
`;

    ulElement.appendChild(liElement);

    const editClient = liElement.querySelector(".config")
    editClient.addEventListener('click', async function () {
        const modal = document.getElementById('myModalUpdate');
        modal.style.display = 'block';
        window.addEventListener('click', function (event) {
            event.preventDefault();
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });


        async function updateClient(cnpj, partialData) {
            const url = `http://localhost:8080/clients/${cnpj}`;
            const requestOptions = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(partialData),
            };

            return fetch(url, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Erro na requisição: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    return data;
                })
                .catch((error) => {
                    console.error('Erro na requisição PATCH:', error);
                    throw error;
                });
        }



        const cnpjInput = document.querySelector('input[name="cnpjUpdate"]');
        const razaoSocialInput = document.querySelector('input[name="razao_socialUpdate"]');
        console.log(cnpjInput);
        console.log(item);
        cnpjInput.value = item.cnpj;
        razaoSocialInput.value = item.razao_social;

        const confirmarClient = document.getElementById("confirmarClienteUpdate")

        confirmarClient.addEventListener("click", async function (event) {
            event.preventDefault()

            const siglinha = razaoSocialInput.value;

            const dados = {
                razao_social: siglinha,
            };

            console.log(dados)
            updateClient(item.cnpj, dados);
            alert(`Cliente ${dados.razao_social} Alterado Com Sucesso`)
            refreshListClient();
            modal.style.display = 'none';
            window.location.reload();


        });


        function closeModalFunction() {
            console.log("Ola")
            modal.style.display = 'none';
        }

        closeModal.addEventListener('click', closeModalFunction);
        const cancelarButton = document.querySelector('.cancelarButton');
        cancelarButton.addEventListener('click', closeModalFunction);







    })

    addSwitchClickEvent(liElement, cnpj, item.status);


}









const searchImage = document.querySelector('.search-bar img');
searchImage.addEventListener('click', function () {
    const searchTerm = document.querySelector('.input-search').value;
    searchClientByTerm(searchTerm);
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
    console.log("Ola")
    modal.style.display = 'none';
}

closeModal.addEventListener('click', closeModalFunction);
const cancelarButton = document.querySelector('.cancelarButton');
cancelarButton.addEventListener('click', closeModalFunction);










fetchAndRenderData();


window.addEventListener('load', fetchAndRenderData);