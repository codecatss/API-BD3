

const listarHoras = async () => {
    try {
        const response = await fetch('http://localhost:8080/hora/pendentes');
        if (!response.ok) {
            throw new Error('Não foi possível obter os dados.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const horasCadastradas = await listarHoras();



const obterTodosClientes = async () => {
    try {
        const response = await fetch('http://localhost:8080/clients');

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

const todosClientes = await obterTodosClientes()



const obterTodosCr = async () => {
    try {
        const response = await fetch('http://localhost:8080/cr');

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

const todosCr = await obterTodosCr()


const obterTodosUsuarios = async () => {
    try {
        const response = await fetch('http://localhost:8080/employee');

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
};

const todosUsuarios = await obterTodosUsuarios()
console.log(todosUsuarios)



const listaHoras = document.getElementById("listaHoras");
async function carregarHorasNaLista(horas) {
    console.log("vou resetar o ul")

    listaHoras.innerHTML = "";


    horas.forEach((hora) => {

        const razaoSocial = todosClientes.find(item => hora.cnpj === item.cnpj)?.razao_social || null;
        const centroResultado = todosCr.find(item => hora.codcr === item.codigoCr)?.nome || null;
        const usuario = todosUsuarios.find(item => hora.lancador === item.matricula)?.nome || null;
        console.log(usuario)







        const li = document.createElement("li");
        const tipoHora = document.createElement("p");
        const statusHora = document.createElement("p");
        const inicioHora = document.createElement("p");
        const fimHora = document.createElement("p");
        const crHora = document.createElement("p");
        const clienteHora = document.createElement("p");
        const lancador = document.createElement("p");
        const justificativaHora = document.createElement("p");
        const checkbox = document.createElement("input");
        const ver = document.createElement("button");

        checkbox.type = "checkbox";

        tipoHora.textContent = hora.tipo;
        statusHora.textContent = hora.status_aprovacao;
        if (hora.status_aprovacao == "PENDENTE") {
            statusHora.classList.add("hora-pendente");
        } else if (hora.status_aprovacao == "NEGADO_GESTOR") {
            statusHora.textContent = "NEGADO";
            statusHora.classList.add("hora-negada");
        } else if (hora.status_aprovacao == "APROVADO_GESTOR") {
            statusHora.textContent = "APROVADO";
            statusHora.classList.add("hora-aprovada");
        }

        const dataHoraInicio = new Date(hora.data_hora_inicio);
        const dataInicioFormatada = dataHoraInicio.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        const horaInicioFormatada = dataHoraInicio.toLocaleTimeString('pt-BR', { timeZone: 'UTC' });
        inicioHora.textContent = `${dataInicioFormatada} | ${horaInicioFormatada}`;


        const dataHoraFim = new Date(hora.data_hora_fim);
        const dataFimFormatada = dataHoraFim.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        const horaFimFormatada = dataHoraFim.toLocaleTimeString('pt-BR', { timeZone: 'UTC' });
        fimHora.textContent = `${dataFimFormatada} | ${horaFimFormatada}`;

        crHora.textContent = centroResultado
        clienteHora.textContent = razaoSocial
        lancador.textContent = usuario;
        justificativaHora.textContent = hora.justificativa;
        ver.textContent = "VER";
        li.classList.add("horaLancada");
        ver.classList.add("btnver");

        li.dataset.horaId = hora.id;
        li.append(checkbox, statusHora, lancador, tipoHora, inicioHora, fimHora, crHora, clienteHora, ver);
        listaHoras.appendChild(li);


        ver.addEventListener("click", function () {
            const modal = document.getElementById("modalSobreAviso");
            modal.style.display = "block";
            console.log(hora.id)


            const div = document.querySelector(".modal-content")
            const p = document.createElement("p");

            p.textContent = hora.tipo;

            div.appendChild(p);


        });

        window.addEventListener('click', function (event) {
            if (event.target === modalSobreAviso) {
                modalSobreAviso.style.display = 'none';
            }
        });


    });
}




console.log(horasCadastradas)

await carregarHorasNaLista(horasCadastradas);






async function atualizarHora(id, partialData) {
    try {
        const response = await fetch(`http://localhost:8080/hora/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(partialData),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar a hora.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}







// Adicione um ouvinte de eventos de input ao campo de pesquisa
const inputSearch = document.querySelector(".input-search");

inputSearch.addEventListener("input", function () {
    const searchText = inputSearch.value.toLowerCase(); // Obtém o texto de pesquisa em letras minúsculas

    const horas = document.querySelectorAll(".horaLancada");

    horas.forEach(function (hora) {
        const nomeUsuario = hora.querySelector("p:nth-child(2)").textContent.toLowerCase(); // Obtém o nome do usuário em letras minúsculas
        const crHora = hora.querySelector("p:nth-child(7)").textContent.toLowerCase(); // Obtém o CR da hora em letras minúsculas
        const statusHora = hora.querySelector("p:nth-child(4)").textContent.toLowerCase();
        const cliente = hora.querySelector("p:nth-child(8)").textContent.toLowerCase(); // Obtém o status da hora em letras minúsculas


        if (
            searchText === "" ||
            nomeUsuario.includes(searchText) ||
            crHora.includes(searchText) ||
            statusHora.includes(searchText) ||
            cliente.includes(searchText)
        ) {
            hora.style.display = "grid"; // Define o estilo de layout da hora para "grid"
        } else {
            hora.style.display = "none"; // Oculta a hora se não houver correspondência
        }
    });
});







// Array para armazenar os IDs das horas selecionadas
let horasSelecionadas = [];

// Adicione um ouvinte de eventos ao botão "Aprovar"
const btnAprovar = document.querySelector(".hora-aprova");

btnAprovar.addEventListener("click", async function () {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    // Limpe o array de horas selecionadas a cada clique no botão
    horasSelecionadas.length = 0;

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            // Se o checkbox estiver marcado, obtenha o valor do ID da hora e adicione ao array
            const idHora = checkbox.parentElement.dataset.horaId;
            horasSelecionadas.push(idHora);
        }
    });

    // Exiba os IDs das horas selecionadas
    if (horasSelecionadas.length > 0) {

        const promises = horasSelecionadas.map(async function (idHora) {
            console.log(idHora);
            await atualizarHora(idHora, {
                status_aprovacao: "APROVADO_GESTOR",
                matricula_gestor: 4533,
                data_modificacao_gestor: new Date(),
            });
        });

        await Promise.all(promises);

        // Update the list after the approval
        listaHoras.innerHTML = "";

        const horasCadastradas = await listarHoras();

        await carregarHorasNaLista(horasCadastradas);

        horasSelecionadas = [];

    } else {
        alert("Nenhuma hora foi marcada para aprovação.");
    }
});

const btnReprovar = document.querySelector(".hora-reprova");

btnReprovar.addEventListener("click", async function () {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    // Limpe o array de horas selecionadas a cada clique no botão
    horasSelecionadas.length = 0;

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            // Se o checkbox estiver marcado, obtenha o valor do ID da hora e adicione ao array
            const idHora = checkbox.parentElement.dataset.horaId;
            horasSelecionadas.push(idHora);
        }
    });

    // Exiba os IDs das horas selecionadas
    if (horasSelecionadas.length > 0) {

        horasSelecionadas.forEach(async function (idHora) {
            console.log(idHora);
            await atualizarHora(idHora, {
                status_aprovacao: "NEGADO_GESTOR",
                matricula_gestor: 4533,
                data_modificacao_gestor: new Date(),
                justificativa_negacao: "Não foi possível aprovar a hora.",
            });
            listaHoras.innerHTML = "";
            const horasCadastradas = await listarHoras();

            await carregarHorasNaLista(horasCadastradas);

        });

        // Atualize a lista de horas com os dados mais recentes do servidor

        console.log(horasSelecionadas)
        horasSelecionadas = [];
        console.log(horasSelecionadas)
    } else {
        alert("Nenhuma hora foi marcada para aprovação.");
    }
});

const checkboxes = document.querySelectorAll("input[type='checkbox']");


checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        const checkedCheckboxes = document.querySelectorAll("input[type='checkbox']:checked");
        if (checkedCheckboxes.length > 1) {
            btnReprovar.disabled = true;
        } else {
            btnReprovar.disabled = false;
        }
    });
});