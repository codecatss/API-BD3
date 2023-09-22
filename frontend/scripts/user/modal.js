document.addEventListener("DOMContentLoaded", function () {
    // Função para abrir o modal com base na classe do botão e do modal
    function openModal(buttonClass, modalId) {
        var buttons = document.querySelectorAll(buttonClass);
        var modal = document.getElementById(modalId);

        if (buttons.length > 0 && modal) {
            buttons.forEach(function (button) {
                button.onclick = function () {
                    modal.style.display = "block";
                };
            });
        }
    }

    // Função para fechar todas as modais quando clicado fora delas
    function closeModals() {
        var modals = document.querySelectorAll(".modal");
        modals.forEach(function (modal) {
            modal.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        });
    }

    // Chame a função para abrir o modal de adição
    openModal(".btn-add", "modal-addUser");

    // Chame a função para abrir os modais de edição
    openModal(".edit-align", "modal-editUser");

    // Chame a função para fechar todas as modais quando a página é carregada
    closeModals();

    // Adicione um evento de clique à classe "btn-cancel" para fechar o modal correspondente
    var btnCancel = document.querySelectorAll(".btn-cancel");
    btnCancel.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var modal = btn.closest(".modal");
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    // Adicione um evento de clique aos botões de edição para preencher o modal com os dados do usuário
    var editButtons = document.querySelectorAll(".edit-align");

    editButtons.forEach(function (editButton) {
        editButton.addEventListener("click", function () {
            // Preencha os campos do modal com os dados do usuário
            var matricula = editButton.id.split("-")[2]; // Obtém a matrícula do ID

            // Acesse o Local Storage para obter os dados do usuário com base na matrícula
            var usuariosArmazenados = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Encontre o usuário com a matrícula correspondente
            var usuarioParaEditar = usuariosArmazenados.find(function (usuario) {
                return usuario.matricula === matricula;
            });

            // Preencha os campos do modal com os dados do usuário
            if (usuarioParaEditar) {
                document.querySelector("#modal-editUser input[placeholder='Nome']").value = usuarioParaEditar.nome;
                document.querySelector("#modal-editUser input[placeholder='Matrícula']").value = usuarioParaEditar.matricula;
                document.querySelector("#modal-editUser input[placeholder='Função']").value = usuarioParaEditar.funcao;
            }
        });
    });
});
