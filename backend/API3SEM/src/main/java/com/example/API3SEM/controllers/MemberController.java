package com.example.API3SEM.controllers;

import com.example.API3SEM.employees.Employee;
import com.example.API3SEM.employees.EmployeeRepository;
import com.example.API3SEM.employees.EmployeeRequestDTO;
import com.example.API3SEM.members.Member;
import com.example.API3SEM.members.MemberRepository;
import com.example.API3SEM.members.MemberRequestDTO;
import com.example.API3SEM.utills.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("member")
public class MemberController {

    @Autowired
    private MemberRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public List<Member> saveMembers(@RequestBody List<MemberRequestDTO> dataList) {
        List<Member> savedMembers = new ArrayList<>();

        try {
            for (MemberRequestDTO data : dataList) {
                Member memberData = new Member(data);
                savedMembers.add(repository.save(memberData));
            }
        } catch (Exception e) {
            throw new ApiException("Não foi possível cadastrar os membros, verifique as informações: " + e.getMessage());
        }

        return savedMembers;
    }
}


