package com.example.API3SEM.controllers;



import com.example.API3SEM.members.Member;
import com.example.API3SEM.members.MemberRepository;
import com.example.API3SEM.employees.EmployeeRepository;

import com.example.API3SEM.members.MemberRequestDTO;
import com.example.API3SEM.resultCenter.CenterResult;
import com.example.API3SEM.resultCenter.CenterResultRepository;
import com.example.API3SEM.resultCenter.CenterResultRequestDTO;
import com.example.API3SEM.resultCenter.CenterResultResponseDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.example.API3SEM.employees.Employee;
import com.example.API3SEM.utills.StatusEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("cr")
public class CenterResultController {
    @Autowired
    private CenterResultRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public CenterResult saveCenterResult(@RequestBody CenterResultRequestDTO data) {
        try {
            CenterResult centerResultData = new CenterResult(data);
            return repository.save(centerResultData);
        } catch (Exception e) {
            CenterResult centerResultData = new CenterResult(data);
            System.out.println(centerResultData.getNome());
            throw new RuntimeException("Não foi possível Cadastrar o centro de resulto, por favor verifique as informações " + e.getMessage());
        }

    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<CenterResultResponseDTO> getAll(){


        List<CenterResultResponseDTO> centerResultList = repository.findAll().stream().map(CenterResultResponseDTO::new ).toList();
        return centerResultList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{codigoCr}")
    public ResponseEntity<CenterResult> getOne(@PathVariable String codigoCr) {
        Optional<CenterResult> optionalCenterResult = repository.findById(codigoCr);

        if (optionalCenterResult.isPresent()) {
            CenterResult centerResult = optionalCenterResult.get();
            return ResponseEntity.ok(centerResult);
        } else {
            throw new RuntimeException("Funcionário não encontrado");
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("/{codigoCr}")
    public CenterResult updateCR(@PathVariable String codigoCr, @RequestBody CenterResultRequestDTO partialData) {
        CenterResult cr = repository.findById(codigoCr).orElseThrow(() -> new RuntimeException("Centro de resultado não encontrado com o código: " + codigoCr));

        try {
            if (partialData.nome() != null) {
                cr.setNome(partialData.nome());
            }
            if (partialData.sigla() != null) {
                cr.setSigla(partialData.sigla());
            }
            if (partialData.statusCr() != null) {
                cr.setStatusCr(partialData.statusCr());
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar o centro de resultado: " + e.getMessage());
        }

        repository.save(cr);
        return cr;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("/enable/{codigoCr}")
    public CenterResult enableCenterResult(@PathVariable String codigoCr) {
        CenterResult cr = repository.findById(codigoCr).orElseThrow(() -> new RuntimeException("Centro de resultado não encontrado com o código: " + codigoCr));

        try {
            cr.setStatusCr(StatusEnum.ativo);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao ativar o centro de resultado: " + e.getMessage());
        }

        repository.save(cr);
        return cr;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{codigoCr}")
    public CenterResult softDeleteCenterResult(@PathVariable String codigoCr) {
        CenterResult cr = repository.findById(codigoCr).orElseThrow(() -> new RuntimeException("Centro de resultado não encontrado com o código: " + codigoCr));

        try {
            cr.setStatusCr(StatusEnum.inativo);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao inativar o centro de resultado: " + e.getMessage());
        }

        repository.save(cr);
        return cr;
    }


    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private EmployeeRepository employeeRepository;



    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/{codigoCr}/member")
    public List<Member> saveMembers(@PathVariable String codigoCr, @RequestBody List<MemberRequestDTO> dataList) {
        List<Member> savedMembers = new ArrayList<>();

        try {
            for (MemberRequestDTO data : dataList) {
                Member memberData = new Member(data);
                memberData.setCodCr(codigoCr); // Defina o código CR no membro
                savedMembers.add(memberRepository.save(memberData));
            }
        } catch (Exception e) {
            throw new RuntimeException("Não foi possível cadastrar os membros, verifique as informações: " + e.getMessage());
        }

        return savedMembers;
    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{codigoCr}/member")
    public ResponseEntity<String> deleteMembers(@PathVariable String codigoCr) {
        try {
            List<Member> membersToDelete = memberRepository.findByCodCr(codigoCr);

            if (!membersToDelete.isEmpty()) {
                memberRepository.deleteAll(membersToDelete);
                return ResponseEntity.ok("Membros removidos com sucesso.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            throw new RuntimeException("Não foi possível remover os membros: " + e.getMessage());
        }
    }




}
