
const horas = []



function popularOption(lista, valor, paiHTML) {
    const select = document.getElementById(paiHTML);
    lista.forEach((item) => {
        const option = document.createElement("option");
        option.value = item[valor];
        option.textContent = item[valor];
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


popularOption(todosUsuarios, "nome", "selecionarUsuarioRelatorio")
popularOption(todosCr, "nome", "selecionarCrRelatorio")
popularOption(todosClientes, "razao_social", "selecionarClienteRelatorio")


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
        todasHoras.array.forEach(hora => {
            if (usuarioRelatorio == hora.lancador) {
                horas.push(hora)
            }
        });

    })




});