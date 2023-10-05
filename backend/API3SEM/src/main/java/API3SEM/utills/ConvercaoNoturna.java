package API3SEM.utills;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;

public class ConvercaoNoturna {
    /**
     * Converte um total de horas reais em horas noturna para serempagas
     * @param periodo lista de timestamp com inicio e fim da hora
     * @return horas trabalhadas em minutos vezes 1.142
     */
    public Duration getProporcionalNoturna(Timestamp[] periodo ){
        Instant inicio = periodo[0].toInstant();
        Instant fim = periodo[1].toInstant();
        Duration duracao = Duration.between(inicio, fim);
        long minutos = Long.parseLong(Double.toString(duracao.toMinutes()* 1.142));
        return Duration.ofMinutes(minutos);
    }
}
