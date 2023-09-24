function fetchAndRenderData() {
    const apiUrl = 'http://localhost:8080/clients';
    const tbodyElement = document.querySelector('#tabelaCliente tbody');

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            tbodyElement.innerHTML = '';
            data.forEach((item) => {
                renderTableRow(tbodyElement, item);
            });
        })
        .catch((error) => {
            console.error('Erro ao buscar dados da API:', error);
        });
}

function renderTableRow(tbody, item) {
    const newRow = tbody.insertRow();
    newRow.id = `cliente-${item.cnpj}`;
    const statusCell = newRow.insertCell(0);
    const razaoSocialCell = newRow.insertCell(1);
    const cnpjCell = newRow.insertCell(2);
    const actionsCell = newRow.insertCell(3);

    statusCell.textContent = item.status;
    razaoSocialCell.textContent = item.razaoSocial;
    cnpjCell.textContent = item.cnpj;

    const toggleButton = document.createElement('button');
    toggleButton.textContent = item.status === 'ativo' ? 'inativar' : 'ativar';
    toggleButton.classList.add('toggle-button', item.status === 'ativo' ? 'status-ativo' : 'status-inativo');
    toggleButton.addEventListener('click', () => toggleStatus(item.cnpj, item.status));
    actionsCell.appendChild(toggleButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'editar';
    editButton.addEventListener('click', () => editClient(item.cnpj, item.razaoSocial));
    editButton.innerHTML = '<img src="../assets/icone editar.svg" alt="Edit Image">';
    actionsCell.appendChild(editButton);
}



fetchAndRenderData();