import acessoPorFuncao from './roles.js';
import decodeJWT from "./decodeToken.js";

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
        success: async function(data) {
            if (data.token) {
                const tokenMatricula = decodeJWT(data.token).sub;
                console.log(username)
                if (tokenMatricula === username) {
                    try {
                        const roleUsuario = await getUserRole(username, data.token);
                        localStorage.setItem("jwt", data.token);
                        localStorage.setItem("username", username);
                        redirectToPage(roleUsuario);
                    } catch (error) {
                        console.error('Erro ao decodificar o JWT:', error);
                    }
                } else {
                    alert("A matrícula no token não corresponde à matrícula desejada.");
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

async function getUserRole(username, token) {
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
        localStorage.setItem("role", roleUsuario);
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
        console.log(role);
        window.alert("Erro KKKKKK");
    }
}
