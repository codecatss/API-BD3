

const listarHoras = async () => {
    try {
        const response = await fetch('http://localhost:8080/hora/pendentesAdmin');
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








const inputSearch = document.querySelector(".input-search");

inputSearch.addEventListener("input", function () {
    const searchText = inputSearch.value.toLowerCase(); 

    const horas = document.querySelectorAll(".horaLancada");

    horas.forEach(function (hora) {
        const nomeUsuario = hora.querySelector("p:nth-child(2)").textContent.toLowerCase(); 
        const crHora = hora.querySelector("p:nth-child(7)").textContent.toLowerCase(); 
        const statusHora = hora.querySelector("p:nth-child(4)").textContent.toLowerCase();
        const cliente = hora.querySelector("p:nth-child(8)").textContent.toLowerCase(); 


        if (
            searchText === "" ||
            nomeUsuario.includes(searchText) ||
            crHora.includes(searchText) ||
            statusHora.includes(searchText) ||
            cliente.includes(searchText)
        ) {
            hora.style.display = "grid"; 
        } else {
            hora.style.display = "none"; 
        }
    });
});








let horasSelecionadas = [];


const btnAprovar = document.querySelector(".hora-aprova");

btnAprovar.addEventListener("click", async function () {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");


    horasSelecionadas.length = 0;

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {

            const idHora = checkbox.parentElement.dataset.horaId;
            horasSelecionadas.push(idHora);
        }
    });


    if (horasSelecionadas.length > 0) {

        const promises = horasSelecionadas.map(async function (idHora) {
            console.log(idHora);
            await atualizarHora(idHora, {
            status_aprovacao: "APROVADO_ADMIN",
                matricula_admin: 6987,
                data_modificacao_admin: new Date(),
            });
        });

        await Promise.all(promises);


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


    horasSelecionadas.length = 0;

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {

            const idHora = checkbox.parentElement.dataset.horaId;
            horasSelecionadas.push(idHora);
        }
    });


    if (horasSelecionadas.length == 1) {
        const modal = document.getElementById("modalReprovar");
        modal.style.display = "block";


        console.log(horasSelecionadas);
        const btnConfirmar = document.querySelector(".aceitarReprovacao");

        btnConfirmar.addEventListener("click", async function () {
            const justificativa = document.querySelector("#justificativa").value;
            console.log(horasSelecionadas);


            await atualizarHora(horasSelecionadas[0], {
                status_aprovacao: "NEGADO_ADMIN",
                matricula_admin: 6987,
                data_modificacao_admin: new Date(),
                justificativa_negacao: justificativa,
            });


            listaHoras.innerHTML = "";
            const horasCadastradas = await listarHoras();

            await carregarHorasNaLista(horasCadastradas);

            document.querySelector("#justificativa").value = ""; 

            modal.style.display = "none";
        })



        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        console.log(horasSelecionadas)
        console.log(horasSelecionadas)
    } else if (horasSelecionadas.length >= 2) {

        alert("Precisa selecionar apenas uma hora para reprovar.");
    }


});
