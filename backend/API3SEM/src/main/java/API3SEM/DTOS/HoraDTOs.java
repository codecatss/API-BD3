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

    public HoraDTOs(Object o) {
        this(
                ((Hora)o).getId(),
                ((Hora)o).getCodcr(),
                ((Hora)o).getLancador(),
                ((Hora)o).getCnpj(),
                ((Hora)o).getData_hora_inicio(),
                ((Hora)o).getData_hora_fim(),
                ((Hora)o).getTipo(),
                ((Hora)o).getJustificativa(),
                ((Hora)o).getProjeto(),
                ((Hora)o).getSolicitante(),
                ((Hora)o).getStatus_aprovacao(),
                ((Hora)o).getJustificativa_negacao(),
                ((Hora)o).getMatricula_gestor(),
                ((Hora)o).getData_lancamento(),
                ((Hora)o).getData_modificacao_gestor(),
                ((Hora)o).getMatricula_admin(),
                ((Hora)o).getData_modificacao_admin(),
                ((Hora)o).getLista_de_acionamentos()
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





