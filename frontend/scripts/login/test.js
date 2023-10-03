var acessoPorFuncao = {
    "admin": ["ADM.Cliente.html", "ADM.CR.html", "ADM.Usuario.html", "admCadastros.html"],
    "gestor": ["clienteCadastro.html"],
    "colaborador": ["COLABORADOR.Hora.html"]
};

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
                alert("Login bem-sucedido!");
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
            var roleUsuario = response.funcao;
            alert(`Função do usuário: ${roleUsuario}`);
        },
        error: function(error) {
            console.error("Erro ao obter a função do usuário:", error);
        }
    });
}