package API3SEM.repositories;

import API3SEM.entities.Hora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface HoraRepository extends JpaRepository<Hora, Integer> {

    List<Hora> findByLancador(String lancador);
    List<Hora> findByCodcr(String codcr);
    List<Hora> findByCnpj(String cnpj);

    @Query(value = "SELECT\n" +
            "    h.id,\n" +
            "    h.codigo_cr,\n" +
            "    h.matricula_lancador,\n" +
            "    h.cnpj_cliente,\n" +
            "    h.data_hora_inicio,\n" +
            "    h.data_hora_fim,\n" +
            "    h.tipo,\n" +
            "    h.justificativa_lancamento,\n" +
            "    h.projeto,\n" +
            "    h.solicitante_lancamento,\n" +
            "    h.status_aprovacao,\n" +
            "    h.justificativa_negacao,\n" +
            "    h.matricula_gestor,\n" +
            "    h.data_lancamento,\n" +
            "    h.data_modificacao_gestor,\n" +
            "    h.matricula_admin,\n" +
            "    h.data_modificacao_admin,\n" +
            "    (\n" +
            "        SELECT jsonb_agg(jsonb_build_object(\n" +
            "            'id', a.id,\n" +
            "            'codigo_cr', a.codigo_cr,\n" +
            "            'matricula_lancador', a.matricula_lancador,\n" +
            "            'cnpj_cliente', a.cnpj_cliente,\n" +
            "            'data_hora_inicio', a.data_hora_inicio,\n" +
            "            'data_hora_fim', a.data_hora_fim,\n" +
            "            'tipo', a.tipo,\n" +
            "            'justificativa_lancamento', a.justificativa_lancamento,\n" +
            "            'projeto', a.projeto,\n" +
            "            'solicitante_lancamento', a.solicitante_lancamento,\n" +
            "            'status_aprovacao', a.status_aprovacao,\n" +
            "            'justificativa_negacao', a.justificativa_negacao,\n" +
            "            'matricula_gestor', a.matricula_gestor,\n" +
            "            'data_lancamento', a.data_lancamento,\n" +
            "            'data_modificacao_gestor', a.data_modificacao_gestor,\n" +
            "            'matricula_admin', a.matricula_admin,\n" +
            "            'data_modificacao_admin', a.data_modificacao_admin\n" +
            "        ))\n" +
            "        FROM hora a\n" +
            "        WHERE a.codigo_cr = h.codigo_cr\n" +
            "        AND a.tipo = 'ACIONAMENTO'\n" +
            "    ) AS lista_de_acionamentos\n" +
            "FROM hora h\n" +
            "WHERE h.tipo IN ('SOBREAVISO', 'EXTRA')\n" +
            "GROUP BY h.id;\n", nativeQuery = true)
    List<Hora> findAllHoras();

    @Query("SELECT h FROM hora h " +
    "WHERE " +
    "(h.data_hora_inicio >= :inicio AND h.data_hora_inicio <= :fim) AND (h.data_hora_fim >= :inicio AND h.data_hora_fim <= :fim)")
    List<Hora> findHorasBetween(LocalDateTime inicio, LocalDateTime fim);

    Collection<Object> findByLancadorAndCodcr(String matricula, String codCR);

    Collection<Object> findByLancadorAndCnpj(String matricula, String cnpj);

    Collection<Object> findByLancadorAndCodcrAndCnpj(String matricula, String codCR, String cnpj);

    // BD-72 -- INÍCIO

    // Filtro por tipo de hora
    @Query("SELECT h FROM hora h WHERE h.tipo = :tipo")
    List<Hora> findByTipo(String tipo);

    //--

//    // Filtro por período
//    @Query("SELECT h FROM hora h " +
//            "WHERE (h.data_hora_inicio >= :data_hora_inicio AND h.data_hora_fim <= :data_hora_fim) " +
//            "AND cast(h.data_lancamento as date) = :data_lancamento")
//    List<Hora> findByPeriodo(
//            Timestamp data_hora_inicio,
//            Timestamp data_hora_fim,
//            Timestamp data_lancamento
//    );
//
//    // Filtro por status de hora
//    List<Hora> findByStatusAprovacao(String status);
//
//    // Horas lançadas por CR
//        // Quantidade de lançamentos por CR (hora-extra, sobreaviso, acionamentos e total)
//    @Query("SELECT cr.nome, COUNT(h.id) " +
//                  "FROM hora h " +
//                  "INNER JOIN CenterResult cr ON h.codigo_cr = cr.codigo_cr " +
//                  "WHERE h.tipo = :tipo " +
//                  "GROUP BY h.cnpj_cliente, cr.nome")
//    List<Object[]> contarLancamentosPorCR(String tipo);
//
//        // Horas brutas trabalhadas por CR (Seria legal, verificar com PO/Cliente)
//        // TODO
//
//
//    // Horas lançadas por Clientes - TODOS!:
//        // Quantidade de lançamentos por Cliente (hora-extra, sobreaviso, acionamentos e total)
//    @Query("SELECT c.razao_social, COUNT(h.id) " +
//            "FROM hora h " +
//            "INNER JOIN Client c ON h.cnpj_cliente = c.cnpj " +
//            "INNER JOIN CenterResult cr ON h.codigo_cr = cr.codigo_cr " +
//            "GROUP BY h.cnpj_cliente, c.razao_social")
//    List<Object[]> quantidadeHorasPorCliente();
//
//        // Horas brutas trabalhadas por Cliente
//        // TODO
//
//    // BD-72 -- FIM
}
