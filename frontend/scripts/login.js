const inputLogin = document.getElementById("inputLogin");
const inputPassword = document.getElementById("inputPassword");
const buttonLogin = document.getElementById("buttonLogin");




async function getEmployee(matricula) {
    return fetch("http://localhost:8080/employee/" + matricula, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Erro ao buscar funcionário!")
        });
}


async function verificaLogin() {
    const token = localStorage.getItem("jwt");
    const data = JSON.parse(localStorage.getItem("funcao"));
    console.log("token existe")
    if (token) {
        if (data == "admin") {
            window.location.href = "../frontend/pages/ADM.Dash.html"
            console.log("admin")
        } else if (data == "gestor") {
            window.location.href = "../frontend/pages/GESTOR.Dash.html"
        } else if (data.funcao == "colaborador") {
            window.location.href = "../frontend/pages/COLABORADOR.Dash.html"
        }
    }
}


async function direcionar(data) {
    if (data.funcao == "admin") {
        window.location.href = "../frontend/pages/ADM.Dash.html"

    } else if (data.funcao == "gestor") {
        window.location.href = "../frontend/pages/GESTOR.Dash.html"
    } else if (data.funcao == "colaborador") {
        window.location.href = "../frontend/pages/COLABORADOR.Dash.html"
    }
}

async function login() {

    buttonLogin.addEventListener("click", async function () {

        const data = await getEmployee(inputLogin.value);
        console.log(data)
        if (data.status_usuario == "inativo") {
            alert("Usuário desativado, por favor entre em contato com o administrador")
            return
        } else {
            localStorage.setItem("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
            localStorage.setItem("matricula", data.matricula);
            localStorage.setItem("nome", data.nome);
            localStorage.setItem("funcao", data.funcao);
            localStorage.setItem("status_usuario", data.status_usuario);

            direcionar(data);
        }



    });



    const login = inputLogin.value;
    const password = inputPassword.value;

}


verificaLogin()
login()


