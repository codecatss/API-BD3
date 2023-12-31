package API3SEM.repositories;

import API3SEM.entities.Member;
import API3SEM.entities.members.MemberId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, MemberId> {
    List<Member> findByCodCr(String codigoCr);

    List<Member> findByCodCrAndMatriculaIntegranteIn(String codigoCr, List<String> matriculas);
}
