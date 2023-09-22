function removerAcentos(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

// Adicione um ouvinte de eventos de input ao campo de pesquisa
const inputSearch = document.querySelector(".input-search");

inputSearch.addEventListener("input", function () {
    const searchText = removerAcentos(inputSearch.value.toLowerCase()); // Remove acentos e obtém o texto de pesquisa em letras minúsculas

    const users = document.querySelectorAll(".user");

    users.forEach(function (user) {
        const userText = removerAcentos(user.textContent.toLowerCase()); // Remove acentos e obtém o texto do usuário em letras minúsculas

        if (searchText === "" || userText.includes(searchText)) {
            user.style.display = "grid"; // Define o estilo de layout do elemento "user" para "grid"
            user.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 2fr 1fr"; // Define as colunas da grade para "1fr 1fr 1fr 1fr 2fr 1fr"
        } else {
            user.style.display = "none"; // Oculta o usuário se não houver correspondência
        }
    });
});
