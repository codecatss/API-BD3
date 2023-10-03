import acessoPorFuncao from './roles.js';

function checkJWTToken() {
    const token = localStorage.getItem('jwt');

    if (!token) {
        window.location.href = 'user.login.html';
    } else {
        var caminhoURL = window.location.pathname;
        var partesCaminho = caminhoURL.split('/');
        var nomeArquivo = partesCaminho[partesCaminho.length - 1];

        var funcaoUsuario = obterFuncaoDoUsuario();
        if (!acessoPorFuncao[funcaoUsuario].includes(nomeArquivo)) {
            window.location.href = acessoPorFuncao[funcaoUsuario][0];
        }
    }
}

function obterFuncaoDoUsuario() {
    const roleUsuario = localStorage.getItem('role');
    return roleUsuario || '';
}

window.addEventListener('DOMContentLoaded', checkJWTToken);