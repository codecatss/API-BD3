package com.example.API3SEM.members;

import com.example.API3SEM.employees.Employee;
import com.example.API3SEM.resultCenter.CenterResult;

public record MemberResponseDTO (Employee employee, CenterResult centerResult, Boolean gestor) {

    public MemberResponseDTO(Member member){
        this(member.getEmployee(),member.getCenterResult(),member.getGestor());
    }
}
