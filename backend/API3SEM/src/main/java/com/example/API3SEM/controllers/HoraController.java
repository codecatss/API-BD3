package com.example.API3SEM.controllers;

import com.example.API3SEM.hora.*;
import com.example.API3SEM.utills.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;




@RestController
@RequestMapping("/hora")
public class HoraController {

    private final HoraRepository horaRepository;

    @Autowired
    public HoraController(HoraRepository horaRepository) {
        this.horaRepository = horaRepository;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<?> criarHoraExtra(@RequestBody HoraRequestDTO horaRequestDTO) {
        if (horaRequestDTO.data_hora_inicio().after(horaRequestDTO.data_hora_fim())) {
            throw new ApiException("A hora de início não pode ser maior que a hora de fim.");
        }

        Hora hora = new Hora(horaRequestDTO);

        Hora horaCriada = horaRepository.save(hora);

        HoraResponseDTO horaResponseDTO = new HoraResponseDTO(horaCriada);

        return new ResponseEntity<>(horaResponseDTO, HttpStatus.CREATED);
    }



    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<HoraResponseDTO>> listarHoras() {
        List<Hora> horas = horaRepository.findAll(); // Isso irá buscar todas as horas no banco de dados

        // Mapeie as horas para objetos DTO de resposta
        List<HoraResponseDTO> horasResponse = horas.stream()
                .map(HoraResponseDTO::new)
                .collect(Collectors.toList());

        return new ResponseEntity<>(horasResponse, HttpStatus.OK);
    }


}