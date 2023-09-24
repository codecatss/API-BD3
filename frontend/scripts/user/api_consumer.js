const  API_CONFIG = {
    base_url: 'http://localhost:8080',
    employee_list: '/employee',
    create_employee: '/employee',
    get_employee: '/employee/{matricula}',
    update_employee: '/employee/{matricula}',
};

function criarNovoUsuario(usuario) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: API_CONFIG.base_url + API_CONFIG.create_employee,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(usuario),
            success: function (response) {
                console.log("Novo usuário criado com sucesso!");
                console.log(response);
                resolve(response); // Resolve a promessa com a resposta
            },
            error: function (error) {
                const ERROR = `Erro ao criar o usuário, detalhes: ${error.responseJSON.message}`;
                console.error(ERROR);
                reject(ERROR); // Rejeita a promessa com o erro
            }
        });
    });
}

function obterListaDeFuncionarios() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${API_CONFIG.base_url}${API_CONFIG.employee_list}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

function atualizarUsuario(matricula, dadosAtualizados) {
    return new Promise(function (resolve, reject) {
        // Construa a URL com a matrícula
        const url = `${API_CONFIG.base_url}${API_CONFIG.update_employee.replace('{matricula}', matricula)}`;
        console.log(url)
        $.ajax({
            url: url,
            method: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(dadosAtualizados),
            success: function (response) {
                console.log(`Usuário com matrícula ${matricula} atualizado com sucesso!`);
                console.log(response);
                resolve(response); // Resolve a promessa com a resposta
            },
            error: function (error) {
                const ERROR = `Erro ao atualizar o usuário com matrícula ${matricula}, detalhes: ${error}`;
                console.error(ERROR);
                reject(ERROR); // Rejeita a promessa com o erro
            }
        });
    });
}

export { criarNovoUsuario, obterListaDeFuncionarios, atualizarUsuario }