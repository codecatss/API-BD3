import acessoPorFuncao from './roles.js';
import decodeJWT from "./decodeToken.js";

function checkJWTToken() {
    const token = localStorage.getItem('jwt');
    const funcaoUsuario = obterFuncaoDoUsuario();
    if (!token && !funcaoUsuario) {
        window.location.href = 'user.login.html';
    } else {
        const username = localStorage.getItem('username');
        try {
            let decodedToken = decodeJWT(token).sub;
            console.log(`aaa
            ${token}
            ${username}
            ${decodedToken}`)
            if (decodedToken === username) {
                var caminhoURL = window.location.pathname;
                var partesCaminho = caminhoURL.split('/');
                var nomeArquivo = partesCaminho[partesCaminho.length - 1];


                if (!acessoPorFuncao[funcaoUsuario].includes(nomeArquivo)) {
                    window.location.href = acessoPorFuncao[funcaoUsuario][0];
                }
            }
        } catch (error) {
            console.error('Erro na decodificação do token JWT:', error);
            window.location.href = 'user.login.html';
        }
    }
}

function obterFuncaoDoUsuario() {
    const roleUsuario = localStorage.getItem('role');
    return roleUsuario || '';
}

window.addEventListener('DOMContentLoaded', checkJWTToken);