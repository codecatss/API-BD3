import java.sql.Timestamp;

import jakarta.persistence.Id;


@Table(name = "hora")
@Entity(name = "hora")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Hora {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(nome = "cod_cr", length = 50, nullable = false)
    private String cod_cr;

    @Column(name = "username_lancador", length = 800, nullable = false)
    private String  username_lancador;

    @Column (name= "cnpj_cliente", length = 14, nullable = false)
    private String cnpj_cliente;

    @Column (name = "data_hora_inicio", nullable=false)
    private Timestamp data_hora_inicio;

    @Column (name = "data_hora_fim", nullable=false)
    private Timestamp data_hora_fim;

    @Column (name = "tipo", nullable=false)
    private  String tipo;

    @Column (name = "justificativa_lancamento", length= 500, nullable=false)
    private String justificativa;

    @Column (name = "projeto", length= 100, nullable = false)
    private String projeto;

    @Column (name="gestor", length= 80, nullable = false)
    private String gestor;

    @Column (name="justificativa_negacao", length=500, nullable=false)
    private String justificativa_negacao;

    @Column (name="status_aprovacao", length=20, nullable=false)
    private String status_aprovacao = "pendente";

    @Column (name="solicitante_lancamento", length= 80, nullable = false)
    private String solicitante_lancamento;

    @Column (name="excepcional", nullable = false)
    private Boolean excepcional = false;

    @Column (name="aprovador_ADM", length = 80, nullable=false)
    private String aprovador_ADM;
}
