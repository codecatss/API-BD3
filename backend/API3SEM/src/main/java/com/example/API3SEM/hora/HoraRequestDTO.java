package com.example.API3SEM.hora;

import java.sql.Timestamp;

public record HoraRequestDTO(
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
