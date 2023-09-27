package API3SEM.entities;

import API3SEM.DTOS.ResultCenterDTOs;
import API3SEM.utills.StatusEnum;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "centro_resultado")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "codigoCr")
public class CenterResult {

    @Id
    @Column(name = "codigo_cr", length = 10, nullable = false)
    private String codigoCr;

    @Column(name = "nome", length = 30, nullable = false)
    private String nome;

    @Column(name = "sigla", length = 10, nullable = false, unique = true)
    private String sigla;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_cr", nullable = false, columnDefinition = "VARCHAR(10) DEFAULT 'ativo'")
    private StatusEnum statusCr;



    public CenterResult(ResultCenterDTOs.CenterResultRequestDTO data){
        this.codigoCr = data.codigoCr();
        this.nome = data.nome();
        this.sigla = data.sigla();
        this.statusCr = data.statusCr();
    }



}
