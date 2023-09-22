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
        <p class="${usuario.status_usuario === 'ativo' ? 'active' : 'disabled'}">
            ${usuario.status_usuario === 'ativo' ? 'Ativo' : 'Inativo'}
        </p>
        <p>${usuario.nome}</p>
        <p>${usuario.matricula}</p>
        <p>${usuario.funcao}</p>
        <div class="switch-align checkbox-size">
            <input type="checkbox" class="checkbox" id="user-${usuario.matricula}-isEnabled"
                ${usuario.status_usuario === 'ativo' ? 'checked' : ''}>
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

// Adicione um evento de clique ao botão "Confirmar" na modal de adicionar usuário
const btnConfirmarAdicionar = document.querySelector("#modal-addUser .btn-confirm");

btnConfirmarAdicionar.addEventListener("click", function () {
    // Obtenha os valores dos campos de entrada da modal de adicionar usuário
    const nomeInput = document.querySelector("#modal-addUser input[placeholder='Nome']").value;
    const matriculaInput = document.querySelector("#modal-addUser input[placeholder='Matrícula']").value;
    const funcaoInput = document.querySelector("#modal-addUser input[placeholder='Função']").value;

    // Verifique se algum dos campos está vazio
    if (nomeInput === '' || matriculaInput === '' || funcaoInput === '') {
        // Exiba uma mensagem de erro ou faça algo para informar ao usuário que todos os campos são obrigatórios
        alert("Todos os campos são obrigatórios. Preencha todos os campos.");
    } else {
        // Se todos os campos estiverem preenchidos, crie o objeto de usuário e adicione à lista
        const novoUsuario = {
            nome: nomeInput,
            matricula: matriculaInput,
            funcao: funcaoInput,
            status_usuario: "ativo"
        };

        // Chame a função para adicionar o novo usuário à lista
        adicionarUsuarioALista(novoUsuario);
    }
});


const usuario1 = {
    nome: "Usuário 1",
    matricula: "12345",
    funcao: "Administrador",
    status_usuario: "ativo"
};

const usuario2 = {
    nome: "Usuário 2",
    matricula: "23456",
    funcao: "Colaborador",
    status_usuario: "ativo"
};

const usuario3 = {
    nome: "Usuário 3",
    matricula: "34567",
    funcao: "Analista",
    status_usuario: "inativo"
};

const usuario4 = {
    nome: "Usuário 4",
    matricula: "45678",
    funcao: "Gerente",
    status_usuario: "ativo"
};

const usuario5 = {
    nome: "Usuário 5",
    matricula: "56789",
    funcao: "Supervisor",
    status_usuario: "inativo"
};

adicionarUsuarioALista(usuario1);
adicionarUsuarioALista(usuario2);
adicionarUsuarioALista(usuario3);
adicionarUsuarioALista(usuario4);
adicionarUsuarioALista(usuario5);