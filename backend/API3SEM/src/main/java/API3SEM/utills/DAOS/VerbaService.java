package API3SEM.utills.DAOS;

import java.sql.Timestamp; // Importe a classe correta para Timestamp
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import API3SEM.entities.Hora;
import API3SEM.repositories.VerbaRepository;
import API3SEM.utills.VerbasEnum;

@Service
public class VerbaService {

    private final VerbaRepository verbaRepository;

    @Autowired
    public VerbaService(VerbaRepository verbaRepository) {
        this.verbaRepository = verbaRepository;
    }

    public static List<VerbasEnum> getVerbaFromHora(Hora hora) {
        List<VerbasEnum> verbas = new ArrayList<>();

        // Implemente a lógica de decisão com base na hora aqui
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            Date doismil = sdf.parse("01/01/2002"); // Data no formato correto
            Timestamp timestampDoismil = new Timestamp(doismil.getTime());

            if (hora.getData_hora_fim().after(timestampDoismil)) {
                verbas.add(VerbasEnum.HE75);
            } else {
                // Outra decisão com base na hora
                verbas.add(VerbasEnum.HE100);
            }
        } catch (ParseException e) {
            // Trate exceções de análise de data aqui, se necessário
            e.printStackTrace();
        }

        return verbas;
    }
}
