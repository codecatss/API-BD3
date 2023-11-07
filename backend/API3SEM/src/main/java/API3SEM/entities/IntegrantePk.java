package API3SEM.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class IntegrantePk {

    @Column(name = "matricula_integrante", nullable = false)
    String matricula;

    @Column(name = "cod_cr", nullable = false)
    String codCr;
}