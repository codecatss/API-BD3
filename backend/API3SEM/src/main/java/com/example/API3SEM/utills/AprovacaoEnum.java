package com.example.API3SEM.utills;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public enum AprovacaoEnum {

    APROVED("Aprovado"),
    DECLINEGEST("Negado pelo gestor"),
    DECLINEADM("Negado pelo adminstrador"),
    PENDENT("Pendente");

    private String nome;
}