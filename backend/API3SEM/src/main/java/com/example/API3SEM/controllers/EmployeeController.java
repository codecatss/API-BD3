package com.example.API3SEM.controllers;

import com.example.API3SEM.employees.Employee;
import com.example.API3SEM.employees.EmployeeRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.example.API3SEM.employees.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public Employee saveEmployee(@RequestBody EmployeeRequestDTO data) {
        try {
            Employee employeeData = new Employee(data);
            return repository.save(employeeData);
        } catch (Exception e) {
            Employee employeeData = new Employee(data);
            System.out.println(employeeData.getNome());
            throw new RuntimeException("Não foi possível Cadastrar o seu usuário, por favor verifique as informações " + e.getMessage());
        }
    }

}
