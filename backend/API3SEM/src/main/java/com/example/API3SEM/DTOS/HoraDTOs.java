package com.example.API3SEM.DTOS;

import com.example.API3SEM.entities.Hora;

import java.sql.Timestamp;

public record HoraDTOs(
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

    public HoraDTOs(Hora hora){
        this(hora.getId(), hora.getCodcr(), hora.getLancador(),hora.getCnpj(),hora.getData_hora_inicio(),hora.getData_hora_fim(),hora.getTipo(),hora.getJustificativa(),hora.getProjeto(),hora.getSolicitante());
    }

    public static record HoraRequestDTO(
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

    }
}





