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


async function refreshListCr() {
    const listaCR = document.querySelector(".list-of-itens")
    listaCR.innerHTML = ""
    fetchAndRenderData()
}



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

    console.log(dados)

    try {
        await saveCenterResult(dados);
        refreshListCr()
        alert(`Centro De Resultado ${dados.nome} Cadastrado Com Sucesso`)
        nomeInput.value = "";
        codigoCrInput.value = "";
        siglaInput.value = "";


    } catch (error) {
        console.error('Erro ao adicionar o CR:', error);

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



        async function fazerRequisicaoGET() {
            const url = 'http://localhost:8080/employee';

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();




                return data;

            } catch (error) {
                console.error('Erro na requisição:', error);
            }

        }
        const ListMembersFree = await fazerRequisicaoGET()
        const listMembersOfCR = await loadMembers()

        renderizarLista(ListMembersFree)
        renderMembers(listMembersOfCR);


        async function renderizarLista(data) {
            const ul = document.getElementById('listUsers');
            ul.innerHTML = '';
            console.log("to aqui")
            const matriculasExistem = new Set(listMembersOfCR.map(user => user.matricula));
            console.log(matriculasExistem)
            data.forEach(item => {
                if (!matriculasExistem.has(item.matricula)) {
                    const li = document.createElement('li');

                    li.textContent = item.nome;
                    li.id = item.matricula;


                    if (item.funcao === 'gestor') {
                        li.style.border = '2px solid blue';
                    } else if (item.funcao === 'colaborador') {
                        li.style.border = '2px solid green';
                    } else if (item.funcao === 'admin') {
                        return;
                    }

                    li.classList.add("users-free");



                    ul.appendChild(li);
                }
            });
        }

        async function renderMembers(items) {
            const ul = document.getElementById("membersCr");


            ul.innerHTML = "";


            items.forEach(item => {
                const li = document.createElement("li");
                const nome = document.createElement("p");
                const funcao = document.createElement("p");
                nome.textContent = item.nome
                funcao.textContent = capitalize(item.funcao)
                li.classList.add("users-members")
                li.id = item.matricula
                li.append(nome, funcao)
                ul.appendChild(li);
            });
        }


        async function loadMembers() {
            return fetch(`http://localhost:8080/cr/${item.codigoCr}/employees`)
                .then(response => response.json())
                .then(data => {


                    return data
                })
                .catch(error => console.error("Erro ao carregar membros:", error));
        }









        async function toggleClasseSelectEImprimir(event, item) {
            const li = event.target;

            if (li.classList.contains('selected')) {
                li.classList.remove('selected');

            } else {
                li.classList.add('selected');

            }


        }


        const elementosUsersFree = document.querySelectorAll('.users-free');

        elementosUsersFree.forEach(elemento => {
            elemento.addEventListener('click', function (event) {
                toggleClasseSelectEImprimir(event, item);
            });
        });


        const elementosUsersMembers = document.querySelectorAll('.users-members');

        elementosUsersMembers.forEach(elemento => {
            elemento.addEventListener('click', function (event) {
                toggleClasseSelectEImprimir(event, item);
            });
        });


        function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }







        function limparSelecao() {
            const listaMembrosCr = document.getElementById('membersCr');
            const itensSelecionados = listaMembrosCr.querySelectorAll('.selected');

            itensSelecionados.forEach(item => {
                item.classList.remove('selected');
            });
        }




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





        function deleteMembers(codigoCr, matriculas) {
            return fetch(`http://localhost:8080/cr/${codigoCr}/employee`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(matriculas),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.text();
                    } else if (response.status === 404) {
                        throw new Error("Membros não encontrados.");
                    } else {
                        throw new Error("Erro ao remover membros.");
                    }
                })
                .then((data) => {
                    return data;
                })
                .catch((error) => {
                    throw error;
                });
        }



        async function refreshList() {
            const codigoCr = item.codigoCr;
            const listMembersOfCR = await loadMembers();
            const listFreeUsers = await fazerRequisicaoGET();
            const ulMembers = document.getElementById('membersCr');
            const ulFreeMembers = document.getElementById('listUsers');




            await renderMembers(listMembersOfCR);
        }



        async function buttonRemoveMembers() {
            const temp = []
            const users = document.querySelectorAll('.users-members.selected');
            users.forEach((user) => {
                const userId = user.id;
                temp.push(userId)
            });
            const matriculasExistem = new Set(listMembersOfCR.map(user => user.matricula));
            console.log(matriculasExistem)



            await deleteMembers(item.codigoCr, temp);
            ListMembersFree.forEach(user => {

                temp.forEach(userFreeRemoved => {
                    console.log(userFreeRemoved)
                    if (userFreeRemoved == user.matricula) {
                        const ulFreeMembers = document.getElementById('listUsers');
                        const li = document.createElement("li")

                        li.textContent = user.nome
                        li.id = item.matricula;


                        if (user.funcao === 'gestor') {
                            li.style.border = '2px solid blue';
                        } else if (user.funcao === 'colaborador') {
                            li.style.border = '2px solid green';
                        } else if (user.funcao === 'admin') {
                            return;
                        }

                        li.classList.add("users-free");

                        ulFreeMembers.appendChild(li)
                    }
                })
            })

            refreshList()

        }



        const removerUsuarioButton = document.getElementById('removerUsuario');
        removerUsuarioButton.addEventListener('click', buttonRemoveMembers);




        async function buttonAddMembers() {
            const temp = []
            const users = document.querySelectorAll('.users-free.selected');

            users.forEach((user) => {
                const userId = user.id;
                temp.push(userId)

            });

            salvarMembros(item.codigoCr, temp)

            const ulMembers = document.getElementById('#membersCr');
            ulMembers.innerHTML = '';


        }


        const addUsuarioButton = document.getElementById('adicionarUsuario');
        addUsuarioButton.addEventListener('click', buttonAddMembers);











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