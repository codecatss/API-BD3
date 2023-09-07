package com.example.API3SEM.client;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "client")
@Getter
@Setter
@NoArgsConstructor

@Entity
public class Client implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cnpj;

    @Column(name = "razao_social")
    private String razao_social;
    
    @Column(name = "status")
    private String status;
}
