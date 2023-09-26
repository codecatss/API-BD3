const tipoHoraInput = document.getElementById("selecionarTipoHora");
const selecionarEmpresaInput = document.getElementById("selecionarEmpresa");
const justificativaHoraInput = document.getElementById("justificativaHora");
const dataInicioInput = document.getElementById("dataInicio");
const horaInicioInput = document.getElementById("horaInicio");
const projetoHoraInput = document.getElementById("projetoHora");
const dataFimInput = document.getElementById("dataFim");
const horaFimInput = document.getElementById("horaFim");
const solicitanteHoraInput = document.getElementById("solicitanteHora");
const selecionarCRInput = document.getElementById("selecionarCr")
const botaoConfirmar = document.getElementById("adicionarBotao");



const horaSobreaviso = []


// SOBREAVISOO

const dataInicioInputSobreaviso = document.querySelector(".dataInicioSobreaviso");
const horaInicioInputSobreaviso = document.querySelector(".horaInicioSobreaviso");
const dataFimInputSobreaviso = document.querySelector(".dataFimSobreaviso");
const horaFimInputSobreaviso = document.querySelector(".horaFimSobreaviso");
const botaoConfirmarSobreaviso = document.getElementById("botaoConfirmar");
const botaoSalvarSobreaviso = document.getElementById("botaoSalvar")





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





function popularSelectEmpresas(clientes) {
    const selectEmpresa = document.getElementById("selecionarEmpresa");

    selectEmpresa.innerHTML = "";


    const optionPadrao = document.createElement("option");
    optionPadrao.value = "";
    optionPadrao.textContent = "Selecione a empresa";
    optionPadrao.disabled = true;
    optionPadrao.selected = true;


    selectEmpresa.appendChild(optionPadrao);


    clientes.forEach((cliente) => {
        const option = document.createElement("option");
        option.value = cliente.cnpj;
        option.textContent = cliente.razao_social;
        selectEmpresa.appendChild(option);
    });
}

function popularSelectCr(centroDeResultado) {
    const selectCr = document.getElementById("selecionarCr");

    selectCr.innerHTML = "";


    const optionPadrao = document.createElement("option");
    optionPadrao.value = "";
    optionPadrao.textContent = "Selecione o CR";
    optionPadrao.disabled = true;
    optionPadrao.selected = true;


    selectCr.appendChild(optionPadrao);


    centroDeResultado.forEach((cr) => {
        const option = document.createElement("option");
        option.value = cr.codigoCr;
        option.textContent = cr.nome;
        selectCr.appendChild(option);
    });
}



popularSelectEmpresas(todosClientes)
popularSelectCr(todosCr);





function lancamentoHora() {
    const tipoHora = tipoHoraInput.value;
    const selecionarEmpresa = selecionarEmpresaInput.value;
    const selecionarCR = selecionarCRInput.value
    const justificativaHora = justificativaHoraInput.value;
    const dataInicio = dataInicioInput.value;
    const horaInicio = horaInicioInput.value;
    const projetoHora = projetoHoraInput.value;
    const dataFim = dataFimInput.value;
    const horaFim = horaFimInput.value;
    const solicitanteHora = solicitanteHoraInput.value;

    const dataHora = {
        codcr: selecionarCR,
        lancador: "4533",
        cnpj: selecionarEmpresa,
        data_hora_inicio: `${dataInicio}T${horaInicio}:00Z`,
        data_hora_fim: `${dataFim}T${horaFim}:00Z`,
        tipo: tipoHora,
        justificativa: justificativaHora,
        projeto: projetoHora,
        solicitante: solicitanteHora,
    };

    if (tipoHora == "sobreaviso") {
        horaSobreaviso.push(dataHora)
        console.log("Sobreaviso")
        return
    }

    console.log(dataHora);
    return dataHora;
}

async function lancamentoHoraExtra(dadosParaEnviar) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar),
    };

    try {

        const response = await fetch('http://localhost:8080/hora', requestOptions);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        console.log("enviou");

        const data = await response.json();
        console.log('Resposta da API:', data);
    } catch (error) {
        alert("Houve erro adicionar");
        console.error('Erro na requisição:', error);
    }
}

