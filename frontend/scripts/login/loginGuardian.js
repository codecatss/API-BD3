import acessoPorFuncao from './roles.js';

const token = localStorage.getItem('jwt');
const roleUsuario = localStorage.getItem('role');

if (token) {
    window.location.href = acessoPorFuncao[roleUsuario][0];
}