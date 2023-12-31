package API3SEM.utills.Service;

import java.time.Duration;

import API3SEM.utills.VerbasEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VerbaHora {
    Integer idHoraMae;
    private Duration duration;
    private Long duracao;
    private String verba;

    public void fixDuracao() {
        this.duracao = duration.toMinutes();
    }
}
