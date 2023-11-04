import acessoPorFuncao from './roles.js';

$(document).ready(function() {
    $(".login").click(function() {
        var username = $("input[type='text']").val();
        var password = $("input[type='password']").val();
        // logIn(username, password);
        window.alert("Login efetuado!");
    });
});

function logIn(username, password) {
    $.ajax({
        url: "http://localhost:8080/auth/login",
        method: "POST",
        dataType: "json",
        data: JSON.stringify({ matricula: username, senha: password }),
        contentType: "application/json",
        success: async function(data) {
            if (data.token) {
                try {
                    const roleUsuario = await getUserRoleAndSetParams(username, data.token);
                    localStorage.setItem("jwt", data.token);
                    if (localStorage.getItem(status_usuario === "ativo")) {
                        redirectToPage(roleUsuario);
                    }
                } catch (error) {
                    console.error('Erro ao decodificar o JWT:', error);
                }
            } else {
                alert("Credenciais inválidas. Tente novamente.");
            }
        },
        error: function(error) {
            console.error("Erro ao fazer login:", error);
        }
    });
}

async function getUserRoleAndSetParams(username, token) {
    try {
        const response = await $.ajax({
            url: `http://localhost:8080/employee/${username}`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            dataType: "json"
        });
        const roleUsuario = response.funcao;
        localStorage.setItem("matricula", response.matricula);
        localStorage.setItem("nome", response.nome);
        localStorage.setItem("role", roleUsuario);
        localStorage.setItem("status_usuario", response.status_usuario);
        return roleUsuario;
    } catch (error) {
        console.error("Erro ao obter a função do usuário:", error);
        return null;
    }
}

function redirectToPage(role) {
    const allowedPages = acessoPorFuncao[role];
    if (allowedPages && allowedPages.length > 0) {
        window.location.href = allowedPages[0];
    } else {
        window.alert("Erro KKKKKK");
    }
}
