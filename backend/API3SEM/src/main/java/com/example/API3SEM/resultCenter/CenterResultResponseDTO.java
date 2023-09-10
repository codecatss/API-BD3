package com.example.API3SEM.resultCenter;

import com.example.API3SEM.utills.StatusEnum;

public record CenterResultResponseDTO(String codigoCr, String nome, String sigla, StatusEnum statusCr) {

    public CenterResultResponseDTO(CenterResult centerResult){
        this(centerResult.getCodigoCr(), centerResult.getNome(), centerResult.getSigla(), centerResult.getStatusCr());
    }
}
