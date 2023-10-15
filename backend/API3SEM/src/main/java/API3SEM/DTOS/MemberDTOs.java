package API3SEM.DTOS;

import API3SEM.entities.Member;

public record MemberDTOs(String employee, String centerResult, Boolean gestor) {

    public MemberDTOs(Member member) {
        this(member.getMatriculaIntegrante(), member.getCodCr(), member.getGestor());
    }

    public static record MemberRequestDTO(String matriculaIntegrante, String codCr, Boolean gestor) {
    }
}
