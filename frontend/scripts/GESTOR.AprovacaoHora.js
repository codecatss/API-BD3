

const filterSelected = document.getElementById("filterSelected");
const usuarioLogado = localStorage.getItem("nome");
const perfilUser = document.querySelector(".usuarioLogado");
perfilUser.textContent = usuarioLogado;
console.log(usuarioLogado)
const loggout = document.getElementById("loggout");
loggout.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "http://localhost:5500/index.html"

});



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




const listaHoras = document.getElementById("listaHoras");
async function carregarHorasNaLista(horas) {
    console.log("vou resetar o ul")

    listaHoras.innerHTML = "";


    horas.forEach((hora) => {

        const razaoSocial = todosClientes.find(item => hora.cnpj === item.cnpj)?.razao_social || null;
        const centroResultado = todosCr.find(item => hora.codcr === item.codigoCr)?.nome || null;
        const usuario = todosUsuarios.find(item => hora.lancador === item.matricula)?.nome || null;








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

        if (hora.tipo == "SOBREAVISO") {
            li.classList.add("horaSobreaviso");
        } 
        
        else if (hora.tipo == "EXTRA") {
            li.classList.add("horaExtra");
        } 
        
        else if (hora.tipo == "ACIONAMENTO") {
            li.classList.add("horaExtra");
            li.textContent = "EXTRA";
        }

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
            console.log(hora)
            const usuariollancador = todosUsuarios.find(item => hora.lancador === item.matricula)?.nome || null;
            const cienteLancado = todosClientes.find(item => hora.cnpj === item.cnpj)?.razao_social || null;
            console.log(usuariollancador)

            const usuario = document.querySelector(".nome-usuario");
            const tipo = document.querySelector("p");
            const status = document.querySelector("p");
            const inicio = document.querySelector(".hora-inicio");
            const fim = document.querySelector(".hora-fim");
            const cr = document.querySelector(".nome-cr");
            const cliente = document.querySelector(".nome-cliente");
            const justificativa = document.querySelector(".motivo-justificativa");
            const solicitante = document.querySelector(".nome-solicitante");
            const projeto = document.querySelector(".nome-projeto");
            const justificativaNegacao = document.querySelector(".motivo-justificativa-gestor");
            const matriculaGestor = document.querySelector(".nome-aprovador");
            const dataModificacaoGestor = document.querySelector(".aprovacao-data");
            const listaHoras = document.querySelector(".acionamentos");
            const btnFechar = document.querySelector("button");

            usuario.textContent = usuariollancador
            tipo.textContent = hora.tipo
            status.textContent = hora.status_aprovacao
            console.log(hora.data_hora_inicio)
            inicio.textContent = hora.data_hora_inicio
            fim.textContent = hora.data_hora_fim
            cr.textContent = hora.codcr
            cliente.textContent = cienteLancado
            justificativa.textContent = hora.justificativa
            solicitante.textContent = hora.solicitante
            projeto.textContent = hora.projeto
            justificativaNegacao.textContent = hora.statusHora == "NEGADO_GESTOR" ? hora.justificativa_negacao : "Hora não foi negada.";

            console.log(hora.lista_de_acionamentos)
            if (hora.tipo == "SOBREAVISO") {
                if (hora.lista_de_acionamentos.length > 0) {
                    hora.lista_de_acionamentos.forEach((acionamento) => {
                        const lista = document.querySelector(".acionamentos");
                        const li = document.createElement("li");
                        li.textContent = acionamento;
                        lista.appendChild(li);
                    }
                    )
                } else if (hora.lista_de_acionamentos.length == 0) {
                    listaHoras.textContent = "Não houve acionamento.";

                }
            } else {
                listaHoras.textContent = "Hora-extra não possui acionamento";
            }




            matriculaGestor.textContent = hora.matricula_gestor
            function dataFormatada(pElement, dataString) {
                let data = new Date(dataString);
                let dia = data.getDate().toString().padStart(2, '0');
                let mes = (data.getMonth() + 1).toString().padStart(2, '0');
                let ano = data.getFullYear();
                let horaFormatada = data.getHours().toString().padStart(2, '0');
                let minuto = data.getMinutes().toString().padStart(2, '0');
                let segundo = data.getSeconds().toString().padStart(2, '0');

                pElement.textContent = `${dia}/${mes}/${ano} ${horaFormatada}:${minuto}:${segundo}`;
            }

            dataFormatada(inicio, hora.data_hora_inicio);

            dataFormatada(fim, hora.data_hora_fim);

            dataFormatada(dataModificacaoGestor, hora.data_modificacao_gestor);

            btnFechar.textContent = "FECHAR";






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
                status_aprovacao: "APROVADO_GESTOR",
                matricula_gestor: 4533,
                data_modificacao_gestor: new Date(),
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
                status_aprovacao: "NEGADO_GESTOR",
                matricula_gestor: 4533,
                data_modificacao_gestor: new Date(),
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



filterSelected.addEventListener("change", async function () {
    if (filterSelected.value == "todas") {
        const horasCadastradas = await listarHoras();
        await carregarHorasNaLista(horasCadastradas);
    }
    else {
        const horasCadastradas = await listarHoras();
        const horasFiltradas = horasCadastradas.filter((hora) => hora.status_aprovacao == filterSelected.value);
        await carregarHorasNaLista(horasFiltradas);

    }

});