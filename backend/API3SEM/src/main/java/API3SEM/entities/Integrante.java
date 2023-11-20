package API3SEM.entities;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "integrante")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class Integrante {

    public Integrante(boolean gestor, String matricula, String codCr) {
        this.gestor = gestor;
        this.integrantePk = new IntegrantePk(matricula, codCr);
    }

    @Column(name = "gestor", nullable = false)
    Boolean gestor;

    @EmbeddedId
    @AttributeOverrides({
    @AttributeOverride( name = "matricula", column = @Column(name = "matricula_integrante")),
    @AttributeOverride( name = "codCr", column = @Column(name = "cod_cr")),
    })
    IntegrantePk integrantePk;
}