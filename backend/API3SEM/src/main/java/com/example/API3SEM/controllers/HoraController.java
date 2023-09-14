package com.example.API3SEM.controllers;

import com.example.API3SEM.employees.Employee;
import com.example.API3SEM.employees.EmployeeRepository;
import com.example.API3SEM.hora.Hora;
import com.example.API3SEM.hora.HoraRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/hora")
@CrossOrigin(origins = "*")
public class HoraController {
    
    @Autowired
    private HoraRepository repository;
    private EmployeeRepository employeeRepository;

    @GetMapping("/{user_id}")
    public List<Hora> getHorasByUserId(@PathVariable String user_id) {
        Optional<Employee> employee = employeeRepository.findById(user_id);
        List<Hora> horas = repository.findByUsernameLancador(employee.get().getNome());
    
        return horas;
    }
    
    
}
