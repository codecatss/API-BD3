// roles.js
const acessoPorFuncao = {
    "admin": ["ADM.Cliente.html", "ADM.CR.html", "ADM.Usuario.html", "admCadastros.html", "admAprovacao.html"],
    "gestor": ["GESTOR.AprovaHora.html", "GESTOR.LancaHora.html", "gestorApontamento.html", "clienteCadastro.html"],
    "colaborador": ["COLABORADOR.Hora.html"]
};

acessoPorFuncao["admin"] = [...acessoPorFuncao["admin"], ...acessoPorFuncao["gestor"], ...acessoPorFuncao["colaborador"]];
acessoPorFuncao["gestor"] = [...acessoPorFuncao["gestor"], ...acessoPorFuncao["colaborador"]];

export default acessoPorFuncao;
