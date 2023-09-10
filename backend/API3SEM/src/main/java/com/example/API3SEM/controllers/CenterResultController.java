package com.example.API3SEM.controllers;



import com.example.API3SEM.resultCenter.CenterResult;
import com.example.API3SEM.resultCenter.CenterResultRepository;
import com.example.API3SEM.resultCenter.CenterResultRequestDTO;
import com.example.API3SEM.resultCenter.CenterResultResponseDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;


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
   

}
