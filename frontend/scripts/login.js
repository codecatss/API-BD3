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
            window.location.href = "http://127.0.0.1:5500/frontend/pages/ADM.Dashboard.html"
            console.log("admin")
        } else if (data == "gestor") {
            window.location.href = "http://127.0.0.1:5500/frontend/pages/GESTOR.Dashs.html"
        } else if (data.funcao == "colaborador") {
            window.location.href = "http://127.0.0.1:5500/frontend/pages/COLABORADOR.Dashs.html"
        }
    }
}


async function direcionar(data) {
    if (data.funcao == "admin") {
        window.location.href = "http://127.0.0.1:5500/frontend/pages/ADM.Dashboard.html"

    } else if (data.funcao == "gestor") {
        window.location.href = "http://127.0.0.1:5500/frontend/pages/GESTOR.Dashs.html"
    } else if (data.funcao == "colaborador") {
        window.location.href = "http://127.0.0.1:5500/frontend/pages/COLABORADOR.Dashs.html"
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
            localStorage.setItem("jwt", JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"));
            localStorage.setItem("matricula", JSON.stringify(data.matricula));
            localStorage.setItem("nome", JSON.stringify(data.nome));
            localStorage.setItem("funcao", JSON.stringify(data.funcao));
            localStorage.setItem("status_usuario", JSON.stringify(data.status_usuario));

            direcionar(data);
        }



    });



    const login = inputLogin.value;
    const password = inputPassword.value;

}


verificaLogin()
login()


