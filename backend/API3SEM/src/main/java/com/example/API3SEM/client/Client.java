package com.example.API3SEM.client;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Client{

    @Id
    @Column(name = "cnpj", length = 14, nullable = false)
    private String cnpj;

    @Column(name = "razao_social", length = 50, nullable = false)
    private String razaoSocial;
    
    @Column(name = "status_cliente")
    private String status;



    public Client(ClientRequestDTO clientRequestDTO){
        this.cnpj = clientRequestDTO.getCnpj();
        this.razaoSocial = clientRequestDTO.getRazaoSocial();
        this.status = clientRequestDTO.getStatus();
    }
}
