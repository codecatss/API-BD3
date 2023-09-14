package com.example.API3SEM.controllers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
    private List<String> matriculaIntegrante; // Agora é uma lista
    private Boolean gestor;
    private String nome; // Adicione este campo para armazenar o nome do funcionário
}
