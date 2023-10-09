package API3SEM.utills.verbaService;

import java.sql.Timestamp; // Importe a classe correta para Timestamp
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import API3SEM.entities.Hora;
import API3SEM.repositories.HoraRepository;
import API3SEM.repositories.VerbaRepository;
import API3SEM.utills.TipoEnum;
import API3SEM.utills.VerbasEnum;

@Service
public class VerbaManager {

    private final VerbaRepository verbaRepository;
    private final HoraRepository horaRepository;

    private static List<VerbaHora> verbas = new ArrayList<VerbaHora>();

    @Autowired
    public VerbaManager(VerbaRepository verbaRepository, HoraRepository horaRepository) {
        this.verbaRepository = verbaRepository;
        this.horaRepository = horaRepository;

    }

    public static List<VerbaHora> getVerbaFromHora(Hora hora) {
        verbas.clear();
        List<VerbaHora> verbas_temp = new ArrayList<>();

        if (hora.getTipo().equalsIgnoreCase(TipoEnum.SOBREAVISO.name())) {
            verbas_temp.add(toVerbaHoraFim(hora, VerbasEnum.SOBREAVISO, 0));
        }
        else {

            try {
                LocalDateTime localDateTimeInicio = hora.getData_hora_inicio().toLocalDateTime();
                LocalDateTime localDateTimeFim = hora.getData_hora_fim().toLocalDateTime();

                LocalDateTime InicioDiurno = localDateTimeInicio.withHour(6).withMinute(0).withSecond(0);
                LocalDateTime FimDiurno = localDateTimeInicio.withHour(22).withMinute(0).withSecond(0);

                if (localDateTimeInicio.isBefore(FimDiurno) && localDateTimeFim.isAfter(InicioDiurno)) {
                    verbas_temp.addAll(calcularVerbasDiurnas(hora, InicioDiurno, FimDiurno));
                }else{
                    verbas_temp.addAll(calcularVerbasNoturnas(hora, FimDiurno));
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        verbas.addAll(verbas_temp);
        return verbas;
    }

    private static List<VerbaHora> calcularVerbasDiurnas(Hora hora, LocalDateTime limiteInicio, LocalDateTime limiteFim) {

        List<VerbaHora> verbasDiurnas = new ArrayList<>();

        if(Duration.between(hora.getData_hora_inicio().toInstant(), hora.getData_hora_fim().toInstant()).toSeconds() < 7200){
            long tempo = Duration.between(hora.getData_hora_inicio().toInstant(), hora.getData_hora_fim().toInstant()).toSeconds();
            verbasDiurnas.add(toVerbaHora(hora, VerbasEnum.HE75, tempo));
        }else{
            verbasDiurnas.add(toVerbaHora(hora, VerbasEnum.HE75, 7200));
            Instant fim = hora.getData_hora_inicio().toInstant().plusSeconds(7201);
            if(!Timestamp.from(fim).after(Timestamp.valueOf(limiteFim))){
                Long tempo = Duration.between(hora.getData_hora_inicio().toInstant().plusSeconds(7201), hora.getData_hora_fim().toInstant()).toSeconds();
                Integer inicio = Integer.parseInt(tempo.toString());
                Hora newHora = new Hora();
                newHora.setData_hora_inicio(Timestamp.from(hora.getData_hora_inicio().toInstant().plusSeconds(7201)));
                verbasDiurnas.add(toVerbaHora(newHora, VerbasEnum.HE100, inicio));
            }
        }


        return verbasDiurnas;
    }

    private static List<VerbaHora> calcularVerbasNoturnas(Hora hora, LocalDateTime FimDiurno) {
        List<VerbaHora> verbasNoturnas = new ArrayList<>();

        LocalDateTime localDateTimeInicio = hora.getData_hora_inicio().toLocalDateTime();
        LocalDateTime localDateTimeFim = hora.getData_hora_fim().toLocalDateTime();

        LocalDateTime InicioDiurno = localDateTimeInicio.withHour(6).withMinute(0).withSecond(0);

        if(hora.getData_hora_inicio().before(Timestamp.valueOf(FimDiurno))){
            calcularVerbasDiurnas(hora, InicioDiurno, FimDiurno);
        }else{
            if(verbas.size()<1){
                Long tempo = Duration.between(hora.getData_hora_inicio().toInstant(), hora.getData_hora_fim().toInstant()).toSeconds();
                if( Long.max(tempo, 7200) == 7200 ){
                    verbasNoturnas.add(toVerbaHora(hora, VerbasEnum.HEN70, tempo));
                }else{
                    Hora newHora = new Hora();
                    newHora.setData_hora_inicio(hora.getData_hora_inicio());
                    verbasNoturnas.add(toVerbaHora(newHora, VerbasEnum.HEN70, 7200));

                    newHora.setData_hora_inicio(Timestamp.from(hora.getData_hora_inicio().toInstant().plusSeconds(7201)));
                    verbasNoturnas.add(toVerbaHora(newHora, VerbasEnum.HEN100, tempo-7200));
                }
            }else{
                Long segundosInicio = Duration.between(hora.getData_hora_inicio().toInstant(), FimDiurno).toSeconds();
                Integer inicio = Integer.parseInt(segundosInicio.toString());
                verbasNoturnas.add(toVerbaHora(hora, VerbasEnum.HEN100, inicio));
            }
        }

        return verbasNoturnas;
    }

    private static VerbaHora makeVerbaHora(VerbasEnum verba, long segundos) {
        Duration duration = Duration.ofSeconds(segundos);
        return new VerbaHora(duration, verba);
    }

    private static VerbaHora toVerbaHora(Hora hora, VerbasEnum verba, long segundos) {

        return makeVerbaHora(verba, Duration.between(hora.getData_hora_inicio().toInstant(), hora.getData_hora_inicio().toInstant().plusSeconds(segundos)).toSeconds());
    }

    private static VerbaHora toVerbaHoraFim(Hora hora, VerbasEnum verba, Integer segundos) {

        Hora newHora = new Hora();
        newHora.setData_hora_inicio(Timestamp.from(hora.getData_hora_inicio().toInstant().plusSeconds(segundos)));
        newHora.setData_hora_fim(hora.getData_hora_fim());
        return makeVerbaHora( verba, Duration.between(newHora.getData_hora_inicio().toInstant(), hora.getData_hora_fim().toInstant()).toSeconds());
    }
}
