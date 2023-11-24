import { criarNovoUsuario, obterListaDeFuncionarios, atualizarUsuario } from './api_consumer.js';

const matriculaUsuarioLogado = localStorage.getItem("matricula");


const usuarioLogado = localStorage.getItem("nome");
const perfilUser = document.querySelector(".usuarioLogado");
perfilUser.textContent = usuarioLogado;
console.log(usuarioLogado)
const loggout = document.getElementById("loggout");
loggout.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../../index.html"

});

function salvarUsuarioNoLocalStorage(usuario) {
    const usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios")) || [];

    const indiceUsuario = usuariosArmazenados.findIndex(function (u) {
        return u.matricula === usuario.matricula;
    });

    if (indiceUsuario !== -1) usuariosArmazenados[indiceUsuario] = usuario;
    else usuariosArmazenados.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuariosArmazenados));
}


function editarUsuarioNoLocalStorage(matricula, novosDados) {
    const usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const indiceUsuario = usuariosArmazenados.findIndex(function (usuario) {
        return usuario.matricula === matricula;
    });

    if (indiceUsuario !== -1) {
        const usuarioAtualizado = {
            ...usuariosArmazenados[indiceUsuario],
            ...novosDados
        };
        usuariosArmazenados[indiceUsuario] = usuarioAtualizado;
        localStorage.setItem("usuarios", JSON.stringify(usuariosArmazenados));
        return true;
    } else {
        return false;
    }
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

    // Get the selected 'funcao' value from the <select> element
    const funcaoSelect = $("#funcaoFuncionario");
    const funcao = funcaoSelect.val();

    if (nomeInput.val() === '' || matriculaInput.val() === '' || funcao === '') {
        Alert.warning('Todos os campos são obrigatórios.', 'Preencha todos os campos', { displayDuration: 3000 });
    } else {
        const novoUsuario = {
            nome: nomeInput.val(),
            matricula: matriculaInput.val(),
            funcao: funcao, // Use the selected 'funcao' value
            senha: "senha123",
            status_usuario: "ativo"
        };

        criarNovoUsuario(novoUsuario)
            .then((response) => {
                adicionarUsuarioALista(novoUsuario)
                Alert.success("Novo usuário criado com sucesso...", "Sucesso!", { displayDuration: 5000 });

                // Limpe os campos de entrada
                nomeInput.val('');
                matriculaInput.val('');

                // Feche o modal de adicionar usuário simulando um clique no botão "Cancelar"
                $("#modal-addUser .btn-cancel").click();
            })
            .catch(function (error) {
                // Lida com o erro
                Alert.error(`Erro ao criar o usuário\nDetalhes: ${error}`, "Erro...", { displayDuration: 10000 });
                console.error("Erro ao criar o usuário:", error);
            });
    }
});


$(document).on("click", ".edit-align, .edit-icon", function () {
    var editButton = $(this).closest(".edit-align");
    console.log(editButton);

    // Preencha os campos do modal com os dados do usuário
    var matricula = editButton.attr("id").split("-")[2];
    console.log(matricula);

    // Acesse o Local Storage para obter os dados do usuário com base na matrícula
    var usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Encontre o usuário com a matrícula correspondente
    var usuarioParaEditar = usuariosArmazenados.find(function (usuario) {
        return usuario.matricula === matricula;
    });

    // Preencha os campos do modal com os dados do usuário
    if (usuarioParaEditar) {
        $("#modal-editUser input[placeholder='Nome']").val(usuarioParaEditar.nome);
        $("#modal-editUser input[placeholder='Matrícula']").val(usuarioParaEditar.matricula);
        $("#modal-editUser input[placeholder='Matrícula']").prop("disabled", true);
        $("#modal-editUser input[placeholder='Função']").val(usuarioParaEditar.funcao);

        $("#funcaoFuncionarioEditar").val(usuarioParaEditar.funcao);

        // Abra o modal de edição
        var modalEditUser = document.getElementById("modal-editUser");
        if (modalEditUser) {
            modalEditUser.style.display = "block"

        }
    }
});
// Adicione um evento de clique ao botão "Confirmar" no modal de edição de usuário
$("#modal-editUser .btn-confirm").click(function () {
    const matriculaInput = $("#modal-editUser input[placeholder='Matrícula']");
    const nomeInput = $("#modal-editUser input[placeholder='Nome']");

    // Get the selected 'funcao' value from the <select> element
    const funcaoSelect = $("#funcaoFuncionarioEditar");
    const novaFuncao = funcaoSelect.val();

    // Obtém a matrícula do usuário a partir do campo de entrada (caso você precise dela)
    const matricula = matriculaInput.val();

    // Obtém o novo valor de nome do campo de entrada
    const novoNome = nomeInput.val();

    // Crie um objeto com os dados atualizados
    const dadosAtualizados = {
        nome: novoNome,
        funcao: novaFuncao // Use the selected 'funcao' value
    };

    // Chama a função atualizarUsuario para atualizar o usuário
    atualizarUsuario(matricula, dadosAtualizados)
        .then(function (response) {
            editarUsuarioNoLocalStorage(matricula, dadosAtualizados);
            console.log(`Usuário com matrícula ${matricula} atualizado com sucesso.`);
            Alert.success(`Usuário com matrícula ${matricula} atualizado com sucesso.`, "Sucesso!", { displayDuration: 5000 });

            // Feche o modal de edição após a conclusão da atualização
            //$("#modal-editUser").css("display", "none");
            setTimeout(function () {
                window.location.reload();

            }, 1000);
        })
        .catch(function (error) {
            console.error(`Erro ao atualizar o usuário com matrícula ${matricula}:`, error);
            Alert.error(`Erro ao atualizar o usuário com matrícula ${matricula}, detalhes: ${error}`, "Erro!", { displayDuration: 5000 });

        });
});


