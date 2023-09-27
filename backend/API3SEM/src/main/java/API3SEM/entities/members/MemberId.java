package API3SEM.entities.members;

import java.io.Serializable;
import java.util.Objects;

public class MemberId implements Serializable {
    private String matriculaIntegrante;
    private String codCr;

    // Construtores, getters e setters

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MemberId memberId = (MemberId) o;
        return Objects.equals(matriculaIntegrante, memberId.matriculaIntegrante) &&
                Objects.equals(codCr, memberId.codCr);
    }

    @Override
    public int hashCode() {
        return Objects.hash(matriculaIntegrante, codCr);
    }
}
