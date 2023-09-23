




const tipoHora = document.getElementById("selecionarTipoHora")
const selecionarEmpresa = document.getElementById("selecionarEmpresa")
const justificativaHora = document.getElementById("justificativaHora")
const dataInicio = document.getElementById("dataInicio")
const horaInicio = document.getElementById("horaInicio")
const projetoHora = document.getElementById("projetoHora")
const dataFim = document.getElementById("dataFim")
const horaFim = document.getElementById("horaFim")
const solicitanteHora = document.getElementById("solicitanteHora")
const botaoConfirmar = document.getElementById("adicionarBotao");


const imprimirValores = () => {

    console.log(horaFim.value)
    console.log(tipoHora.value)
}



botaoConfirmar.addEventListener("click", imprimirValores);
