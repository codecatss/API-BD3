// Primeiro, obtenha os elementos de entrada
let inputLogin = document.querySelector('input[type="text"]');
let inputSenha = document.querySelector('input[type="password"]');

let token = localStorage.getItem("jwt");
console.log(token);


let botaoLogin = document.querySelector('.login');
botaoLogin.addEventListener('click', function () {

    let data = {
        matricula: inputLogin.value,
        senha: inputSenha.value
    };


    fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {

            localStorage.setItem("jwt", data.token);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Erro ao fazer login!")
        });



});



function getEmployee(matricula) {
    fetch("http://localhost:8080/employee/" + matricula), {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    }
}