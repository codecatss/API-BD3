package com.example.API3SEM.hora;


import java.sql.Timestamp;

import com.example.API3SEM.client.Client;
import com.example.API3SEM.employees.Employee;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
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
    @Column(name = "id", nullable = false)
    private Integer id;


    @Column(name = "cod_cr", nullable = false)
    private String cod_cr;


    @Column(name = "username_lancador", nullable = false)
    private String lancador;


    @Column (name= "cnpj_cliente", nullable = false)
    private String cnpj_cliente;

    @Column (name = "data_hora_inicio", nullable=false)
    private Timestamp data_hora_inicio;

    @Column (name = "data_hora_fim", nullable=false)
    private Timestamp data_hora_fim;

    @Column (name = "tipo", nullable=false)
    private  String tipo;

    @Column (name = "justificativa_lancamento", length= 500, nullable=false)
    private String justificativa;

    @Column (name = "projeto", length= 100, nullable = false)
    private String projeto;

    @Column (name="gestor", length= 80, nullable = false)
    private String gestor;

    @Column (name="justificativa_negacao", length=500, nullable=false)
    private String justificativa_negacao;

    @Column (name="status_aprovacao", length=20, nullable=false)
    private String status_aprovacao = "pendente";

    @Column (name="solicitante_lancamento", length= 80, nullable = false)
    private String solicitante_lancamento;


    @Column(name="aprovador_ADM", nullable=false)
    private String aprovador_ADM;
}
