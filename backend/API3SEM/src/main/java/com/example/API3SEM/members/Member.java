package com.example.API3SEM.members;

import com.example.API3SEM.employees.Employee;
import com.example.API3SEM.employees.EmployeeRequestDTO;
import com.example.API3SEM.resultCenter.CenterResult;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "integrante")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@IdClass(MemberId.class)
public class Member {
    @Id
    @Column(name = "matricula_integrante", length = 20, nullable = false)
    private String matriculaIntegrante;

    @Id
    @Column(name = "cod_cr", length = 10, nullable = false)
    private String codCr;

    @Column(name = "gestor", nullable = false)
    private Boolean gestor;


    public Member(MemberRequestDTO data){
        this.matriculaIntegrante = data.matriculaIntegrante();
        this.codCr = data.codCr();
        this.gestor = data.gestor();
    }



}
