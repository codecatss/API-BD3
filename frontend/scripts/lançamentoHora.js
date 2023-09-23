const tipoHoraInput = document.getElementById("selecionarTipoHora");
const selecionarEmpresaInput = document.getElementById("selecionarEmpresa");
const justificativaHoraInput = document.getElementById("justificativaHora");
const dataInicioInput = document.getElementById("dataInicio");
const horaInicioInput = document.getElementById("horaInicio");
const projetoHoraInput = document.getElementById("projetoHora");
const dataFimInput = document.getElementById("dataFim");
const horaFimInput = document.getElementById("horaFim");
const solicitanteHoraInput = document.getElementById("solicitanteHora");
const botaoConfirmar = document.getElementById("adicionarBotao");

botaoConfirmar.addEventListener("click", () => {
    const dataHora = lancamentoHora();
    fazerRequisicaoPOST(dataHora);
});

function lancamentoHora() {
    const tipoHora = tipoHoraInput.value;
    const selecionarEmpresa = selecionarEmpresaInput.value;
    const justificativaHora = justificativaHoraInput.value;
    const dataInicio = dataInicioInput.value;
    const horaInicio = horaInicioInput.value;
    const projetoHora = projetoHoraInput.value;
    const dataFim = dataFimInput.value;
    const horaFim = horaFimInput.value;
    const solicitanteHora = solicitanteHoraInput.value;

    const dataHora = {
        codcr: "1234",
        lancador: "4533",
        cnpj: "91931931",
        data_hora_inicio: `${dataInicio}T${horaInicio}:00Z`,
        data_hora_fim: `${dataFim}T${horaFim}:00Z`,
        tipo: tipoHora,
        justificativa: justificativaHora,
        projeto: projetoHora,
        solicitante: solicitanteHora,
    };

    console.log(dataHora);
    return dataHora;
}

async function fazerRequisicaoPOST(dadosParaEnviar) {

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

        console.error('Erro na requisição:', error);
    }
}
