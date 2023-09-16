package com.example.API3SEM.hora;

import java.sql.Timestamp;

public record HoraResponseDTO(String id, String code_cr, String matricula_lancador, String cnpj, Timestamp data_hora_inicio,
Timestamp data_hora_fim, String tipo, String justificatica_lan, String projeto, String gestor, String justificativa_negacao,
String status_aprovacao, String solicitante_lancamento, String aprovador_ADM) {

}
