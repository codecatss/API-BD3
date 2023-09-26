package com.example.API3SEM.controllers;

import com.example.API3SEM.entities.Member;
import com.example.API3SEM.repositories.MemberRepository;
import com.example.API3SEM.DTOS.MemberDTOs;
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
    public List<Member> saveMembers(@RequestBody List<MemberDTOs.MemberRequestDTO> dataList) {
        List<Member> savedMembers = new ArrayList<>();

        try {
            for (MemberDTOs.MemberRequestDTO data : dataList) {
                Member memberData = new Member(data);
                savedMembers.add(repository.save(memberData));
            }
        } catch (Exception e) {
            throw new ApiException("Não foi possível cadastrar os membros, verifique as informações: " + e.getMessage());
        }

        return savedMembers;
    }
}


