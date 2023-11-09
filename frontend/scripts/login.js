// First, obtain the input elements
import { getEmployee, identificarUsuario, redirectUser } from "./script.js";

let token = localStorage.getItem("jwt");

async function realizarLogin() {
    let inputLogin = document.querySelector('input[type="text"]');
    let inputSenha = document.querySelector('input[type="password"]');
    let data = {
        matricula: inputLogin.value,
        senha: inputSenha.value
    };

    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const jsonData = await response.json();
        localStorage.setItem("jwt", jsonData.token);
        localStorage.setItem("matricula", inputLogin.value);
        const matricula = localStorage.getItem("matricula");
        const funcionario = await identificarUsuario(matricula); // Use await here
        redirectUser()

    } catch (error) {
        console.error('Error:', error);
        alert("Erro ao fazer login!");
    }
}

let botaoLogin = document.querySelector('.login');
botaoLogin.addEventListener('click', realizarLogin);
