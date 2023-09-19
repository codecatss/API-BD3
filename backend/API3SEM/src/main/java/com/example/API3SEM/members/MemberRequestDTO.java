package com.example.API3SEM.members;

import com.example.API3SEM.employees.Employee;
import com.example.API3SEM.resultCenter.CenterResult;

public record MemberRequestDTO(String matriculaIntegrante, String codCr, Boolean gestor) {
}
