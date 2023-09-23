package com.example.API3SEM.controllers;

import com.example.API3SEM.hora.Hora;
import com.example.API3SEM.hora.HoraRepository;
import com.example.API3SEM.hora.HoraRequestDTO;
import com.example.API3SEM.hora.HoraResponseDTO;
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

    // Endpoint para criar uma hora extra
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<HoraResponseDTO> criarHoraExtra(@RequestBody HoraRequestDTO horaRequestDTO) {
        // Crie uma instância de Hora a partir dos dados recebidos no DTO
        Hora hora = new Hora(horaRequestDTO);

        // Salve a hora extra no banco de dados
        Hora horaCriada = horaRepository.save(hora);

        // Crie um DTO de resposta a partir da hora extra criada
        HoraResponseDTO horaResponseDTO = new HoraResponseDTO(horaCriada);

        return new ResponseEntity<>(horaResponseDTO, HttpStatus.CREATED);
    }

    // Outros endpoints e métodos do controlador (por exemplo, para listar, atualizar ou excluir horas extras) podem ser adicionados aqui.
}
