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


// Guarda todos os CRs em uma variável
const todosCr = await obterTodosCr()


function popularSelectEmpresas(clientes) {
    // Vai preencher o select de Cliente com cada cliente cadastrado na lista clientes
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
    // Vai preencher o select de CR com cada CR cadastrado na lista centroDeResultado
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


// Chama a função para popular o select de Cliente e passa a lista de clientes todosClientes
popularSelectEmpresas(todosClientes)
// Chama a função para popular o select de CR e passa a lista de CRs todosCr
popularSelectCr(todosCr);


const listarHoras = async () => {
    // Faz a requisição para a API e retorna as horas
    // TODO: Ver a questão dos filtros
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


// Guarda todas as horas em uma variável
const horasCadastradas = await listarHoras()


function arrumarProporcaoGrafico(horas){
    // Calcula a proporção de horas aprovadas, reprovadas e pendentes dentro de uma lista de horas e preenche o gráfico de forma correta
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
    // Preenche os paineis de status com a quantidade de horas aprovadas, reprovadas e pendentes dentro de uma lista de horas
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


preencherPainelStatus(horasCadastradas);
arrumarProporcaoGrafico(horasCadastradas);