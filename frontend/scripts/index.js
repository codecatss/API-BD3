const matriculaUsuarioLogado = localStorage.getItem("matricula");


const usuarioLogado = localStorage.getItem("nome");
const perfilUser = document.querySelector(".usuarioLogado");
perfilUser.textContent = usuarioLogado;
console.log(usuarioLogado)
const loggout = document.getElementById("loggout");
loggout.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../../index.html"

});

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




function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
    <img src="../assets/Icone editar.svg" alt="" class="config" ">
    </div>
    
    </div>
`;

    ulElement.appendChild(liElement);


    const addMembersImage = liElement.querySelector('.addMembers');


    const editCr = liElement.querySelector(".config")
    editCr.addEventListener('click', async function () {
        const modal = document.getElementById('myModalUpdate');
        modal.style.display = 'block';
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });


        async function updateCR(codigoCr, partialData) {
            const url = `http://localhost:8080/cr/${codigoCr}`;
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
                    return data;
                })
                .catch((error) => {
                    console.error('Erro na requisição PATCH:', error);
                    throw error;
                });
        }



        const nomeInput = document.querySelector('input[name="nomeUpdate"]');
        const siglaInput = document.querySelector('input[name="siglaUpdate"]');
        const codigoCrInput = document.querySelector('input[name="codigoCrUpdate"]');

        nomeInput.value = item.nome;
        siglaInput.value = item.sigla;
        codigoCrInput.value = item.codigoCr;

        const confirmarCR = document.getElementById("confirmarCRUpdate")

        confirmarCR.addEventListener("click", async function (event) {
            event.preventDefault()

            const nomezinho = nomeInput.value;
            const siglinha = siglaInput.value
            const codinho = codigoCrInput

            const dados = {
                sigla: siglinha,
                nome: nomezinho
            };

            console.log(dados)
            await updateCR(item.codigoCr, dados)
            refreshListCr()
            alert(`Centro De Resultado ${dados.nome} Alterado Com Sucesso`)
            modal.style.display = 'none';


        });










    })



    addMembersImage.addEventListener('click', async function () {
        const modal = document.getElementById('myModalAddMember');
        modal.style.display = 'block';
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        const crNome = document.querySelector(".navbar");
        crNome.textContent = `Gerenciar CR ${item.nome}`;



        function salvarMembros(codigoCr, dataList) {
            const url = `http://localhost:8080/cr/${codigoCr}/employee`;

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



        async function renderMembers(items) {
            const ul = document.getElementById("membersCr");


            ul.innerHTML = "";


            items.forEach(item => {
                const li = document.createElement("li");
                const nome = document.createElement("p");
                const funcao = document.createElement("p");
                const checkBoxUser = document.createElement("input")
                const div = document.createElement("div")
                checkBoxUser.type = "checkbox"
                nome.textContent = item.nome
                div.append(checkBoxUser, nome)
                funcao.textContent = capitalize(item.funcao)
                li.classList.add("users-members")
                li.id = item.matricula
                div.classList.add("checkboxWithUser")
                li.append(div, funcao)
                ul.appendChild(li);
            });
        }

        async function renderMembersForaDoCr(items) {
            const ul = document.getElementById("listUsers");


            ul.innerHTML = "";


            items.forEach(item => {
                const li = document.createElement("li");
                const nome = document.createElement("p");
                const checkBoxUser = document.createElement("input")
                const div = document.createElement("div")
                checkBoxUser.type = "checkbox"
                nome.textContent = item.nome
                div.append(checkBoxUser, nome)

                li.classList.add("users-free")
                li.id = item.matricula
                div.classList.add("checkboxWithUserForaCR")
                li.append(div)
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


        async function loadMembersNoInCr() {
            return fetch(`http://localhost:8080/cr/${item.codigoCr}/employeeNotInCr`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    return data
                })
                .catch(error => console.error("Erro ao carregar membros:", error));
        }

        const membrosForaDoCr = await loadMembersNoInCr()
        renderMembersForaDoCr(membrosForaDoCr)



        adicionarUsuario.addEventListener("click", async function () {
            const checkboxes = document.querySelectorAll(".checkboxWithUserForaCR input[type='checkbox']");
            const itensSelecionadosParaAdicionar = [];
            const usuariosAdicionar = []



            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const li = checkbox.closest("li");
                    const matricula = li.id;
                    itensSelecionadosParaAdicionar.push(matricula);
                }
            });
            console.log(itensSelecionadosParaAdicionar)
            itensSelecionadosParaAdicionar.forEach(user => {
                membrosForaDoCr.forEach(userFora => {
                    if (user == userFora.matricula) {
                        if (userFora.funcao == "gestor") {
                            console.log("entrei aqui")
                            const data = {
                                matriculaIntegrante: userFora.matricula,
                                gestor: true
                            }
                            usuariosAdicionar.push(data)

                        } else if (userFora.funcao == "colaborador") {
                            const data = {
                                matriculaIntegrante: userFora.matricula,
                                gestor: false
                            }
                            usuariosAdicionar.push(data)
                        }



                    }
                })


            })
            console.log(usuariosAdicionar)
            try {
                await salvarMembros(item.codigoCr, usuariosAdicionar);
                alert("Usuários Adicionados");
                modal.style.display = 'none';

            } catch (error) {
                console.error("Erro ao adicionar membros:", error);
            }

        })





        async function refreshListMembersInCR() {
            const listaMembersInCR = document.getElementById("membersCr")
            console.log("Passei aqui")
            listaMembersInCR.innerHTML = ""


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
                    console.log("estou aqui")
                    return data;
                })
                .catch((error) => {
                    throw error;
                });
        }

        const removerUsuario = document.getElementById("removerUsuario")
        const membrosCR = await loadMembers()
        renderMembers(membrosCR)

        removerUsuario.addEventListener("click", async function () {
            const checkboxes = document.querySelectorAll(".checkboxWithUser input[type='checkbox']");
            const itensSelecionadosRemove = [];

            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const li = checkbox.closest("li");
                    const matricula = li.id;
                    itensSelecionadosRemove.push(matricula);
                }
            });

            try {
                await deleteMembers(item.codigoCr, itensSelecionadosRemove);
                alert("Usuários Removidos");
                modal.style.display = 'none';


            } catch (error) {
                console.error("Erro ao excluir membros:", error);
            }

        })





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










fetchAndRenderData();


window.addEventListener('load', fetchAndRenderData);