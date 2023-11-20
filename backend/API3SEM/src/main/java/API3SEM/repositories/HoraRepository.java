package API3SEM.repositories;

import API3SEM.entities.Hora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.Query;


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

    // CodCR && Tipo
    Collection<Object> findByLancadorAndCodcrAndTipo(String matricula, String codCR, String tipo);

    // CodCR && Status
    @Query("SELECT h FROM hora h WHERE h.lancador = :matricula AND h.codcr = :codCR AND h.status_aprovacao = :statusAprovacao")
    Collection<Object> findByLancadorAndCodcrAndStatusAprovacao(String matricula, String codCR, String statusAprovacao);

    // CodCR && Tipo && Status
    @Query("SELECT h FROM hora h WHERE h.lancador = :matricula AND h.codcr = :codCR AND h.tipo = :tipo AND h.status_aprovacao = :statusAprovacao")
    Collection<Hora> findByLancadorAndCodcrAndTipoAndStatusAprovacao(String matricula, String codCR, String tipo, String statusAprovacao);

    // Cnpj && Tipo
    Collection<Object> findByLancadorAndCnpjAndTipo(String matricula, String cnpj, String tipo);

    // Cnpj && Status
    @Query("SELECT h FROM hora h WHERE h.lancador = :matricula AND h.cnpj = :cnpj AND h.status_aprovacao = :statusAprovacao")
    Collection<Object> findByLancadorAndCnpjAndStatusAprovacao(String matricula, String cnpj, String statusAprovacao);

    // Cnpj && Tipo && Status
    @Query("SELECT h FROM hora h WHERE h.lancador = :matricula AND h.cnpj = :cnpj AND h.tipo = :tipo AND h.status_aprovacao = :statusAprovacao")
    Collection<Hora> findByLancadorAndCnpjAndTipoAndStatusAprovacao(String matricula, String cnpj, String tipo, String statusAprovacao);

    // CodCr && Cnpj && Tipo
    Collection<Object> findByLancadorAndCodcrAndCnpjAndTipo(String matricula, String codCR, String cnpj, String tipo);

    // CodCr && Cnpj && Status
    @Query("SELECT h FROM hora h WHERE h.lancador = :matricula AND h.codcr = :codCR AND h.cnpj = :cnpj AND h.status_aprovacao = :statusAprovacao")
    Collection<Object> findByLancadorAndCodcrAndCnpjAndStatusAprovacao(String matricula, String codCR, String cnpj, String statusAprovacao);

    // CodCr && Cnpj && Tipo && Status
    @Query("SELECT h FROM hora h WHERE h.lancador = :matricula AND h.codcr = :codCR AND h.cnpj = :cnpj AND h.tipo = :tipo AND h.status_aprovacao = :statusAprovacao")
    Collection<Object> findByLancadorAndCodcrAndCnpjAndTipoAndStatusAprovacao(String matricula, String codCR, String cnpj, String tipo, String statusAprovacao);

    // Filtro por tipo de hora
    @Query("SELECT h FROM hora h WHERE h.tipo = :tipo")
    List<Hora> findByTipo(String tipo);

    //--

    // Filtro por período
    @Query("SELECT h FROM hora h " +
            "WHERE (h.data_hora_inicio >= :data_hora_inicio AND h.data_hora_fim <= :data_hora_fim) " +
            "AND cast(h.data_lancamento as date) = :data_lancamento")
    List<Hora> findByPeriodo(
            Timestamp data_hora_inicio,
            Timestamp data_hora_fim,
            Timestamp data_lancamento
    );

    // Filtro por status de hora
    @Query("SELECT h FROM hora h WHERE " +
            "(:status IS NULL OR h.status_aprovacao = :status)")
    List<Hora> findByStatusAprovacao(String status);


    // Horas lançadas por CR
        // Quantidade de lançamentos por CR (hora-extra, sobreaviso, acionamentos e total)
    @Query("SELECT cr.nome, COUNT(h.id) " +
                  "FROM hora h " +
                  "INNER JOIN CenterResult cr ON h.codcr = cr.codigoCr " +
                  "WHERE h.tipo = :tipo " +
                  "GROUP BY h.cnpj, cr.nome")
    List<Object[]> contarLancamentosPorCR(String tipo);
