import { criarNovoUsuario } from './api_consumer.js';

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
    const listaUsuarios = $(".users");
    const novoUsuario = $("<li>");
    novoUsuario.attr("id", usuario.matricula);
    novoUsuario.addClass("user");
    
    novoUsuario.html(`
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
    `);

    // Adiciona o novo usuário à lista de usuários
    listaUsuarios.append(novoUsuario);
    salvarUsuarioNoLocalStorage(usuario);
}

// Adicione um evento de clique ao botão "Confirmar" na modal de adicionar usuário
$("#modal-addUser .btn-confirm").click(function () {
    const nomeInput = $("#modal-addUser input[placeholder='Nome']");
    const matriculaInput = $("#modal-addUser input[placeholder='Matrícula']");
    const funcaoInput = $("#modal-addUser input[placeholder='Função']");

    if (nomeInput.val() === '' || matriculaInput.val() === '' || funcaoInput.val() === '') {
        Alert.warning('Todos os campos são obrigatórios.', 'Preencha todos os campos', { displayDuration: 3000 });
    } else {
        const novoUsuario = {
            nome: nomeInput.val(),
            matricula: matriculaInput.val(),
            funcao: funcaoInput.val(),
            senha: "padrao",
            status_usuario: "ativo"
        };

        criarNovoUsuario(novoUsuario)
            .then( (response) => {
                adicionarUsuarioALista(novoUsuario)
                Alert.success("Novo usuário criado com sucesso...", "Sucesso!", { displayDuration: 3000 });

                // Limpe os campos de entrada
                nomeInput.val('');
                matriculaInput.val('');
                funcaoInput.val('');

                // Feche o modal de adicionar usuário simulando um clique no botão "Cancelar"
                $("#modal-addUser .btn-cancel").click();
            })
            .catch(function (error) {
                // Lida com o erro
                console.error("Erro ao criar o usuário:", error);
            });
    }
});