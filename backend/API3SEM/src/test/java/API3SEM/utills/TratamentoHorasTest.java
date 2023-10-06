package API3SEM.utills;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.floatThat;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;


class TratamentoHorasTest {
    Random random = new Random();

    @Test
    void getProporcionalNoturna() {
        
        Timestamp inicio = Timestamp.valueOf(LocalDateTime.of(2023, 12, 5, random.nextInt(13), 0));
        Timestamp fim = Timestamp.valueOf(inicio.toLocalDateTime().plusHours(2));

        List<Timestamp> teste = new ArrayList<>();
        teste.add(inicio);
        teste.add(fim);
        Double expected = 120 * 1.142;
        assertEquals(expected, TratamentoHoras.getProporcionalNoturna(teste), 0, "Erro na função 'getProporcionalNoturna' na pasta utils");
    }

}