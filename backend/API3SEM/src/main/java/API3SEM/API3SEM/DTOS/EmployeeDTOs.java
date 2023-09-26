package API3SEM.API3SEM.DTOS;

import API3SEM.API3SEM.utills.StatusEnum;
import API3SEM.API3SEM.entities.funcaoUsuarioEnum.FuncaoUsuarioEnum;
import API3SEM.API3SEM.entities.Employee;

public record EmployeeDTOs(String matricula, String nome, String senha, FuncaoUsuarioEnum funcao, StatusEnum status_usuario) {


    public EmployeeDTOs(Employee employee){
        this(employee.getMatricula(), employee.getNome(), employee.getSenha(), employee.getFuncao(),employee.getStatus_usuario());
    }

    public static record EmployeeRequestDTO(String matricula, String nome, String senha, FuncaoUsuarioEnum funcao, StatusEnum status_usuario) {
    }
}
