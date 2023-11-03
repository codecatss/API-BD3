package API3SEM.entities.funcaoUsuarioEnum;

public enum FuncaoUsuarioEnum {
    admin("admin"),
    gestor("gestor"),
    colaborador("colaborador");

    private String role;

     FuncaoUsuarioEnum(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
