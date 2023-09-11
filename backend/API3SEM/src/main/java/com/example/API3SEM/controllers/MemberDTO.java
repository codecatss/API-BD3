package com.example.API3SEM.controllers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberDTO {
    private String matriculaIntegrante;
    private Boolean gestor;
    private String nome; // Adicione este campo para armazenar o nome do funcionário
}
