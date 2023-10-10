package API3SEM.utills.verbaService;

import java.sql.Timestamp; // Importe a classe correta para Timestamp
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
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
            Long tempo = Duration.between(hora.getData_hora_inicio().toInstant(), hora.getData_hora_fim().toInstant()).toSeconds();
            Integer duracao = Integer.parseInt(tempo.toString());
            verbas_temp.add(toVerbaHora(hora, VerbasEnum.SOBREAVISO, duracao));
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
                    verbas_temp.addAll(calcularVerbasNoturnas(hora, InicioDiurno, FimDiurno));
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        verbas.addAll(verbas_temp);
        return verbas;
    }

    private static List<VerbaHora> calcularVerbasDiurnas(Hora hora, LocalDateTime InicioDiurno, LocalDateTime FimDiurno) {

        List<VerbaHora> verbasDiurnas = new ArrayList<>();

        Long tempo = 0L;

            //Caso o tempo seja menor que 7200 segundos (2 horas)
        if(Duration.between(hora.getData_hora_inicio().toInstant(), hora.getData_hora_fim().toInstant()).toSeconds() < 7200){
            tempo = Duration.between(hora.getData_hora_inicio().toInstant(), hora.getData_hora_fim().toInstant()).toSeconds();
            verbasDiurnas.add(toVerbaHora(hora, VerbasEnum.HE75, tempo));
        }else{      
            //Caso o tempo seja maior que 7200 segundos (2 horas)

            verbasDiurnas.add(toVerbaHora(hora, VerbasEnum.HE75, 7200));
            Instant starteNewHora = hora.getData_hora_inicio().toInstant().plusSeconds(7201);

            if(!Timestamp.from(starteNewHora).after(Timestamp.valueOf(FimDiurno))){

                Integer duracao = 0;
                
                Hora newHora = new Hora();
                newHora.setData_hora_inicio(Timestamp.from(starteNewHora));
                
                if(hora.getData_hora_fim().after(Timestamp.valueOf(FimDiurno))){
                    tempo = Duration.between(starteNewHora, FimDiurno.toInstant(ZoneOffset.UTC)).toSeconds();
                    duracao = Integer.parseInt(tempo.toString());
                    verbasDiurnas.add(toVerbaHora(newHora, VerbasEnum.HE100, duracao));
                }else{
                    tempo = Duration.between(starteNewHora, hora.getData_hora_fim().toInstant()).toSeconds();
                    duracao = Integer.parseInt(tempo.toString());
                    verbasDiurnas.add(toVerbaHora(newHora, VerbasEnum.HE100, duracao));
                }
            }
        }
        return verbasDiurnas;
    }

    private static List<VerbaHora> calcularVerbasNoturnas(Hora hora, LocalDateTime InicioDiurno, LocalDateTime FimDiurno) {

        List<VerbaHora> verbasNoturnas = new ArrayList<>();
        
        if(hora.getData_hora_inicio().before(Timestamp.valueOf(FimDiurno))){
            verbasNoturnas.addAll(calcularVerbasDiurnas(hora, InicioDiurno, FimDiurno));
        }

        Hora newHora = new Hora();

        if(hora.getData_hora_inicio().before(Timestamp.valueOf(FimDiurno))){
            newHora.setData_hora_inicio(Timestamp.valueOf(FimDiurno));
        }else{
            newHora.setData_hora_inicio(hora.getData_hora_inicio());
        }

        Long tempo = Duration.between(newHora.getData_hora_inicio().toInstant(), hora.getData_hora_fim().toInstant()).toSeconds();

        if(!verbasNoturnas.isEmpty()){

            verbasNoturnas.add(toVerbaHora(newHora, VerbasEnum.HEN100, tempo));
            
        }else{

            if( tempo < 7200){
                verbasNoturnas.add(toVerbaHora(newHora, VerbasEnum.HEN70, tempo));
            }else{
                verbasNoturnas.add(toVerbaHora(newHora, VerbasEnum.HEN70, 7200));

                newHora.setData_hora_inicio(Timestamp.from(newHora.getData_hora_inicio().toInstant().plusSeconds(7200)));
                tempo = Duration.between(newHora.getData_hora_inicio().toInstant(), hora.getData_hora_fim().toInstant()).toSeconds();
                verbasNoturnas.add(toVerbaHora(newHora, VerbasEnum.HEN100, tempo));
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
}
