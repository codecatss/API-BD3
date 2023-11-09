let token = localStorage.getItem("jwt");
let matricula = localStorage.getItem("matricula");






export async function getEmployee(matricula) {
    fetch("http://localhost:8080/employee/" + matricula, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Erro ao buscar funcionário!")
        });

}

export async function getEmployeeByMatricula(matricula) {
    let response = await fetch("http://localhost:8080/employee/" + matricula, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    let data = await response.json();
    return data;
}

export async function checkJWTToken() {
    const token = localStorage.getItem('jwt');
    console.log(token, "token");
    if (!token) {
        window.location.href = '../pages/login.html';
        console.log("Não tem token");
    }
}

export async function identificarUsuario(matricula) {
    const token = localStorage.getItem('jwt');
    if (token) {
        const funcionario = await getEmployeeByMatricula(matricula);
        console.log(funcionario)
        localStorage.setItem("nome", funcionario.nome)
        localStorage.setItem("funcao", funcionario.funcao)
        localStorage.setItem("status", funcionario.status_usuario)
    }
}


export async function redirectUser() {
    const statusUsuario = localStorage.getItem("status");
    const funcaoUsuario = localStorage.getItem("funcao");
    if (statusUsuario == "INATIVO") {
        alert("Usuário inativo!");
        window.location.href = '../pages/login.html';
    } else {
        if (funcaoUsuario == "admin") {
            window.location.href = '../pages/ADM.Usuario.html';
        }
    }
}
