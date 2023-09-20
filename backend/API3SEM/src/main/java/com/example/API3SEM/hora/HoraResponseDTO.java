package com.example.API3SEM.hora;

import java.sql.Timestamp;

public record HoraResponseDTO(String id, String codigo_cr, String matricula, String cnpj,
Timestamp dataHoraInicio, Timestamp DataHoraFim, String tipo, String justificativa, String projeto, String solicitante) {

}
