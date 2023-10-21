package API3SEM.repositories;


import API3SEM.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee,String> {
    List<Employee> findByMatriculaIn(List<String> matriculas);

    List<Employee> findByMatriculaNotIn(List<String> matriculas);
    //  List<Employees> findByNameAndMatricula(String name, String matricula);

    boolean existsByNome(String mokedEmployee);


}