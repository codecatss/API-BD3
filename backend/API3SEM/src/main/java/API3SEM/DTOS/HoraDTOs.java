package API3SEM.DTOS;

import API3SEM.entities.Hora;

import java.sql.Timestamp;
import java.util.List;

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
        String solicitante,
        String status_aprovacao,
        String justificativa_negacao,
        String matricula_gestor,
        Timestamp data_lancamento,
        Timestamp data_modificacao_gestor,
        String matricula_admin,
        Timestamp data_modificacao_admin,
        List<Hora> lista_de_acionamentos
) {

    public HoraDTOs(Hora hora){
        this(
                hora.getId(),
                hora.getCodcr(),
                hora.getLancador(),
                hora.getCnpj(),
                hora.getData_hora_inicio(),
                hora.getData_hora_fim(),
                hora.getTipo(),
                hora.getJustificativa(),
                hora.getProjeto(),
                hora.getSolicitante(),
                hora.getStatus_aprovacao(),
                hora.getJustificativa_negacao(),
                hora.getMatricula_gestor(),
                hora.getData_lancamento(),
                hora.getData_modificacao_gestor(),
                hora.getMatricula_admin(),
                hora.getData_modificacao_admin(),
                hora.getLista_de_acionamentos()
        );
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
            String solicitante,
            String status_aprovacao,
            String justificativa_negacao,
            String matricula_gestor,
            Timestamp data_lancamento,
            Timestamp data_modificacao_gestor,
            String matricula_admin,
            Timestamp data_modificacao_admin
    ) {

    }
}





