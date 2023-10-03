$(document).ready(function() {
    $(".login").click(function() {
        console.log("kk")
        var username = $("input[type='text']").val();
        var password = $("input[type='password']").val();
        console.log(username, password)

        $.ajax({
            url: "http://localhost:8080/auth/login",
            method: "POST",
            dataType: "json",
            data: JSON.stringify({ matricula: username, senha: password }),
            contentType: "application/json",
            success: function(data) {
                if (data.token) {
                    localStorage.setItem("jwt", data.token);
                    alert("Login bem-sucedido!");
                } else {
                    alert("Credenciais inválidas. Tente novamente.");
                }
            },
            error: function(error) {
                console.error("Erro ao fazer login:", error);
            }
        });
    });
});
