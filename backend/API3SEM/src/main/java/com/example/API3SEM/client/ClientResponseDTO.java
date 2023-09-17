package com.example.API3SEM.client;


public record ClientResponseDTO(String cnpj, String razao_social, String status) {
    
    public ClientResponseDTO(Client client){
        this(client.getCnpj(), client.getRazao_social(), client.getStatus());
    }

}
