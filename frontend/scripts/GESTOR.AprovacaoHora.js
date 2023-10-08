

const listarHoras = async () => {
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

const horasCadastradas = await listarHoras();



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

const todosUsuarios = await obterTodosUsuarios()
console.log(todosUsuarios)



async function carregarHorasNaLista(horas) {
    const listaHoras = document.getElementById("listaHoras");
    console.log("vou resetar o ul")

    listaHoras.innerHTML = "";


    horas.forEach((hora) => {

        const razaoSocial = todosClientes.find(item => hora.cnpj === item.cnpj)?.razao_social || null;
        const centroResultado = todosCr.find(item => hora.codcr === item.codigoCr)?.nome || null;
        const usuario = todosUsuarios.find(item => hora.lancador === item.matricula)?.nome || null;
        console.log(usuario)







        const li = document.createElement("li");
        const tipoHora = document.createElement("p");
        const statusHora = document.createElement("p");
        const inicioHora = document.createElement("p");
        const fimHora = document.createElement("p");
        const crHora = document.createElement("p");
        const clienteHora = document.createElement("p");
        const lancador = document.createElement("p");
        const justificativaHora = document.createElement("p");
        const checkbox = document.createElement("input");
        const ver = document.createElement("button");

        checkbox.type = "checkbox";

        tipoHora.textContent = hora.tipo;
        statusHora.textContent = hora.status_aprovacao;
        if (hora.status_aprovacao == "PENDENTE") {
            statusHora.classList.add("hora-pendente");
        } else if (hora.status_aprovacao == "NEGADO_GESTOR") {
            statusHora.textContent = "NEGADO";
            statusHora.classList.add("hora-negada");
        } else if (hora.status_aprovacao == "APROVADO_GESTOR") {
            statusHora.textContent = "APROVADO";
            statusHora.classList.add("hora-aprovada");
        }

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
        lancador.textContent = usuario;
        justificativaHora.textContent = hora.justificativa;
        ver.textContent = "VER";
        li.classList.add("horaLancada");
        ver.classList.add("btnver");
        li.append(checkbox, statusHora, lancador, tipoHora, inicioHora, fimHora, crHora, clienteHora, ver);
        listaHoras.appendChild(li);


        li.addEventListener("click", function () {
            const modal = document.getElementById("modalSobreAviso");
            modal.style.display = "block";
            console.log(hora.id)


            const div = document.querySelector(".modal-content")
            const p = document.createElement("p");

            p.textContent = hora.tipo;

            div.appendChild(p);


        });

        window.addEventListener('click', function (event) {
            if (event.target === modalSobreAviso) {
                modalSobreAviso.style.display = 'none';
            }
        });


    });
}




console.log(horasCadastradas)

await carregarHorasNaLista(horasCadastradas);




// Adicione um ouvinte de eventos de input ao campo de pesquisa
const inputSearch = document.querySelector(".input-search");

inputSearch.addEventListener("input", function () {
    const searchText = inputSearch.value.toLowerCase(); // Obtém o texto de pesquisa em letras minúsculas

    const horas = document.querySelectorAll(".horaLancada");

    horas.forEach(function (hora) {
        const nomeUsuario = hora.querySelector("p:nth-child(2)").textContent.toLowerCase(); // Obtém o nome do usuário em letras minúsculas
        const crHora = hora.querySelector("p:nth-child(7)").textContent.toLowerCase(); // Obtém o CR da hora em letras minúsculas
        const statusHora = hora.querySelector("p:nth-child(4)").textContent.toLowerCase();
        const cliente = hora.querySelector("p:nth-child(8)").textContent.toLowerCase(); // Obtém o status da hora em letras minúsculas


        if (
            searchText === "" ||
            nomeUsuario.includes(searchText) ||
            crHora.includes(searchText) ||
            statusHora.includes(searchText) ||
            cliente.includes(searchText)
        ) {
            hora.style.display = "grid"; // Define o estilo de layout da hora para "grid"
        } else {
            hora.style.display = "none"; // Oculta a hora se não houver correspondência
        }
    });
});
