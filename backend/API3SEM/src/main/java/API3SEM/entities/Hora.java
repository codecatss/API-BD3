package API3SEM.entities;


import java.sql.Timestamp;

import API3SEM.DTOS.HoraDTOs;
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

    @Column (name="status_aprovacao", length= 30, columnDefinition = "VARCHAR(30) DEFAULT 'pendente'")
    private String status_aprovacao;

    @Column (name="justificativa_negacao", length= 500)
    private String justificativa_negacao;

    @Column (name="matricula_gestor", length= 20)
    private String matricula_gestor;

    @Column(name = "data_lancamento", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp data_lancamento;

    @Column(name = "data_modificacao", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Timestamp data_modificacao;

    public Hora(HoraDTOs.HoraRequestDTO data){
        this.id = data.id();
        this.codcr = data.codcr();
        this.lancador = data.lancador();
        this.cnpj = data.cnpj();
        this.data_hora_inicio = data.data_hora_inicio();
        this.data_hora_fim = data.data_hora_fim();
        this.tipo = data.tipo();
        this.justificativa = data.justificativa();
        this.projeto = data.projeto();
        this.solicitante = data.solicitante();
        this.status_aprovacao = data.status_aprovacao();
        this.justificativa_negacao = data.justificativa_negacao();
        this.matricula_gestor = data.matricula_gestor();
        this.data_lancamento = data.data_lancamento();
    }



}
