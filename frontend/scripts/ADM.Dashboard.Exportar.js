
let horas = []

let listaVerbas = []

function popularOption(lista, paiHTML) {
    const idDoElemento = paiHTML.id;
    const nomes = ["nome", "razao_social"];
    let nome = "";
    if (idDoElemento !== "selecionarClienteRelatorio") {
        nome = nomes[0];
    } else {
        nome = nomes[1];
    }
    const valores = ["matricula", "codigoCr", "cnpj"];
    let valor = "";
    if (idDoElemento === "selecionarUsuarioRelatorio") {
        valor = valores[0];
    } else if (idDoElemento === "selecionarCrRelatorio") {
        valor = valores[1];
    } else if (idDoElemento === "selecionarClienteRelatorio") {
        valor = valores[2];
    }
    lista.forEach((item) => {
        const option = document.createElement("option");
        option.value = item[valor];
        option.textContent = item[nome];
        paiHTML.appendChild(option);
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


async function obterCrLstByUsuario(userId) {
    try {
        const response = await fetch(`http://localhost:8080/employee/${userId}/crlist`);

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


const obterTodosUsuariosDoCr = async (crId) => {
    try {
        const response = await fetch(`http://localhost:8080/cr/${crId}/employees`);

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





async function fetchVerbas(listaDeObjetos) {
    try {
        const response = await fetch('http://localhost:8080/verba/getVerbas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(listaDeObjetos),
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}

const selecionarClienteRelatorio = document.getElementById("selecionarClienteRelatorio")
const selecionarCrRelatorio = document.getElementById("selecionarCrRelatorio")
const selecionarUsuarioRelatorio = document.getElementById("selecionarUsuarioRelatorio")
const elementos = [selecionarClienteRelatorio, selecionarCrRelatorio, selecionarUsuarioRelatorio]

const todosClientes = await obterTodosClientes()
const todosCr = await obterTodosCr()
const todosUsuarios = await obterTodosUsuarios()
const listas = [todosClientes, todosCr, todosUsuarios]

const todasHoras = await todasAsHoras();
console.log(todosCr[1])

elementos.forEach(elemento => {
    popularOption(listas[elementos.indexOf(elemento)], elemento)
})

selecionarClienteRelatorio.addEventListener("change", () => {
    console.log(selecionarClienteRelatorio.value);
});

//reatividade do select de cr
selecionarCrRelatorio.addEventListener("change", async () => {
    while (selecionarUsuarioRelatorio.options.length > 1) {
        selecionarUsuarioRelatorio.remove(1);
    }
    let membros = [];
    if (selecionarCrRelatorio.value === "todosOsCr") {
        membros = await obterTodosUsuarios();
    } else {
        membros = await obterTodosUsuariosDoCr(selecionarCrRelatorio.value);
    }
    popularOption(membros, selecionarUsuarioRelatorio);
});

//reatividade do select de usuario
selecionarUsuarioRelatorio.addEventListener("change", async () => {
    let membros = [];
    if (selecionarUsuarioRelatorio.value === "todosOsUsuarios") {
        membros = await obterTodosCr();
    } else {
        try {
            membros = await obterCrLstByUsuario(selecionarUsuarioRelatorio.value);
            while (selecionarCrRelatorio.options.length > 1) {
                selecionarCrRelatorio.remove(1);
            }
        } catch (error) {
            console.error("Erro: ", error);
            console.error("Select user: ", selecionarUsuarioRelatorio.value);
            throw error;
        }
    }
    popularOption(membros, selecionarCrRelatorio);
});


const modalSobreAviso = document.getElementById("modalExportar");

window.addEventListener('click', function (event) {
    if (event.target === modalSobreAviso) {
        modalSobreAviso.style.display = 'none';
    }
});

const buttonExport = document.getElementById("buttonExport");

buttonExport.addEventListener("click", async () => {
    modalSobreAviso.style.display = 'block';


    const buttonExportarRelatorio = document.getElementById("exportarRelatorio")
    const usuarioRelatorio = document.getElementById("selecionarUsuarioRelatorio")
    const dataInicial = document.getElementById("data-inicioRelatorio")
    const dataFinal = document.getElementById("data-fimRelatorio")
    const selectCr = document.getElementById("selecionarCrRelatorio")
    const selectCliente = document.getElementById("selecionarClienteRelatorio")
    const selectTipo = document.getElementById("selecionarTipoHoraRelatorio")
    const selectStatus = document.getElementById("selecionarStatusRelatorio")

    const codigosVerba = {
        "HE75": "1601",
        "HE100": "1602",
        "HEN75": "3000",
        "HEN100": "3001",
        "ADN": "1809",
        "SOBREAVISO": "3016"
    };

    buttonExportarRelatorio.addEventListener("click", async () => {


        let horasFiltradasData = todasHoras.filter(hora => hora.data_hora_inicio >= dataInicial.value && hora.data_hora_fim <= dataFinal.value);
        console.log(horasFiltradasData)
        if (usuarioRelatorio.value !== "todosOsUsuarios") {
            horasFiltradasData = horasFiltradasData.filter(hora => hora.lancador === usuarioRelatorio.value);
            console.log(horasFiltradasData)
        }
        if (selectCr.value !== "todosOsCr") {
            horasFiltradasData = horasFiltradasData.filter(hora => hora.codcr === selectCr.value);
        }
        if (selectCliente.value !== "todosOsClientes") {
            console.log(selectCliente.value)
            horasFiltradasData = horasFiltradasData.filter(hora => hora.cnpj === selectCliente.value);
        }
        if (selectTipo.value !== "todosOsTipos") {
            horasFiltradasData = horasFiltradasData.filter(hora => hora.tipo === selectTipo.value);
        }
        if (selectStatus.value !== "todosOsStatus") {
            horasFiltradasData = horasFiltradasData.filter(hora => hora.status_aprovacao === selectStatus.value);
        }

        console.log("essa é a lista de horas filtradas", horasFiltradasData)

        horasFiltradasData.forEach(hora => {

            const idHora = {
                idHora: hora.id
            }
            horas.push(idHora)
        })


        const horasComMatricula = []
        const listaTratada = await fetchVerbas(horas)

        const novaLista = listaTratada.map((item) => {
            horasFiltradasData.forEach(hora => {
                if (hora.id === item.idHoraMae) {
                    let codVerba = item.codVerba;
                    if (item.verba === "HE75") {
                        codVerba = "1601";
                    }
                    if (item.verba === "HE100") {
                        codVerba = "1602";
                    }
                    if (item.verba === "HEN75") {
                        codVerba = "3000";
                    }
                    if (item.verba === "HEN100") {
                        codVerba = "3001";
                    }
                    if (item.verba === "ADN") {
                        codVerba = "1809";
                    }
                    if (item.verba === "SOBREAVISO") {
                        codVerba = "3016";
                    }
                    const horaTratada = {
                        idHora: item.idHoraMae,
                        verba: item.verba,
                        codVerba: codVerba,
                        duracao: item.duracao,
                        codcr: hora.codcr,
                        matricula: hora.lancador
                    }
                    horasComMatricula.push(horaTratada)
                }
            })
        })

        console.log(horasComMatricula)

        function agruparVerbas(lista) {
            const agrupado = {};

            lista.forEach((item) => {
                const chave = `${item.matricula}_${item.verba}`;

                if (!agrupado[chave]) {
                    agrupado[chave] = { ...item };
                } else {
                    agrupado[chave].duracao += item.duracao;
                }
            });

            return Object.values(agrupado);
        }

        const objetos = horasComMatricula;
        const verbasAgrupadas = agruparVerbas(objetos);
        console.log(verbasAgrupadas);


        // Criação do conteúdo CSV
        let csvContent = 'matricula;verba;codigo Verba;duracao;codigo Cr\n';
        verbasAgrupadas.forEach(item => {
            csvContent += `${item.matricula};${item.verba};${item.codVerba};${item.duracao};${item.codcr}\n`;
        });

        // Download do arquivo CSV
        const downloadLink = document.createElement('a');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.setAttribute('download', 'verbas.csv');
        downloadLink.click();


    });
});