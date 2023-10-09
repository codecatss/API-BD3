package API3SEM.utills.verbaService;

import java.time.Duration;

import API3SEM.utills.VerbasEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class VerbaHora {
    private Duration duration;
    private VerbasEnum verba;
}
