package com.example.API3SEM.hora;

import java.sql.Timestamp;

public record HoraResponseDTO(
        Integer id,
        String codcr,
        String lancador,
        String cnpj,
        Timestamp data_hora_inicio,
        Timestamp data_hora_fim,
        String tipo,
        String justificativa,
        String projeto,
        String solicitante
) {

    public HoraResponseDTO(Hora hora){
        this(hora.getId(), hora.getCodcr(), hora.getLancador(),hora.getCnpj(),hora.getData_hora_inicio(),hora.getData_hora_fim(),hora.getTipo(),hora.getJustificativa(),hora.getProjeto(),hora.getSolicitante());
    }

}





