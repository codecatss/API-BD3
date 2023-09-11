package com.example.API3SEM.controllers;

import com.example.API3SEM.employees.Employee;
import com.example.API3SEM.employees.EmployeeRepository;
import com.example.API3SEM.employees.EmployeeRequestDTO;
import com.example.API3SEM.members.Member;
import com.example.API3SEM.members.MemberRepository;
import com.example.API3SEM.members.MemberRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("member")
public class MemberController {

    @Autowired
    private MemberRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public Member saveMember(@RequestBody MemberRequestDTO data) {
        try {
            Member memberData = new Member(data);
            return repository.save(memberData);
        } catch (Exception e) {
            Member employeeData = new Member(data);
            throw new RuntimeException("Não foi possível Cadastrar o seu usuário, por favor verifique as informações " + e.getMessage());
        }
    }


}
