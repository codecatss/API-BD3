package API3SEM.API3SEM.controllers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
    private List<String> matriculaIntegrante;
    private Boolean gestor;
    private String nome;
}
