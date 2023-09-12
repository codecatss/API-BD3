import java.sql.Timestamp;

public record HoraResponseDTO(String id, String code_cr, String username_lancador, String cnpj_cliente, Timestamp data_hora_inicio,
Timestamp data_hora_fim, String tipo, String justificativa_lancamento, String projeto, String gestor, String justificativa_negacao,
String status_aprovacao, String solicitante_lancamento, String excepcional, String aprovador_ADM) {

}
