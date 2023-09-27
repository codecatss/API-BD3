package API3SEM.DTOS;


import API3SEM.entities.Client;

public record ClientDTOs(String cnpj, String razao_social, String status) {

    public ClientDTOs(Client client) {
        this(client.getCnpj(), client.getRazao_social(),client.getStatus());
    }

    public static record ClientRequestDTO(String cnpj, String razao_social, String status) {

    }
}
