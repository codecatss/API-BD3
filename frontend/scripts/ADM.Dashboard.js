const matriculaAdminLogado = 6987;

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


popularSelectEmpresas(todosClientes)
popularSelectCr(todosCr);


const listarHoras = async (matriculaAdminLogado, CrSelecionado, ClienteSelecionado) => {
    let apiUrl = `http://localhost:8080/hora/${matriculaAdminLogado}`;
    
    if (CrSelecionado) {
        console.log(CrSelecionado);
        apiUrl += `?codCR=${CrSelecionado}`;
    }
    
    if (ClienteSelecionado) {
        console.log(ClienteSelecionado);
        apiUrl += CrSelecionado ? `&cnpj=${ClienteSelecionado}` : `?cnpj=${ClienteSelecionado}`;
    }

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


selectCr.addEventListener("change", () => {
    atualizarHoras();
});


selectCliente.addEventListener("change", () => {
    atualizarHoras();
});

async function atualizarHoras() {
    const CrSelecionado = selectCr.value;
    const ClienteSelecionado = selectCliente.value;

    const horasCadastradas = await listarHoras(matriculaAdminLogado, CrSelecionado, ClienteSelecionado);

    preencherPainelStatus(horasCadastradas);
    arrumarProporcaoGrafico(horasCadastradas);
}

atualizarHoras();