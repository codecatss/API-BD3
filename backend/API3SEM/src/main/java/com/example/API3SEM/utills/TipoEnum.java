package com.example.API3SEM.utills;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public enum TipoEnum {
    SOBREAVISO, EXTRA("Hora extra");
    private String nome;
}
