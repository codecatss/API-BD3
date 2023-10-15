package API3SEM.utills;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public enum TipoEnum {
    SOBREAVISO,ACIONAMENTO, EXTRA("Hora-extra");
    private String nome;
}
