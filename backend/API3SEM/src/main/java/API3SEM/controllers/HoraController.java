package API3SEM.controllers;

import API3SEM.DTOS.HoraDTOs;
import API3SEM.entities.Hora;
import API3SEM.repositories.HoraRepository;
import API3SEM.utills.ApiException;
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
    public ResponseEntity<?> criarHoraExtra(@RequestBody HoraDTOs.HoraRequestDTO horaRequestDTO) {
        if (horaRequestDTO.data_hora_inicio().after(horaRequestDTO.data_hora_fim())) {
            throw new ApiException("A hora de início não pode ser maior que a hora de fim.");
        }

        Hora hora = new Hora(horaRequestDTO);

        Hora horaCriada = horaRepository.save(hora);

        HoraDTOs horaResponseDTO = new HoraDTOs(horaCriada);

        return new ResponseEntity<>(horaResponseDTO, HttpStatus.CREATED);
    }



    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<HoraDTOs>> listarHoras() {
        List<Hora> horas = horaRepository.findAll();

        List<HoraDTOs> horasResponse = horas.stream()
                .map(HoraDTOs::new)
                .collect(Collectors.toList());

        return new ResponseEntity<>(horasResponse, HttpStatus.OK);
    }


}