package com.example.API3SEM.hora;


import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Table(name = "hora")
@Entity(name = "hora")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Hora {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "codigo_cr", length = 10)
    private String codcr;

    @Column(name = "matricula_lancador")
    private String lancador;

    @Column (name= "cnpj_cliente")
    private String cnpj;

    @Column (name = "data_hora_inicio")
    private Timestamp data_hora_inicio;

    @Column (name = "data_hora_fim")
    private Timestamp data_hora_fim;

    @Column (name = "tipo")
    private  String tipo;

    @Column (name = "justificativa_lancamento", length= 500)
    private String justificativa;

    @Column (name = "projeto", length= 100)
    private String projeto;

    @Column (name="solicitante_lancamento", length= 80)
    private String solicitante;
}
