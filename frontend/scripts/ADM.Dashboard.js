const matriculaAdminLogado = 700833;
let tipoChanged = false;
let statusChanged = false;

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

const obterTodosTipos = async (data) => {
    const tipos = data.map(hora => hora.tipo);
    const tiposUnicos = [...new Set(tipos)];

    return tiposUnicos
};

// const todosTipos = await obterTodosTipos()

const obterTodosStatus = async (data) => {
    const status_aprovacao = data.map(hora => hora.status_aprovacao);
    const statusAprovacaoUnicos = [...new Set(status_aprovacao)];

    return statusAprovacaoUnicos;
};

// const todosStatus = await obterTodosStatus()

function popularSelectEmpresas(clientes) {
    const selectEmpresa = document.getElementById("selecionarEmpresa");

    selectEmpresa.innerHTML = "";


    const optionPadrao = document.createElement("option");
    optionPadrao.value = "";
    optionPadrao.textContent = "Todos os Clientes";
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
    optionPadrao.textContent = "Todos os CRs";
    optionPadrao.selected = true;


    selectCr.appendChild(optionPadrao);


    centroDeResultado.forEach((cr) => {
        const option = document.createElement("option");
        option.value = cr.codigoCr;
        option.textContent = cr.nome;
        selectCr.appendChild(option);
    });
}


function popularSelectTipos(tipos) {
    const selectTipo = document.getElementById("selecionarTipo");

    selectTipo.innerHTML = "";

    const optionPadrao = document.createElement("option");
    optionPadrao.value = "";
    optionPadrao.textContent = "Todos os Tipos";
    optionPadrao.selected = true;


    selectTipo.appendChild(optionPadrao);


    tipos.forEach((tipo) => {
        const option = document.createElement("option");
        option.value = tipo;
        option.textContent = tipo;
        selectTipo.appendChild(option);
    });
}

function popularSelectStatus(status) {
    const selecionarStatus = document.getElementById("selecionarStatus");

    selecionarStatus.innerHTML = "";

    const optionPadrao = document.createElement("option");
    optionPadrao.value = "";
    optionPadrao.textContent = "Todos os Status";
    optionPadrao.selected = true;


    selecionarStatus.appendChild(optionPadrao);


    status.forEach((stat) => {
        const option = document.createElement("option");
        option.value = stat;
        option.textContent = stat;
        selecionarStatus.appendChild(option);
    });
}

popularSelectEmpresas(todosClientes)
popularSelectCr(todosCr);
// popularSelectTipos(todosTipos);
// popularSelectStatus(todosStatus);

const listarHoras = async (matriculaAdminLogado, CrSelecionado, ClienteSelecionado, TipoSelecionado, StatusSelecionado) => {
    let apiUrl = `http://localhost:8080/hora/admin/${matriculaAdminLogado}`;
    
    if (CrSelecionado) {
        console.log(CrSelecionado);
        apiUrl += `?codCR=${CrSelecionado}`;
    }
    
    if (ClienteSelecionado) {
        console.log(ClienteSelecionado);
        apiUrl += CrSelecionado ? `&cnpj=${ClienteSelecionado}` : `?cnpj=${ClienteSelecionado}`;
    }

    if (TipoSelecionado) {
        console.log(TipoSelecionado);
        apiUrl += CrSelecionado ? `&tipo=${TipoSelecionado}` : `?tipo=${TipoSelecionado}`;
    }
    
    if (StatusSelecionado) {
        console.log(StatusSelecionado);
        apiUrl += CrSelecionado ? `&status_aprovacao=${StatusSelecionado}` : `?status_aprovacao=${StatusSelecionado}`;
    }

    console.log(apiUrl);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const data = [];
            return data;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
    
};


const horasCadastradas = await listarHoras(matriculaAdminLogado)


function arrumarProporcaoGrafico(horas){
    const horasAprovadas = horas.filter(hora => hora.status_aprovacao == "APROVADO_ADMIN");
    const horasReprovadas = horas.filter(hora => hora.status_aprovacao == "NEGADO_ADMIN" || hora.status_aprovacao == "NEGADO_GESTOR");
    const horasPendentes = horas.filter(hora => hora.status_aprovacao == "PENDENTE" || hora.status_aprovacao == "APROVADO_GESTOR");

    const total = horasAprovadas.length + horasReprovadas.length + horasPendentes.length;
    const proporcaoReprovadas = ((horasReprovadas.length/total) * 100).toFixed(2);
    const proporcaoPendentes = ((horasPendentes.length/total) * 100).toFixed(2);

    const p1 = parseFloat(proporcaoReprovadas);
    const p2 = parseFloat(proporcaoReprovadas) + parseFloat(proporcaoPendentes);

    const grafico = document.querySelector(".grafico-grafico");

    grafico.style.backgroundImage = `conic-gradient(#D86666 ${p1}%, #EADD6E ${p1}% ${p2}%, #8DD88B ${p2}% 100%)`;

}


function preencherPainelStatus(horas){
    const aprovadas = document.getElementById("label-aprovadas");
    const reprovadas = document.getElementById("label-reprovadas");
    const pendentes = document.getElementById("label-pendentes");

    const horasAprovadas = horas.filter(hora => hora.status_aprovacao == "APROVADO_ADMIN");
    const horasReprovadas = horas.filter(hora => hora.status_aprovacao == "NEGADO_ADMIN" || hora.status_aprovacao == "NEGADO_GESTOR");
    const horasPendentes = horas.filter(hora => hora.status_aprovacao == "PENDENTE" || hora.status_aprovacao == "APROVADO_GESTOR");

    aprovadas.textContent = horasAprovadas.length;
    reprovadas.textContent = horasReprovadas.length;
    pendentes.textContent = horasPendentes.length;
}


const selectCr = document.getElementById("selecionarCr");
const selectCliente = document.getElementById("selecionarEmpresa");
const selectTipo = document.getElementById("selecionarTipo");
const selectStatus = document.getElementById("selecionarStatus");


selectCr.addEventListener("change", () => {
    tipoChanged = true;
    statusChanged = true;
    atualizarHoras(true);
});


selectCliente.addEventListener("change", () => {
    tipoChanged = true;
    statusChanged = true;
    atualizarHoras(true);
});

selectTipo.addEventListener("change", () => {
    atualizarHoras(false);
});

selectStatus.addEventListener("change", () => {
    atualizarHoras(false);
});

async function atualizarHoras(funcaoAdicional = false) {
    const CrSelecionado = selectCr.value;
    const ClienteSelecionado = selectCliente.value;
    const TipoSelecionado = selectTipo.value;
    const StatusSelecionado = selectStatus.value;

    const horasCadastradas = await listarHoras(matriculaAdminLogado, CrSelecionado, ClienteSelecionado, TipoSelecionado, StatusSelecionado);

    const tipos = await obterTodosTipos(horasCadastradas);
    const status = await obterTodosStatus(horasCadastradas);
    if (funcaoAdicional) {
        popularSelectStatus(status);
        popularSelectTipos(tipos);
    }

    preencherPainelStatus(horasCadastradas);
    arrumarProporcaoGrafico(horasCadastradas);
}



atualizarHoras(true);