package API3SEM.utills;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
public enum TipoEnum {
    SOBREAVISO("Sobreaviso"),
    ACIONAMENTO("Acionamento"),
    EXTRA("Hora-extra");

    private String nome;

    public String getNome() {
        return nome;
    }
}
