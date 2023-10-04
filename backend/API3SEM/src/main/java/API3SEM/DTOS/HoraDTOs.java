package API3SEM.DTOS;

import API3SEM.entities.Hora;
import jakarta.persistence.Column;

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
        String solicitante,
        String status_aprovacao,
        String justificativa_negacao,
        String matricula_gestor,
        Timestamp data_lancamento,
        Timestamp data_modificacao
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
                hora.getData_modificacao()
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
            Timestamp data_modificacao
    ) {

    }
}




