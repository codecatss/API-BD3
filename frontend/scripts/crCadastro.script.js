
console.log("ola")



function toggleMode(liElement) {
    if (liElement.classList.contains('moved')) {
        liElement.classList.remove('moved');
        liElement.classList.add('light');
    } else {
        liElement.classList.remove('light');
        liElement.classList.add('moved');
    }
}
console.log("oltudo bema")

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
                renderListItem(ulElement, item);
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
    <div class="icons">
        
    
    <img src="../assets/addUsuario.png" alt="" class="addMembers" data-nome="${item.nome}">
    <img src="../assets/Icone ajustavel.png" alt="" class="config" ">
    </div>
    
    </div>
`;

    ulElement.appendChild(liElement);


    const addMembersImage = liElement.querySelector('.addMembers');

    addMembersImage.addEventListener('click', function () {
        const nomeDoItem = this.getAttribute('data-nome');
        const crNome = document.querySelector(".navbar")
        crNome.textContent = `Gerenciar CR ${item.nome}`


    });





    addMembersImage.addEventListener('click', function () {

        const modal = document.getElementById('myModalAddMember');
        modal.style.display = 'block';




        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });



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

const cancelarButton = document.querySelector('.cancelar');
cancelarButton.addEventListener('click', closeModalFunction);

async function handleEnviarClick(event) {
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

    try {
        await saveCenterResult(dados);
        showSuccessMessage();

        nomeInput.value = "";
        codigoCrInput.value = "";
        siglaInput.value = "";

        refreshList();
    } catch (error) {
        console.error('Erro ao adicionar o CR:', error);
        showErrorMessage();
    }
}

async function saveCenterResult(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    const apiUrl = 'http://localhost:8080/cr';

    try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
            throw new Error('Erro na requisição POST');
        }
        const responseData = await response.json();
        console.log('Resposta da requisição POST:', responseData);
    } catch (error) {
        console.error('Erro ao fazer a requisição POST:', error);
        throw error;
    }
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.backgroundColor = 'green';
    successMessage.style.display = 'block';
    successMessage.style.position = 'fixed';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

function showErrorMessage() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.backgroundColor = 'red';
    errorMessage.style.display = 'block';
    errorMessage.style.position = 'fixed';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 2000);
}
fetchAndRenderData();



let allUsers = []; // Variável para armazenar todos os objetos
const adicionarItensButton = document.getElementById('adicionarItens');

async function toggleClasseSelectEImprimir(event, item) {
    const li = event.target;

    if (li.classList.contains('selected')) {
        li.classList.remove('selected');
        console.log('Classe "selected" removida');
    } else {
        li.classList.add('selected');
        console.log('Classe "selected" adicionada');
    }

    console.log('Objeto clicado:', item);
}

async function adicionarClasseSelect(event) {
    const li = event.target;
    li.classList.add('selected');
}

// Função para fazer a requisição GET
async function fazerRequisicaoGET() {
    // URL da API
    const url = 'http://localhost:8080/employee';

    try {
        // Faz a requisição GET com await
        const response = await fetch(url);

        // Verifica se a resposta tem status 200 (OK)
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        // Converte a resposta para JSON com await
        const data = await response.json();

        // Armazena os itens da API
        allUsers = data;

        // Manipula os dados recebidos
        console.log(data);
        renderizarLista(data);
    } catch (error) {
        // Trata erros
        console.error('Erro na requisição:', error);
    }
}

// Função para renderizar a lista no elemento UL
function renderizarLista(data) {
    console.log(data);
    const ul = document.getElementById('listUsers');
    ul.innerHTML = ''; // Limpa o conteúdo existente

    // Itera sobre os itens e cria um elemento LI para cada um
    data.forEach(item => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.textContent = item.nome;
        li.id = item.matricula;
        li.appendChild(p);

        // Define a borda com base na função do item
        if (item.funcao === 'gestor') {
            li.style.border = '2px solid blue';
        } else if (item.funcao === 'colaborador') {
            li.style.border = '2px solid green';
        } else if (item.funcao === 'admin') {
            // Não renderiza o item
            return;
        }

        li.classList.add("users-free");
        li.addEventListener('click', event => {
            toggleClasseSelectEImprimir(event, item);
        });

        ul.appendChild(li);
    });
}


// Inicializa a requisição GET ao carregar a página



// Função para mover itens selecionados da lista para a outra lista
function moverItensSelecionados() {
    const listaUsuarios = document.getElementById('listUsers');
    const listaMembrosCr = document.getElementById('membersCr');

    // Obtém todos os itens selecionados com a classe "selected"
    const itensSelecionados = listaUsuarios.querySelectorAll('.selected');

    console.log(itensSelecionados)
    // Move os itens selecionados para a outra lista
    itensSelecionados.forEach(item => {
        listaMembrosCr.appendChild(item);
        console.log(item)
        item.classList.remove('selected'); // Remove a classe "selected"
    });


}


const botaoAdicionarUsuario = document.getElementById('adicionarUsuario');
botaoAdicionarUsuario.addEventListener('click', moverItensSelecionados);


function selecionarItem(event) {
    const li = event.target;
    li.classList.add('selected');
}


function moverItensDeVolta() {
    const listaUsuarios = document.getElementById('listUsers');
    const listaMembrosCr = document.getElementById('membersCr');


    const itensSelecionados = listaMembrosCr.querySelectorAll('.selected');


    itensSelecionados.forEach(item => {
        listaUsuarios.appendChild(item);
        item.classList.remove('selected');
    });
}


const listaMembros = document.getElementById('membersCr');
listaMembros.addEventListener('click', selecionarItem);


const botaoRemoverUsuario = document.getElementById('removerUsuario');

function limparSelecao() {
    const listaMembrosCr = document.getElementById('membersCr');
    const itensSelecionados = listaMembrosCr.querySelectorAll('.select');

    itensSelecionados.forEach(item => {
        item.classList.remove('select');
    });
}



botaoRemoverUsuario.addEventListener('click', () => {
    moverItensDeVolta();
    limparSelecao();
});



function salvarMembros(codigoCr, dataList) {
    const url = `/seu-endpoint-aqui/${codigoCr}/member`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Se você precisar de autenticação ou outros cabeçalhos, adicione-os aqui
        },
        body: JSON.stringify(dataList),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar membros');
            }
            return response.json();
        })
        .then(savedMembers => {
            // Os membros foram salvos com sucesso
            console.log('Membros salvos:', savedMembers);
        })
        .catch(error => {
            console.error('Erro ao salvar membros:', error);
        });
}







window.addEventListener('load', fazerRequisicaoGET);




window.addEventListener('load', fetchAndRenderData);