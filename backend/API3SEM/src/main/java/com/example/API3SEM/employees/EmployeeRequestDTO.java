package com.example.API3SEM.employees;

import com.example.API3SEM.utills.StatusEnum;

public record EmployeeRequestDTO(String matricula, String nome, String senha, FuncaoUsuarioEnum funcao,StatusEnum status_usuario) {
}
