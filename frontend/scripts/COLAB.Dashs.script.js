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



popularSelectEmpresas(todosClientes)
popularSelectCr(todosCr);

function calcularProporcao(){
    const aprovadas = document.getElementById("label-aprovadas");
    const reprovadas = document.getElementById("label-reprovadas");
    const pendentes = document.getElementById("label-pendentes");

    const v_aprovadas = parseInt(aprovadas.textContent);
    const v_reprovadas = parseInt(reprovadas.textContent);
    const v_pendentes = parseInt(pendentes.textContent);


    console.log(v_aprovadas);
    console.log(v_reprovadas);
    console.log(v_pendentes);

    const total = v_aprovadas + v_reprovadas + v_pendentes;
    const proporcaoAprovadas = ((v_aprovadas/total) * 100).toFixed(2);
    const proporcaoReprovadas = ((v_reprovadas/total) * 100).toFixed(2);
    const proporcaoPendentes = ((v_pendentes/total) * 100).toFixed(2);

    console.log(total);
    console.log(proporcaoAprovadas);
    console.log(proporcaoReprovadas);
    console.log(proporcaoPendentes);

    const grafico = document.querySelector(".grafico-grafico");

    grafico.style.backgroundImage = `conic-gradient(#D86666 ${proporcaoReprovadas}%, #EADD6E ${proporcaoReprovadas}% ${proporcaoPendentes}%, #8DD88B ${proporcaoPendentes}% 100%)`;

}

calcularProporcao();