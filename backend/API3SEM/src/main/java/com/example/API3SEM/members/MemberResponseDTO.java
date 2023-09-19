package com.example.API3SEM.members;

import com.example.API3SEM.employees.Employee;
import com.example.API3SEM.resultCenter.CenterResult;

public record MemberResponseDTO(String employee, String centerResult, Boolean gestor) {

    public MemberResponseDTO(Member member) {
        this(member.getMatriculaIntegrante(), member.getCodCr(), member.getGestor());
    }
}
