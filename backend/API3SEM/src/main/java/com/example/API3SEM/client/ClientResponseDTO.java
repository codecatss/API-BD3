package com.example.API3SEM.client;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientResponseDTO {
    private String cnpj;
    private String razaoSocial;
    private String status;

    public ClientResponseDTO(Client client) {
        this.cnpj = client.getCnpj();
        this.razaoSocial = client.getRazaoSocial();
        this.status = client.getStatus();
    }
}
