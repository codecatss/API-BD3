package com.example.API3SEM.client;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "cliente")
@Entity(name = "cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Client{

    @Id
    @Column(name = "cnpj", length = 14, nullable = false)
    private String cnpj;

    @Column(name = "razao_social", length = 50, nullable = false)
    private String razao_social;
    
    @Column(name = "status_cliente")
    private String status;

    public Client(ClientRequestDTO clientRequestDTO){
        this.cnpj = clientRequestDTO.cnpj();
        this.razao_social = clientRequestDTO.razao_social();
        this.status = clientRequestDTO.status();
    }

}
