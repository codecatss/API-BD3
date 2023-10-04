package API3SEM.utills;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public enum AprovacaoEnum {

    APROVADO_GESTOR("Aprovado pelo gestor"),
    NEGADO_GESTOR("Negado pelo gestor"),
    APROVADO_ADMIN("Aprovado pelo admin"),
    NEGADO_ADMIN("Negado pelo admin"),
    PENDENTE("Pendente");

    private String nome;
}