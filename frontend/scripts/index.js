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

    addMembersImage.addEventListener('click', async function () {
        const nomeDoItem = this.getAttribute('data-nome');
        const crNome = document.querySelector(".navbar");
        crNome.textContent = `Gerenciar CR ${item.nome}`;






        ///// AQUIII

        const allUsers = [];
        const membersList = [];

        async function fazerRequisicaoGET() {
            const url = 'http://localhost:8080/employee';

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();

                allUsers.push(...data);

                renderizarLista(data);
            } catch (error) {
                console.error('Erro na requisição:', error);
            }

            return allUsers;
        }

        console.log(membersList);

        async function renderizarLista(data) {
            const ul = document.getElementById('listUsers');
            ul.innerHTML = '';

            const matriculasExistem = new Set(membersList.map(user => user.matricula));

            data.forEach(item => {
                if (!matriculasExistem.has(item.matricula)) {
                    const li = document.createElement('li');
                    const p = document.createElement('p');
                    p.textContent = item.nome;
                    li.id = item.matricula;
                    li.appendChild(p);

                    if (item.funcao === 'gestor') {
                        li.style.border = '2px solid blue';
                    } else if (item.funcao === 'colaborador') {
                        li.style.border = '2px solid green';
                    } else if (item.funcao === 'admin') {
                        return;
                    }

                    li.classList.add("users-free");
                    li.addEventListener('click', event => {
                        toggleClasseSelectEImprimir(event, item);
                    });

                    ul.appendChild(li);
                }
            });
        }

        async function renderMembers(items) {
            const ul = document.getElementById("membersCr");


            ul.innerHTML = "";


            items.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `Nome: ${item.nome}, Função: ${item.funcao}`;
                ul.appendChild(li);
            });
        }


        async function loadMembers() {
            return fetch(`http://localhost:8080/cr/${item.codigoCr}/employees`)
                .then(response => response.json())
                .then(data => {
                    console.log(data); 
                    membersList.push(...data);
                    renderMembers(data);

                })
                .catch(error => console.error("Erro ao carregar membros:", error));
        }

        console.log("Valor de item.codigoCr:", item.codigoCr);


        loadMembers();




        const adicionarItensButton = document.getElementById('adicionarItens');

        async function toggleClasseSelectEImprimir(event, item) {
            const li = event.target;

            if (li.classList.contains('selected')) {
                li.classList.remove('selected');

            } else {
                li.classList.add('selected');

            }

            //console.log(item);
        }

        async function adicionarClasseSelect(event) {
            const li = event.target;
            li.classList.add('selected');
        }












        const elementosUsersFree = document.querySelectorAll('.users-free');


        const listaTodosUsusarios = fazerRequisicaoGET()



        elementosUsersFree.forEach(elemento => {
            elemento.addEventListener('click', function (event) {
                toggleClasseSelectEImprimir(event, item);
            });
        });





        function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }



        function moverItensSelecionados() {
            const listaUsuarios = document.getElementById('listUsers');
            const listaMembrosCr = document.getElementById('membersCr');


            const itensSelecionados = listaUsuarios.querySelectorAll('.selected');


            itensSelecionados.forEach(item => {
                allUsers.forEach(user => {
                    if (item.id == user.matricula) {

                        const liUser = document.createElement('li');
                        const nome = document.createElement('p');
                        const funcao = document.createElement('p');
                        nome.textContent = user.nome;

                        funcao.textContent = user.funcao.charAt(0).toUpperCase() + user.funcao.slice(1);

                        liUser.appendChild(nome);
                        liUser.appendChild(funcao);
                        liUser.classList.add("users-free");
                        listaMembrosCr.appendChild(liUser);


                        item.parentNode.removeChild(item);
                    }
                });
            });


            itensSelecionados.forEach(item => {
                item.classList.remove('selected');
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

                const segundoParagrafo = item.querySelector('p:nth-child(2)');
                if (segundoParagrafo) {
                    item.removeChild(segundoParagrafo);
                }

                listaUsuarios.appendChild(item);


                item.classList.add('selected');

                item.classList.remove('selected');
            });
        }


        const listaMembros = document.getElementById('membersCr');
        listaMembros.addEventListener('click', selecionarItem);


        const botaoRemoverUsuario = document.getElementById('removerUsuario');

        function limparSelecao() {
            const listaMembrosCr = document.getElementById('membersCr');
            const itensSelecionados = listaMembrosCr.querySelectorAll('.selected');

            itensSelecionados.forEach(item => {
                item.classList.remove('selected');
            });
        }



        botaoRemoverUsuario.addEventListener('click', () => {
            moverItensDeVolta();
            limparSelecao();
        });



        function salvarMembros(codigoCr, dataList) {
            const url = `http://localhost:8080/cr/${codigoCr}/member`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

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

                    console.log('Membros salvos:', savedMembers);
                })
                .catch(error => {
                    console.error('Erro ao salvar membros:', error);
                });
        }





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















window.addEventListener('load', fetchAndRenderData);