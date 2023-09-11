package com.example.API3SEM.members;

import com.example.API3SEM.employees.Employee;
import com.example.API3SEM.resultCenter.CenterResult;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "integrante")
@Getter
@Setter
@AllArgsConstructor
public class Member implements Serializable {

    @EmbeddedId
    private MemberId id;


    @Id
    @JoinColumn(name = "matricula_integrante", referencedColumnName = "matricula", nullable = false)
    private Employee employee;


    @Id
    @JoinColumn(name = "cod_cr", referencedColumnName = "codigo_cr", nullable = false)
    private CenterResult centerResult;

    @Column(name = "gestor", nullable = false)
    private Boolean gestor;


}
