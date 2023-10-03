import acessoPorFuncao from './roles.js';

$(document).ready(function() {
    $(".login").click(function() {
        var username = $("input[type='text']").val();
        var password = $("input[type='password']").val();
        logIn(username, password);
    });
});

function logIn(username, password) {
    $.ajax({
        url: "http://localhost:8080/auth/login",
        method: "POST",
        dataType: "json",
        data: JSON.stringify({ matricula: username, senha: password }),
        contentType: "application/json",
        success: function(data) {
            if (data.token) {
                localStorage.setItem("jwt", data.token);
                getUserRole(username, data.token);
                // alert("Login bem-sucedido!");
            } else {
                alert("Credenciais inválidas. Tente novamente.");
            }
        },
        error: function(error) {
            console.error("Erro ao fazer login:", error);
        }
    });
}

function getUserRole(username, token) {
    $.ajax({
        url: `http://localhost:8080/employee/${username}`,
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        dataType: "json",
        success: function(response) {
            let roleUsuario = response.funcao;
            localStorage.setItem("role", roleUsuario)
            // alert(`Função do usuário: ${roleUsuario}`);
            redirectToPage(roleUsuario);
        },
        error: function(error) {
            console.error("Erro ao obter a função do usuário:", error);
        }
    });
}

function redirectToPage(role) {
    const allowedPages = acessoPorFuncao[role];

    if (allowedPages && allowedPages.length > 0) {
        window.location.href = allowedPages[0];
    } else {
        window.alert("Erro KKKKKK");
    }
}