package com.example.API3SEM.hora;

import java.sql.Timestamp;

public record HoraResponseDTO(String id, String codigo_cr, String matricula_lancador, String cnpj,
Timestamp dataHoraInicio, Timestamp DataHoraFim, String tipo, String justificativa_lan, String projeto,
String gestor, String jusNegacao, String statusAprovacao, String solicitante) {

}
