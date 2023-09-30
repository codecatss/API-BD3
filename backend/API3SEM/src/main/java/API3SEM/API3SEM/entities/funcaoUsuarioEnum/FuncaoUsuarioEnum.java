package API3SEM.API3SEM.entities.funcaoUsuarioEnum;

public enum FuncaoUsuarioEnum {
    ADMIN("admin"),
    GESTOR("gestor"),
    COLABORADOR("colaborador");


    private String role;

    FuncaoUsuarioEnum(String role) {
        this.role = role;
    }

}