const listarHoras = async () => {
    try {
        const response = await fetch('http://localhost:8080/hora');
        if (!response.ok) {
            throw new Error('Não foi possível obter os dados.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};



const horasCadastradas = await listarHoras()



async function carregarHorasNaLista(horas) {
    const listaHoras = document.getElementById("listaHoras");
    console.log("vou resetar o ul")

    listaHoras.innerHTML = "";


    horas.forEach((hora) => {

        const razaoSocial = todosClientes.find(item => hora.cnpj === item.cnpj)?.razao_social || null;
        const centroResultado = todosCr.find(item => hora.codcr === item.codigoCr)?.nome || null;






        const li = document.createElement("li");
        const tipoHora = document.createElement("p");
        const statusHora = document.createElement("p");
        const inicioHora = document.createElement("p");
        const fimHora = document.createElement("p");
        const crHora = document.createElement("p");
        const clienteHora = document.createElement("p");
        const projetoHora = document.createElement("p");
        const justificativaHora = document.createElement("p");

        tipoHora.textContent = hora.tipo;
        statusHora.textContent = "Pendente";


        const dataHoraInicio = new Date(hora.data_hora_inicio);
        const dataInicioFormatada = dataHoraInicio.toLocaleDateString('pt-BR');
        const horaInicioFormatada = dataHoraInicio.toLocaleTimeString('pt-BR');
        inicioHora.textContent = `${dataInicioFormatada} | ${horaInicioFormatada}`;


        const dataHoraFim = new Date(hora.data_hora_fim);
        const dataFimFormatada = dataHoraFim.toLocaleDateString('pt-BR');
        const horaFimFormatada = dataHoraFim.toLocaleTimeString('pt-BR');
        fimHora.textContent = `${dataFimFormatada} | ${horaFimFormatada}`;

        crHora.textContent = centroResultado
        clienteHora.textContent = razaoSocial
        projetoHora.textContent = hora.projeto;
        justificativaHora.textContent = hora.justificativa;

        li.classList.add("horaLancada");

        li.append(tipoHora, statusHora, inicioHora, fimHora, crHora, clienteHora, projetoHora, justificativaHora);
        listaHoras.appendChild(li);
    });
}



await carregarHorasNaLista(horasCadastradas);


botaoConfirmar.addEventListener("click", async (event) => {
    event.preventDefault();

    if (
        tipoHoraInput.value === "" ||
        selecionarEmpresaInput.value === "" ||
        selecionarCRInput.value === "" ||
        justificativaHoraInput.value === "" ||
        dataInicioInput.value === "" ||
        horaInicioInput.value === "" ||
        projetoHoraInput.value === "" ||
        dataFimInput.value === "" ||
        horaFimInput.value === "" ||
        solicitanteHoraInput.value === ""
    ) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const dataHora = lancamentoHora();
    await lancamentoHoraExtra(dataHora);


    const formulario = document.getElementById("formularioHora");
    formulario.reset();


    tipoHoraInput.selectedIndex = 0;
    selecionarEmpresaInput.selectedIndex = 0;
    selecionarCRInput.selectedIndex = 0;

    const novasHoras = await listarHoras();
    carregarHorasNaLista(novasHoras);


    alert("Hora lançada com sucesso!");
});



//Função que verifica a hora inicio e a hora fim da hora extra
function definirMinDataFim() {

    const dataInicioValue = dataInicioInput.value;


    dataFimInput.min = dataInicioValue;
}


dataInicioInput.addEventListener("change", definirMinDataFim);


definirMinDataFim();








function verificarTipoHora() {
    if (tipoHoraInput.value === "sobreaviso") {
        botaoConfirmar.disabled = true;
        botaoConfirmar.classList.add("botaoDesabilitado")
        acionamentoBotao.disabled = false
        acionamentoBotao.classList.remove("botaoDesabilitado")

    } else if (tipoHoraInput.value === "hora-extra") {
        acionamentoBotao.disabled = true
        acionamentoBotao.classList.add("botaoDesabilitado")
        botaoConfirmar.disabled = false;
        botaoConfirmar.classList.remove("botaoDesabilitado")


    }
}


tipoHoraInput.addEventListener("change", verificarTipoHora);






// ABRE O MODAL
const acionamentoBotao = document.getElementById("acionamentoBotao");
acionamentoBotao.addEventListener('click', async function () {

    const modalSobreAviso = document.getElementById("modalSobreAviso");

    modalSobreAviso.style.display = 'block';




    window.addEventListener('click', function (event) {
        if (event.target === modalSobreAviso) {
            modalSobreAviso.style.display = 'none';
        }
    });



    await lancamentoHora();

    console.log(horaSobreaviso)







});

verificarTipoHora();






botaoConfirmarSobreaviso.addEventListener("click", async function (event) {
    event.preventDefault();



    const sobreaviso = horaSobreaviso[0]


    const dataInicio = dataInicioInputSobreaviso.value;
    const horaInicio = horaInicioInputSobreaviso.value;
    const dataFim = dataFimInputSobreaviso.value;
    const horaFim = horaFimInputSobreaviso.value;



    const dataHoraSobreaviso = {
        codcr: sobreaviso.codcr,
        lancador: "4533",
        cnpj: sobreaviso.cnpj,
        data_hora_inicio: `${dataInicio}T${horaInicio}:00Z`,
        data_hora_fim: `${dataFim}T${horaFim}:00Z`,
        tipo: "hora-extra",
        justificativa: sobreaviso.justificativa,
        projeto: sobreaviso.projeto,
        solicitante: sobreaviso.solicitante
    };

    horaSobreaviso.push(dataHoraSobreaviso)

    console.log(dataHoraSobreaviso)
    const listaDeHoras = document.getElementById("listaDeHoras");
    console.log(horaSobreaviso)

    const li = document.createElement("li");
    const dataHoraInicioP = document.createElement("p");
    const dataHoraFimP = document.createElement("p");


    const dataHoraInicio = new Date(dataHoraSobreaviso.data_hora_fim);
    const dataInicioFormatada = dataHoraInicio.toLocaleDateString('pt-BR');
    const horaInicioFormatada = dataHoraInicio.toLocaleTimeString('pt-BR');

    dataHoraInicioP.textContent = `${dataInicioFormatada} | ${horaInicioFormatada}`


    const dataHoraFim = new Date(dataHoraSobreaviso.data_hora_fim);
    const dataFimFormatada = dataHoraFim.toLocaleDateString('pt-BR');
    const horaFimFormatada = dataHoraFim.toLocaleTimeString('pt-BR');



    dataHoraFimP.textContent = `${dataFimFormatada} | ${horaFimFormatada}`;

    li.classList.add("horaLiSobreaviso")
    li.append(dataHoraInicioP, dataHoraFimP)

    listaDeHoras.appendChild(li);

});


botaoSalvarSobreaviso.addEventListener("click", async function (event) {
    event.preventDefault();

    horaSobreaviso.forEach(hora => {
        lancamentoHoraExtra(hora)
        alert("Lançou")
    })
    window.location.reload();


});

