package API3SEM.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import API3SEM.entities.Integrante;

public interface IntegranteRepository extends JpaRepository<Integrante, String> {

    @Query("SELECT i FROM Integrante i WHERE i.integrantePk.matricula = :userid")  
    List<Integrante> getCodCrByMatriculaIntegrante(@Param("userid") String userid);

    List<Integrante> findByIntegrantePkMatricula(String userid);
}
