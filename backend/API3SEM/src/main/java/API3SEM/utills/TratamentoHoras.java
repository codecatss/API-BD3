package API3SEM.utills;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.util.List;

public class TratamentoHoras {
    
    /**
     * Converte um total de horas reais em horas noturna para serempagas
     * 
     * @param periodo lista de timestamp com inicio e fim da hora
     * @return Double horas trabalhadas em minutos vezes 1.142
     */
    public static Double getProporcionalNoturna(List<Timestamp> periodo ){
        Instant inicio = periodo.get(0).toInstant();
        Instant fim = periodo.get(1).toInstant();
        Duration duracao = Duration.between(inicio, fim);
        Double minutos = Double.parseDouble(Double.toString(duracao.toMinutes()* 1.142));
        return minutos;
    }
}
