package API3SEM.repositories;


import API3SEM.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee,String> {
    List<Employee> findByMatriculaIn(List<String> matriculas);

    List<Employee> findByMatriculaNotIn(List<String> matriculas);
    //  List<Employees> findByNameAndMatricula(String name, String matricula);

    boolean existsByNome(String mokedEmployee);

    UserDetails findByMatricula(String matricula);

}