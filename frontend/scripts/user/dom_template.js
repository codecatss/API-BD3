// Função para salvar um usuário no Local Storage
function salvarUsuarioNoLocalStorage(usuario) {
    // Obtém a lista de usuários já existente no Local Storage (se houver)
    const usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Adiciona o novo usuário à lista
    usuariosArmazenados.push(usuario);

    // Salva a lista atualizada de usuários de volta no Local Storage
    localStorage.setItem("usuarios", JSON.stringify(usuariosArmazenados));
}

function adicionarUsuarioALista(usuario) {
    // Obtém a lista de usuários
    const listaUsuarios = document.querySelector(".users");

    // Cria um novo elemento <li> para representar o usuário
    const novoUsuario = document.createElement("li");

    // Define o ID do novo elemento com base na matrícula do usuário
    novoUsuario.id = `${usuario.matricula}`;

    novoUsuario.classList.add("user");

    // Define o conteúdo do novo elemento com base no objeto de usuário e no estado ativo
    novoUsuario.innerHTML = `
        <p class="${usuario.ativo === 'ativo' ? 'active' : 'disabled'}">
            ${usuario.ativo === 'ativo' ? 'Ativo' : 'Inativo'}
        </p>
        <p>${usuario.nome}</p>
        <p>${usuario.matricula}</p>
        <p>${usuario.funcao}</p>
        <div class="switch-align checkbox-size">
            <input type="checkbox" class="checkbox" id="user-${usuario.matricula}-isEnabled"
                ${usuario.ativo === 'ativo' ? 'checked' : ''}>
            <label class="switch" for="user-${usuario.matricula}-isEnabled">
                <span class="slider"></span>
            </label>
        </div>
        <a href="#" id="edit-user-${usuario.matricula}" class="edit-align"><img class="edit-icon" src="../assets/transparent-icons/edit.svg" alt="" srcset="" /></a>
    `;

    // Adiciona o novo usuário à lista de usuários
    listaUsuarios.appendChild(novoUsuario);
    salvarUsuarioNoLocalStorage(usuario)
}

const usuario1 = {
    nome: "Usuário 1",
    matricula: "12345",
    funcao: "Administrador",
    ativo: "ativo"
};

const usuario2 = {
    nome: "Usuário 2",
    matricula: "23456",
    funcao: "Colaborador",
    ativo: "ativo"
};

const usuario3 = {
    nome: "Usuário 3",
    matricula: "34567",
    funcao: "Analista",
    ativo: "inativo"
};

const usuario4 = {
    nome: "Usuário 4",
    matricula: "45678",
    funcao: "Gerente",
    ativo: "ativo"
};

const usuario5 = {
    nome: "Usuário 5",
    matricula: "56789",
    funcao: "Supervisor",
    ativo: "inativo"
};

adicionarUsuarioALista(usuario1);
adicionarUsuarioALista(usuario2);
adicionarUsuarioALista(usuario3);
adicionarUsuarioALista(usuario4);
adicionarUsuarioALista(usuario5);