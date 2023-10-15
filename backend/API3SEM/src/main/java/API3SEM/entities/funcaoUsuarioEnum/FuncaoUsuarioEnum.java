package API3SEM.entities.funcaoUsuarioEnum;

import java.util.HashMap;
import java.util.Map;

public enum FuncaoUsuarioEnum {
    admin,
    gestor,
    colaborador;

    private static final Map<String, FuncaoUsuarioEnum> stringToEnum = new HashMap<>();

    static {
        for (FuncaoUsuarioEnum funcao : values()) {
            stringToEnum.put(funcao.name().toLowerCase(), funcao);
        }
    }

    public static FuncaoUsuarioEnum fromRole(String role) {
        return stringToEnum.get(role.toLowerCase());
    }
}
