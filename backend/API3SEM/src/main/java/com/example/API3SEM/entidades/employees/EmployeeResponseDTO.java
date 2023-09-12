package com.example.API3SEM.employees;

import com.example.API3SEM.utills.StatusEnum;

public record EmployeeResponseDTO(String matricula, String nome, String senha, FuncaoUsuarioEnum funcao, StatusEnum status_usuario) {


    public EmployeeResponseDTO(Employee employee){
        this(employee.getMatricula(), employee.getNome(), employee.getSenha(), employee.getFuncao(),employee.getStatus_usuario());
    }
}
