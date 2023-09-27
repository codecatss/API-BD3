package API3SEM.repositories;

import API3SEM.entities.Hora;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface HoraRepository extends JpaRepository<Hora,Integer> {

    List<Hora> findByLancador(String var);

    List<Hora> findByCodcr(String var);

    List<Hora> findByCnpj(String var);


}
