package API3SEM.utills;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public enum AprovacaoEnum {

    APROVADO_GESTOR("Aprovado"),
    NEGADO_GESTOR("Negado pelo gestor"),
    PENDENTE("Pendente");

    private String nome;
}