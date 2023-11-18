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

const usuarioLogado = localStorage.getItem("nome");
const perfilUser = document.querySelector(".usuarioLogado");
perfilUser.textContent = usuarioLogado;
console.log(usuarioLogado)

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


const loggout = document.getElementById("loggout");
loggout.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "http://localhost:5500/index.html"
});





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


const matricula = localStorage.getItem("matricula")
console.log(matricula)
const matriculaa = Number(matricula)
console.log(matriculaa)


async function getCrListByUserId(userId) {
    const response = await fetch(`http://localhost:8080/cr/user/${userId}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const crList = await response.json();
    console.log(crList);
    return crList;
}


const todes = await getCrListByUserId(matricula);


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
popularSelectCr(todes);







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

    // Converte a data e hora de início para UTC
    const dataHoraInicioUTC = new Date(`${dataInicio}T${horaInicio}:00Z`);

    // Converte a data e hora de fim para UTC
    const dataHoraFimUTC = new Date(`${dataFim}T${horaFim}:00Z`);

    const dataHora = {
        codcr: selecionarCR,
        lancador: localStorage.getItem("matricula"),
        cnpj: selecionarEmpresa,
        data_hora_inicio: dataHoraInicioUTC.toISOString(),
        data_hora_fim: dataHoraFimUTC.toISOString(),
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

        alert("Hora Lançada com sucesso")

        const data = await response.json();
        console.log('Resposta da API:', data);
    } catch (error) {

        console.error('Erro na requisição:', error);
    }
}

const listarHoras = async () => {
    try {
        const response = await fetch('http://localhost:8080/hora' + `/${matricula}`);
        if (!response.ok) {
            throw new Error('Não foi possível obter os dados.');
        }
        const data = await response.json();
        console.log(data)
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
        const centroResultado = todes.find(item => hora.codcr === item.codigoCr)?.nome || null;






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
        statusHora.textContent = hora.status_aprovacao;


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








    const modalSobreAviso = document.getElementById("modalSobreAviso");

    modalSobreAviso.style.display = 'block';




    window.addEventListener('click', function (event) {
        if (event.target === modalSobreAviso) {
            modalSobreAviso.style.display = 'none';
        }
    });



    await lancamentoHora();






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
        lancador: localStorage.getItem("matricula"),
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



    const dataHoraInicio = new Date(dataHoraSobreaviso.data_hora_inicio);
    const dataInicioFormatada = dataHoraInicio.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    const horaInicioFormatada = dataHoraInicio.toLocaleTimeString('pt-BR', { timeZone: 'UTC' });

    const dataHoraFim = new Date(dataHoraSobreaviso.data_hora_fim);
    const dataFimFormatada = dataHoraFim.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    const horaFimFormatada = dataHoraFim.toLocaleTimeString('pt-BR', { timeZone: 'UTC' });

    const dataHoraInicioP = document.createElement("p");
    const dataHoraFimP = document.createElement("p");

    dataHoraInicioP.textContent = `${dataInicioFormatada} | ${horaInicioFormatada}`;
    dataHoraFimP.textContent = `${dataFimFormatada} | ${horaFimFormatada}`;

    li.classList.add("horaLiSobreaviso")
    li.append(dataHoraInicioP, dataHoraFimP)

    listaDeHoras.appendChild(li);

});


botaoSalvarSobreaviso.addEventListener("click", async function (event) {
    event.preventDefault();

    horaSobreaviso.forEach(hora => {
        lancamentoHoraExtra(hora)

    })
    window.location.reload();


});

