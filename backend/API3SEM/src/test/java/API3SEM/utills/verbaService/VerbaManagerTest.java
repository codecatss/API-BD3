package API3SEM.utills.verbaService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import API3SEM.entities.Hora;
import API3SEM.utills.TipoEnum;
import API3SEM.utills.VerbasEnum;
import API3SEM.utills.Service.VerbaHora;
import API3SEM.utills.Service.VerbaService;

import java.time.Duration;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class VerbaManagerTest {

    // private List<VerbaHora> verbas = new ArrayList<>();

    // @BeforeEach
    // public void setUp() {
    //     verbas.clear();
    // }

    // @Test
    // public void testSobreaviso() {

    //     Hora horaDiurnaSobre = new Hora();
    //     horaDiurnaSobre.setTipo(TipoEnum.SOBREAVISO.name());
    //     horaDiurnaSobre.setData_hora_inicio(Timestamp.valueOf(LocalDateTime.of(2023, 10, 8, 8, 0, 0)));
    //     horaDiurnaSobre.setData_hora_fim(Timestamp.valueOf(LocalDateTime.of(2023, 10, 8, 12, 0, 0)));

    //     verbas = VerbaService.getVerbaFromHora(horaDiurnaSobre);
    //     assertEquals(1, verbas.size());

    //     // Verifica se as verbas diurnas são calculadas corretamente
        
    //     assertEquals(horaDiurnaSobre.getDuration(), verbas.get(0).getDuration().getSeconds());
    //     assertEquals(VerbasEnum.SOBREAVISO, verbas.get(0).getVerba());

    //     Exception exception = assertThrows(IndexOutOfBoundsException.class, () -> {
    //         verbas.get(1);
    //     });

    //     String expectedMessage = "Index";
    //     String actualMessage = exception.getMessage();

    //     assertTrue(actualMessage.contains(expectedMessage));
    // }

    // @Test
    // public void testVerbasDiurnas() {       

    //     Hora horaDiurna = new Hora();
    //     horaDiurna.setTipo(TipoEnum.EXTRA.name());
    //     horaDiurna.setData_hora_inicio(Timestamp.valueOf(LocalDateTime.of(2023, 10, 8, 8, 0, 0)));
    //     horaDiurna.setData_hora_fim(Timestamp.valueOf(LocalDateTime.of(2023, 10, 8, 12, 0, 0)));
        
    //     verbas = VerbaService.getVerbaFromHora(horaDiurna);

    //     assertEquals(2, verbas.size());

    //     assertEquals(7200, verbas.get(0).getDuration().getSeconds());
    //     assertEquals(VerbasEnum.HE75, verbas.get(0).getVerba());

    //     assertEquals(7199, verbas.get(1).getDuration().getSeconds());
    //     assertEquals(VerbasEnum.HE100, verbas.get(1).getVerba());
    // }

    //     @Test
    // public void testVerbasDiurnasSimples() {
        
    //     Hora horaDiurna = new Hora();
    //     horaDiurna.setTipo(TipoEnum.EXTRA.name());
    //     horaDiurna.setData_hora_inicio(Timestamp.valueOf(LocalDateTime.of(2023, 10, 9, 20, 0, 0)));
    //     horaDiurna.setData_hora_fim(Timestamp.valueOf(LocalDateTime.of(2023, 10, 9, 22, 0, 0)));

    //     verbas = VerbaService.getVerbaFromHora(horaDiurna);
    //     assertEquals(VerbasEnum.HE75, verbas.get(0).getVerba());
    //     assertEquals(1, verbas.size());

    //     Long duration = Duration.between(horaDiurna.getData_hora_inicio().toInstant(), horaDiurna.getData_hora_fim().toInstant()).toSeconds();

    //     assertEquals(duration, verbas.get(0).getDuration().toSeconds());
    // }

    // @Test
    // public void testVerbasNoturnaSimples() {
        
    //     Hora horaNoturna = new Hora();
    //     horaNoturna.setTipo(TipoEnum.EXTRA.name());
    //     horaNoturna.setData_hora_inicio(Timestamp.valueOf(LocalDateTime.of(2023, 10, 9, 23, 0, 0)));
    //     horaNoturna.setData_hora_fim(Timestamp.valueOf(LocalDateTime.of(2023, 10, 9, 23, 50, 0)));

    //     verbas = VerbaService.getVerbaFromHora(horaNoturna);
    //     assertEquals(2, verbas.size());
    //     assertEquals(VerbasEnum.HEN75, verbas.get(0).getVerba());
    //     assertEquals(VerbasEnum.ADN, verbas.get(1).getVerba());

    //     Long duration = Duration.between(horaNoturna.getData_hora_inicio().toInstant(), horaNoturna.getData_hora_fim().toInstant()).toSeconds();

    //     assertEquals(duration, verbas.get(0).getDuration().toSeconds());
    // }

    // @Test
    // public void testVerbasNoturnas() {
        
    //     Hora horaNoturna = new Hora();
    //     horaNoturna.setTipo(TipoEnum.EXTRA.name());
    //     horaNoturna.setData_hora_inicio(Timestamp.valueOf(LocalDateTime.of(2023, 10, 8, 22, 1, 0)));
    //     horaNoturna.setData_hora_fim(Timestamp.valueOf(LocalDateTime.of(2023, 10, 9, 2, 1, 0)));

    //     verbas = VerbaService.getVerbaFromHora(horaNoturna);
    //     assertEquals(3, verbas.size());

    //     assertEquals(7200, verbas.get(0).getDuration().getSeconds());
    //     assertEquals(VerbasEnum.HEN75, verbas.get(0).getVerba());

    //     assertEquals(7200, verbas.get(1).getDuration().getSeconds());
    //     assertEquals(VerbasEnum.HEN100, verbas.get(1).getVerba());

    //     assertEquals(horaNoturna.getDuration(), verbas.get(2).getDuration().getSeconds());
    //     assertEquals(VerbasEnum.ADN, verbas.get(2).getVerba());
    // }

    //     @Test
    // public void testCompoundHora() {

    //     Hora compoundHora = new Hora();
    //     compoundHora.setTipo(TipoEnum.EXTRA.name());
    //     compoundHora.setData_hora_inicio(Timestamp.valueOf(LocalDateTime.of(2023, 10, 9, 20, 0, 0)));
    //     compoundHora.setData_hora_fim(Timestamp.valueOf(LocalDateTime.of(2023, 10, 10, 2, 0, 0)));

    //     verbas = VerbaService.getVerbaFromHora(compoundHora);

    //     assertEquals(VerbasEnum.HE75, verbas.get(0).getVerba());
    //     assertEquals(VerbasEnum.HEN100, verbas.get(1).getVerba());


    //     assertEquals(3, verbas.size());


    //     assertEquals(7200, verbas.get(0).getDuration().getSeconds());
    //     assertEquals(VerbasEnum.HE75, verbas.get(0).getVerba());

    //     assertEquals(14400, verbas.get(1).getDuration().getSeconds());
    //     assertEquals(VerbasEnum.HEN100, verbas.get(1).getVerba());

    //     assertEquals(14400, verbas.get(2).getDuration().getSeconds());
    //     assertEquals(VerbasEnum.ADN, verbas.get(2).getVerba());
            
    // }
    
    // @Test
    //     public void testEmptyHoraList() {
    //         Exception exception = assertThrows(RuntimeException.class, () -> {
    //             VerbaService.getVerbaFromHora(new ArrayList<>());
    //         });

    //         String expectedMessage = "Lista de horas vazia";
    //         String actualMessage = exception.getMessage();
            
    //         assertTrue(actualMessage.contains(expectedMessage));
    //     }

    // @Test
    //     public void testVerbasWithMultipleHoras() {

    //         Hora hora1 = new Hora();
    //         hora1.setTipo(TipoEnum.EXTRA.name());
    //         hora1.setData_hora_inicio(Timestamp.valueOf(LocalDateTime.of(2023, 10, 8, 8, 0, 0)));
    //         hora1.setData_hora_fim(Timestamp.valueOf(LocalDateTime.of(2023, 10, 8, 12, 0, 0)));

    //         Hora hora2 = new Hora();
    //         hora2.setTipo(TipoEnum.EXTRA.name());
    //         hora2.setData_hora_inicio(Timestamp.valueOf(LocalDateTime.of(2023, 10, 9, 18, 0, 0)));
    //         hora2.setData_hora_fim(Timestamp.valueOf(LocalDateTime.of(2023, 10, 9, 22, 0, 0)));

    //         List<Hora> horas = new ArrayList<>();
    //         horas.add(hora1);
    //         horas.add(hora2);
            
    //         ArrayList<ArrayList<VerbaHora>> verbas = VerbaService.getVerbaFromHora(horas);
            
    //         assertEquals(2, verbas.size());
            
    //         assertEquals(2, verbas.get(1).size());
    //         assertEquals(VerbasEnum.HE75, verbas.get(0).get(0).getVerba());
    //         assertEquals(VerbasEnum.HE100, verbas.get(0).get(1).getVerba());
    //         assertEquals(7200, verbas.get(0).get(0).getDuration().toSeconds());
    //         assertEquals(7199, verbas.get(0).get(1).getDuration().toSeconds());

    //         assertEquals(2, verbas.get(1).size());
    //         assertEquals(VerbasEnum.HE75, verbas.get(1).get(0).getVerba());
    //         assertEquals(VerbasEnum.HE100, verbas.get(1).get(1).getVerba());
    //         assertEquals(7200, verbas.get(1).get(0).getDuration().toSeconds());
    //         assertEquals(7199, verbas.get(1).get(1).getDuration().toSeconds());
    //     }

}