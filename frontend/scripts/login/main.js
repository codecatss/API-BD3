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
        success: async function(data) {
            if (data.token) {
                try {
                    // const decodedToken = jwt.decode(data.token, 'my-secrey-key');
                    // console.log('JWT decodificado:', decodedToken);
                    const decoded = jsonwebtoken.decode(data.token, 'my-secrey-key');
                    console.log(decoded)
                    // localStorage.setItem("jwt", data.token);
                    // redirectToPage(roleUsuario);

                    const roleUsuario = await getUserRole(username, data.token);
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
        window.alert("Erro KKKKKK");
    }
}
