
const horas = []



function popularOption(lista, valor, nome, paiHTML) {
    const select = document.getElementById(paiHTML);
    lista.forEach((item) => {
        const option = document.createElement("option");
        option.value = item[valor];
        option.textContent = item[nome];
        select.appendChild(option);
    });
}

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



const todasAsHoras = async () => {
    try {
        const response = await fetch('http://localhost:8080/hora');
        if (!response.ok) {
            throw new Error('Não foi possível obter os dados.');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
};

const todosClientes = await obterTodosClientes()
const todosCr = await obterTodosCr()
const todosUsuarios = await obterTodosUsuarios()
const todasHoras = await todasAsHoras();
console.log(todosCr[1])

popularOption(todosUsuarios, "matricula", "nome", "selecionarUsuarioRelatorio")
popularOption(todosCr, "codigoCr", "nome", "selecionarCrRelatorio")
popularOption(todosClientes, "cnpj", "razao_social", "selecionarClienteRelatorio")


const modalSobreAviso = document.getElementById("modalExportar");

window.addEventListener('click', function (event) {
    if (event.target === modalSobreAviso) {
        modalSobreAviso.style.display = 'none';
    }
});

const buttonExport = document.getElementById("buttonExport");

buttonExport.addEventListener("click", () => {
    modalSobreAviso.style.display = 'block';


    const buttonExportarRelatorio = document.getElementById("exportarRelatorio")
    const usuarioRelatorio = document.getElementById("selecionarUsuarioRelatorio")
    const dataInicial = document.getElementById("data-inicioRelatorio")
    const dataFinal = document.getElementById("data-fimRelatorio")
    const selectCr = document.getElementById("selecionarCrRelatorio")
    const selectCliente = document.getElementById("selecionarClienteRelatorio")
    const selectTipo = document.getElementById("selecionarTipoHoraRelatorio")
    const selectStatus = document.getElementById("selecionarStatusRelatorio")

    buttonExportarRelatorio.addEventListener("click", () => {
        console.log("olaaaaa")
        let horasFiltradasData = todasHoras.filter(hora => hora.data_hora_inicio >= dataInicial.value && hora.data_hora_fim <= dataFinal.value);
        if (usuarioRelatorio.value !== "todosOsUsuarios") {
            horasFiltradasData = horasFiltradasData.filter(hora => hora.lancador === usuarioRelatorio.value);
        }
        if (selectCr.value !== "todosOsCr") {
            horasFiltradasData = horasFiltradasData.filter(hora => hora.codcr === selectCr.value);
        }
        if (selectCliente.value !== "todosOsClientes") {
            horasFiltradasData = horasFiltradasData.filter(hora => hora.cnpj === selectCliente.value);
        }
        if (selectTipo.value !== "todosOsTipos") {
            horasFiltradasData = horasFiltradasData.filter(hora => hora.tipo === selectTipo.value);
        }
        if (selectStatus.value !== "todosOsStatus") {
            horasFiltradasData = horasFiltradasData.filter(hora => hora.status_aprovacao === selectStatus.value);
        }
        console.log(horasFiltradasData)
    });




});