$(document).on('click', 'input[type="checkbox"].checkbox', function () {
    const isChecked = $(this).prop('checked');
    console.log(`Checkbox marcado: ${isChecked}`);

    const checkboxId = $(this).attr("id");
    const matricula = checkboxId.replace("user-", "").replace("-isEnabled", "");
    console.log("Matrícula do usuário clicado:", matricula);

    // Determinar o status do usuário com base no estado da checkbox
    const statusUsuario = isChecked ? 'ativo' : 'inativo';

    // Criar um objeto com os dados atualizados
    const dadosAtualizados = {
        status_usuario: statusUsuario
    };

    // Chamar a função atualizarUsuario para atualizar o usuário
    atualizarUsuario(matricula, dadosAtualizados)
        .then(function (response) {
            editarUsuarioNoLocalStorage(matricula, dadosAtualizados);
            console.log(`Usuário com matrícula ${matricula} atualizado com sucesso.\n\nNovo status: ${statusUsuario}`);
            Alert.success(`Usuário com matrícula ${matricula} atualizado com sucesso.\n\nNovo status: ${statusUsuario}`, "Sucesso!", { displayDuration: 5000 });

            // Encontre o elemento <li> com o id correspondente à matrícula
            const userListItem = $(`li#${matricula}`);

            // Atualize a classe do primeiro <p> com base no estado do switch
            const primeiroParagrafo = userListItem.find("p:first");
            if (statusUsuario === 'ativo') {
                primeiroParagrafo.removeClass('disabled').addClass('active');
                primeiroParagrafo.text("Ativo");
            } else {
                primeiroParagrafo.removeClass('active').addClass('disabled');
                primeiroParagrafo.text("Inativo");
            }
        })
        .catch(function (error) {
            console.error(`Erro ao atualizar o usuário com matrícula ${matricula}:`, error);
            Alert.error(`Erro ao atualizar o usuário com matrícula ${matricula}, detalhes: ${error}`, "Erro!", { displayDuration: 5000 });
        });
});

// Função para carregar a lista de funcionários ao carregar a página
$(document).ready(function () {
    obterListaDeFuncionarios()
        .then(function (funcionarios) {
            // Ordena a lista de funcionários alfabeticamente por nome e coloca os inativos por último
            funcionarios.sort(function (a, b) {
                if (a.status_usuario === 'ativo' && b.status_usuario === 'inativo') {
                    return -1; // a vem antes de b
                } else if (a.status_usuario === 'inativo' && b.status_usuario === 'ativo') {
                    return 1; // b vem antes de a
                } else {
                    // Ambos são ativos ou inativos, ordenar alfabeticamente por nome
                    return a.nome.localeCompare(b.nome);
                }
            });

            // Iterar sobre a lista de funcionários ordenada e adicionar cada um à lista de usuários
            funcionarios.forEach(function (funcionario) {
                adicionarUsuarioALista(funcionario);
            });
        })
        .catch(function (error) {
            // Lida com o erro ao carregar a lista de funcionários
            console.error("Erro ao carregar a lista de funcionários:", error);
        });
});