package API3SEM.utills;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor

public enum VerbasEnum {
    HE75("1601"),
    HE100("1602"),
    HEN75("3000"),
    HEN100("3001"),
    ADN("1809"),
    SOBREAVISO("3016");

    private String nome;

    public static Object valueByNome(String verba) {
        for (VerbasEnum v : VerbasEnum.values()) {
            if (v.name().equals(verba)) {
                return v;
            }
        }
        return null;
    }
}
