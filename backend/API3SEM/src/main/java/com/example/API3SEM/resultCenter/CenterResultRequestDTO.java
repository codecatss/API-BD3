package com.example.API3SEM.resultCenter;

import com.example.API3SEM.utills.StatusEnum;

public record CenterResultRequestDTO(String codigoCr, String nome, String sigla, StatusEnum statusCr) {
}
