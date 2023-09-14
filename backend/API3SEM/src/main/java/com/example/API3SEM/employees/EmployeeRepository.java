package com.example.API3SEM.employees;


import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,String> {
    //  List<Employees> findByNameAndMatricula(String name, String matricula);
}