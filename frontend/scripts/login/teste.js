$(document).ready(function() {
    $(".login").click(function() {

        var username = $("input[type='text']").val();
        var password = $("input[type='password']").val();

        $.ajax({
            url: "http://localhost:8080/auth/login",
            method: "POST",
            dataType: "json",
            data: JSON.stringify({ username: username, password: password }),
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
