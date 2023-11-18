const matriculaUsuarioLogado = localStorage.getItem("matricula");


const usuarioLogado = localStorage.getItem("nome");
const perfilUser = document.querySelector(".usuarioLogado");
perfilUser.textContent = usuarioLogado;
console.log(usuarioLogado)
const loggout = document.getElementById("loggout");
loggout.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "http://localhost:5500/index.html"

});



const obterTodosClientes = async () => {
    // Faz a requisição para a API e retorna os clientes
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


// Guarda todos os clientes em uma variável
const todosClientes = await obterTodosClientes()


const obterTodosCr = async () => {
    // Faz a requisição para a API e retorna os CRs
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

const obterCrDoUsuario = async (matriculaUsuarioLogado) => {
    // Faz a requisição para a API e retorna os CRs
    try {
        const response = await fetch(`http://localhost:8080/cr/user/${matriculaUsuarioLogado}`);

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



// Guarda todos os CRs em uma variável
const todosCr = await obterTodosCr()
const CrListDoUsuario = await obterCrDoUsuario(matriculaUsuarioLogado)


function popularSelectEmpresas(clientes) {
    // Vai preencher o select de Cliente com cada cliente cadastrado na lista clientes
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
    // Vai preencher o select de CR com cada CR cadastrado na lista centroDeResultado
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


// Chama a função para popular o select de Cliente e passa a lista de clientes todosClientes
popularSelectEmpresas(todosClientes)
// Chama a função para popular o select de CR e passa a lista de CRs todosCr
popularSelectCr(CrListDoUsuario);


const listarHoras = async (matriculaUsuarioLogado, CrSelecionado, ClienteSelecionado) => {
    // Faz a requisição para a API e retorna as horas
    // TODO: Ver a questão dos filtros
    let apiUrl = `http://localhost:8080/hora/${matriculaUsuarioLogado}`;

    // Adicionar os parâmetros do CR e Cliente se eles estiverem definidos
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

const listarHorasCr = async () => {
    // Faz a requisição para a API e retorna as horas
    // TODO: Ver a questão dos filtros
    let apiUrl = `http://localhost:8080/hora/todas`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const data = [];
            return data;
        }
        const data = await response.json();
        // alert(data.length);
        return data;
    } catch (error) {
        throw error;
    }

};


// Guarda todas as horas em uma variável
const horasCadastradas = await listarHoras(matriculaUsuarioLogado);


function seedGraficoUsuario(horas) {
    // Calcula a proporção de horas aprovadas, reprovadas e pendentes dentro de uma lista de horas e preenche o gráfico de forma correta
    const horasAprovadas = horas.filter(hora => hora.status_aprovacao == "APROVADO_ADMIN");
    const horasReprovadas = horas.filter(hora => hora.status_aprovacao == "NEGADO_ADMIN" || hora.status_aprovacao == "NEGADO_GESTOR");
    const horasPendentes = horas.filter(hora => hora.status_aprovacao == "PENDENTE" || hora.status_aprovacao == "APROVADO_GESTOR");

    const total = horasAprovadas.length + horasReprovadas.length + horasPendentes.length;
    const proporcaoReprovadas = ((horasReprovadas.length / total) * 100).toFixed(2);
    const proporcaoPendentes = ((horasPendentes.length / total) * 100).toFixed(2);

    const p1 = parseFloat(proporcaoReprovadas);
    const p2 = parseFloat(proporcaoReprovadas) + parseFloat(proporcaoPendentes);

    const grafico = document.querySelector(".grafico-grafico");


    grafico.style.backgroundImage = `conic-gradient(#D86666 0% ${p1}%, #EADD6E ${p1}% ${p2}%, #8DD88B ${p2}% 100%)`;

}

function seedGraficoCr(horas) {
    // Calcula a proporção de horas aprovadas, reprovadas e pendentes dentro de uma lista de horas e preenche o gráfico de forma correta
    const horasAprovadas = horas.filter(hora => hora.status_aprovacao == "APROVADO_ADMIN" || hora.status_aprovacao == "APROVADO_GESTOR");
    const horasReprovadas = horas.filter(hora => hora.status_aprovacao == "NEGADO_ADMIN" || hora.status_aprovacao == "NEGADO_GESTOR");
    const horasPendentes = horas.filter(hora => hora.status_aprovacao == "PENDENTE" || hora.status_aprovacao == "APROVADO_GESTOR");

    const total = horasAprovadas.length + horasReprovadas.length + horasPendentes.length;
    const proporcaoReprovadas = ((horasReprovadas.length / total) * 100).toFixed(2);
    const proporcaoPendentes = ((horasPendentes.length / total) * 100).toFixed(2);

    const p1 = parseFloat(proporcaoReprovadas);
    const p2 = parseFloat(proporcaoReprovadas) + parseFloat(proporcaoPendentes);

    const grafico = document.getElementById("graficoCr");


    grafico.style.backgroundImage = `conic-gradient(#D86666 0% ${p1}%, #EADD6E ${p1}% ${p2}%, #8DD88B ${p2}% 100%)`;

}


function preencherTabUsuario(horas) {
    // Preenche os paineis de status com a quantidade de horas aprovadas, reprovadas e pendentes dentro de uma lista de horas
    const aprovadas = document.getElementById("label-aprovadas");
    const reprovadas = document.getElementById("label-reprovadas");
    const pendentes = document.getElementById("label-pendentes");

    horas = horas.filter(hora => hora.lancador == matriculaUsuarioLogado);

    const horasAprovadas = horas.filter(hora => hora.status_aprovacao == "APROVADO_ADMIN");
    const horasReprovadas = horas.filter(hora => hora.status_aprovacao == "NEGADO_ADMIN" || hora.status_aprovacao == "NEGADO_GESTOR");
    const horasPendentes = horas.filter(hora => hora.status_aprovacao == "PENDENTE");

    aprovadas.textContent = horasAprovadas.length;
    reprovadas.textContent = horasReprovadas.length;
    pendentes.textContent = horasPendentes.length;
}

function preencherTabCr(horas) {
    // Preenche os paineis de status com a quantidade de horas aprovadas, reprovadas e pendentes dentro de uma lista de horas
    const aprovadas = document.getElementById("label-aprovadasCr");
    const reprovadas = document.getElementById("label-reprovadasCr");
    const pendentes = document.getElementById("label-pendentesCr");

    const horasAprovadas = horas.filter(hora => hora.status_aprovacao == "APROVADO_ADMIN");
    const horasReprovadas = horas.filter(hora => hora.status_aprovacao == "NEGADO_ADMIN" || hora.status_aprovacao == "NEGADO_GESTOR");
    const horasPendentes = horas.filter(hora => hora.status_aprovacao == "PENDENTE");

    aprovadas.textContent = horasAprovadas.length;
    reprovadas.textContent = horasReprovadas.length;
    pendentes.textContent = horasPendentes.length;
}


const selectCr = document.getElementById("selecionarCr");
const selectCliente = document.getElementById("selecionarEmpresa");


selectCr.addEventListener("change", () => {
    // Função para atualizar horas quando o CR é alterado
    console.log(selectCr.value);
    atualizarHoras();
    atualizarHorasCr();

});


selectCliente.addEventListener("change", () => {
    // Função para atualizar horas quando o Cliente é alterado
    atualizarHoras();
    atualizarHorasCr();
});

async function atualizarHoras() {
    // Função para atualizar horas com os valores selecionados
    const CrSelecionado = selectCr.value;
    const ClienteSelecionado = selectCliente.value;

    const horasCadastradas = await listarHoras(matriculaUsuarioLogado, CrSelecionado, ClienteSelecionado);

    preencherTabUsuario(horasCadastradas);
    seedGraficoUsuario(horasCadastradas);
}

async function atualizarHorasCr() {

    const horasCadastradas = await listarHorasCr();
    if (selectCr.value == "" && selectCliente.value == "") {
        preencherTabCr(horasCadastradas);
        seedGraficoCr(horasCadastradas);
    }
    else {
        console.log("Mudou");
        const filtoCr = horasCadastradas.filter(horasCadastradas => horasCadastradas.codcr == selectCr.value);
        if (selectCliente.value == "") {
            preencherTabCr(filtoCr);
            seedGraficoCr(filtoCr);
        }
        else {
            const filtoCliente = filtoCr.filter(filtoCr => filtoCr.cnpj == selectCliente.value);
            preencherTabCr(filtoCliente);
            seedGraficoCr(filtoCliente);
        }
    }

}

// Chama a função atualizarHoras inicialmente para carregar os dados com os valores iniciais
atualizarHoras();
inverteValor();

let estadoMinhasHoras = true;
let estadoMinhasEquipes = false;

const dashEquipes = document.getElementById("minhasEquipes");
const meuDash = document.getElementById("meuDash");

function inverteValor() {
    const minhashoras = document.getElementById("minhas-horas");

    const minhasequipes = document.getElementById("minhas-equipes");

    minhashoras.addEventListener('click', function () {
        abrirTab();
        minhasequipes.style.backgroundColor = "#332f3d";
        minhashoras.style.backgroundColor = "#544D66";
        estadoMinhasHoras = true;
        estadoMinhasEquipes = false;
        atualizarHoras();
        abrirTab();
    });

    minhasequipes.addEventListener('click', function () {
        abrirTab();
        minhashoras.style.backgroundColor = "#332f3d";
        minhasequipes.style.backgroundColor = "#544D66";
        estadoMinhasHoras = false;
        estadoMinhasEquipes = true;
        atualizarHorasCr();
        abrirTab();

    });
}

function abrirTab() {
    if (estadoMinhasHoras) {
        meuDash.style.display = "block";
        dashEquipes.style.display = "none";
    }
    if (estadoMinhasEquipes) {
        dashEquipes.style.display = "block";
        meuDash.style.display = "none";
    }
}
