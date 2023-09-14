package com.example.API3SEM.hora;

import java.sql.Timestamp;

public record HoraRequestDTO(String id, String code_cr, String username_lancador, String cnpj_cliente, Timestamp data_hora_inicio,
Timestamp data_hora_fim, String tipo, String justificativa_lancamento, String projeto, String gestor, String justificativa_negacao,
String status_aprovacao, String solicitante_lancamento, String aprovador_ADM) {
    
}
