package API3SEM.repositories;

import API3SEM.entities.Hora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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

    Collection<Object> findByLancadorAndCodcr(String matricula, String codCR);

    Collection<Object> findByLancadorAndCnpj(String matricula, String cnpj);

    Collection<Object> findByLancadorAndCodcrAndCnpj(String matricula, String codCR, String cnpj);
}
