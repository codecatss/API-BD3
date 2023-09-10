package com.example.API3SEM.controllers;



import com.example.API3SEM.resultCenter.CenterResult;
import com.example.API3SEM.resultCenter.CenterResultRepository;
import com.example.API3SEM.resultCenter.CenterResultRequestDTO;
import com.example.API3SEM.resultCenter.CenterResultResponseDTO;
import java.util.List;
import java.util.Optional;

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

}
