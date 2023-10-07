package API3SEM.utills.DAOS;

import API3SEM.entities.Hora;
import API3SEM.utills.DAOS.VerbaService;
import API3SEM.utills.VerbasEnum;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class VerbaServiceTest {

    @BeforeEach
    public void setUp() {
        // Inicialize o serviço com uma instância de VerbaRepository mock (se necessário)
        // Caso contrário, você pode usar uma instância real, dependendo do seu ambiente de teste.
        // verbaService = new VerbaService(verbaRepositoryMock);
    }

    @Test
    public void testGetVerbaFromHora() throws Exception {
        // Crie uma data para testar
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Timestamp timestamp = new Timestamp(sdf.parse("02/02/2002").getTime());

        // Crie um objeto Hora com a data de teste
        Hora hora = new Hora();
        hora.setData_hora_fim(timestamp);

        // Chame o método que você deseja testar
        List<VerbasEnum> verbas = VerbaService.getVerbaFromHora(hora);

        // Verifique se o resultado está correto
        assertEquals(1, verbas.size()); // Verifique se há um elemento na lista de verbas
        assertEquals(VerbasEnum.HE75, verbas.get(0)); // Verifique se a verba retornada é a esperada
    }
}