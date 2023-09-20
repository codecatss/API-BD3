package com.example.API3SEM.hora;


import java.sql.Timestamp;
import java.util.List;

import com.example.API3SEM.utills.AprovacaoEnum;

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

    public Hora(String codcr, String lancador, String cnpj, List<Timestamp> hourRange, String tipo,
    String justificatica, String projeto, String solicitante, String aprovadoradm) {
        
        this.codcr = codcr;
        this.lancador = lancador;
        this.cnpj = cnpj;
        this.data_hora_inicio = hourRange.get(0);
        this.data_hora_fim = hourRange.get(1);
        this.tipo = tipo;
        this. justificativa = justificatica;
        this.projeto = projeto;
        this.solicitante = solicitante;
        this.aprovadoradm = aprovadoradm;
        
    }


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

    @Column (name="gestor", length= 80)
    private String gestor;

    @Column (name="justificativa_negacao", length=500)
    private String justificativa_negacao;

    @Column (name="status_aprovacao", length=20)
    private String status_aprovacao = AprovacaoEnum.PENDENT.name();

    @Column (name="solicitante_lancamento", length= 80)
    private String solicitante;


    @Column(name="aprovador_ADM", nullable = true)
    private String aprovadoradm;

    public static boolean isBetween (Timestamp start, Timestamp end, Timestamp teste){
        if(start.before(teste)&&end.after(teste)){
            return true;
        }
        return false;
    }
}