//
//        // Horas brutas trabalhadas por CR (Seria legal, verificar com PO/Cliente)
//        // TODO
//
//
    // Horas lançadas por Clientes - TODOS!:
        // Quantidade de lançamentos por Cliente (hora-extra, sobreaviso, acionamentos e total)
    @Query("SELECT c.razao_social, COUNT(h.id) " +
            "FROM hora h " +
            "INNER JOIN Client c ON h.cnpj = c.cnpj " +
            "INNER JOIN CenterResult cr ON h.codcr = cr.codigoCr " +
            "GROUP BY h.cnpj, c.razao_social")
    List<Object[]> quantidadeHorasPorCliente();
//
//        // Horas brutas trabalhadas por Cliente
//        // TODO
//
//    // BD-72 -- FIM
    @Query("SELECT h FROM hora h " +
    "WHERE " +
    "h.matricula_gestor = :var")
    List<Hora> findByMatricula_gestor(String var);

    @Query(value = "SELECT count(h) > 0 FROM hora h WHERE h.funcao = :var", nativeQuery = true)
    boolean existsByGestor(String var);

    @Query("SELECT h FROM hora h " +
    "WHERE " +
    "h.codcr = :CodCr and h.cnpj = :Cnpj")
    List<Hora> findByCodCrAndCnpj(String CodCr, String Cnpj);

    @Query("SELECT h FROM hora h " +
    "WHERE " +
    "h.codcr = :CodCr and h.cnpj = :Cnpj and h.tipo = :Tipo")
    List<Hora> findByCodCrAndCnpjAndTipo(String CodCr, String Cnpj, String Tipo);

    @Query("SELECT h FROM hora h " +
    "WHERE " +
    "h.codcr = :CodCr and h.cnpj = :Cnpj and h.status_aprovacao = :StatusAprovacao")
    List<Hora> findByCodCrAndCnpjAndStatusAprovacao(String CodCr, String Cnpj, String StatusAprovacao);

    @Query("SELECT h FROM hora h " +
    "WHERE " +
    "h.codcr = :CodCr and h.tipo = :Tipo and h.status_aprovacao = :StatusAprovacao")
    List<Hora> findByCodCrAndTipoAndStatusAprovacao(String CodCr, String Tipo, String StatusAprovacao);

    @Query("SELECT h FROM hora h " +
    "WHERE " +
    "h.cnpj = :Cnpj and h.tipo = :Tipo and h.status_aprovacao = :StatusAprovacao")
    List<Hora> findByCnpjAndTipoAndStatusAprovacao(String Cnpj, String Tipo, String StatusAprovacao);

    @Query("SELECT h FROM hora h " +
    "WHERE " +
    "h.codcr = :CodCr and h.tipo = :Tipo")
    List<Hora> findByCodCrAndTipo(String CodCr, String Tipo);

    @Query("SELECT h FROM hora h " +
    "WHERE " +
    "h.cnpj = :Cnpj and h.tipo = :Tipo")
    List<Hora> findByCnpjAndTipo(String Cnpj, String Tipo);

    @Query("SELECT h FROM hora h " +
    "WHERE " +
    "h.codcr = :CodCr and h.status_aprovacao = :StatusAprovacao")
    List<Hora> findByCodCrAndStatusAprovacao(String CodCr, String StatusAprovacao);

    @Query("SELECT h FROM hora h " +
    "WHERE " +
    "h.cnpj = :Cnpj and h.status_aprovacao = :StatusAprovacao")
    List<Hora> findByCnpjAndStatusAprovacao(String Cnpj, String StatusAprovacao);

    @Query("SELECT h FROM hora h " +
    "WHERE " +
    "h.tipo = :Tipo and h.status_aprovacao = :StatusAprovacao")
    List<Hora> findByTipoAndStatusAprovacao(String Tipo, String StatusAprovacao);

    @Query("SELECT h FROM hora h WHERE h.codcr = :CodCr and h.cnpj = :Cnpj and h.tipo = :Tipo and h.status_aprovacao = :StatusAprovacao")
    List<Hora> findByCodCrAndCnpjAndTipoAndStatusAprovacao(String CodCr, String Cnpj, String Tipo, String StatusAprovacao);
}
