// roles.js
const acessoPorFuncao = {
    "admin": ["ADM.Cliente.html", "ADM.CR.html", "ADM.Usuario.html", "admCadastros.html", "admAprovacao.html"],
    "gestor": ["GESTOR.AprovaHora.html", "GESTOR.LancaHora.html", "gestorApontamento.html", "clienteCadastro.html"],
    "colaborador": ["COLABORADOR.Hora.html"],
    "non": ["user.login.html"]
};

export default acessoPorFuncao;
