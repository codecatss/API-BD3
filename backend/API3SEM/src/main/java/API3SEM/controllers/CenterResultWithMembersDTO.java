package API3SEM.controllers;

import API3SEM.entities.CenterResult;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CenterResultWithMembersDTO {
    private CenterResult centerResult;
    private List<MemberDTO> members;
}
