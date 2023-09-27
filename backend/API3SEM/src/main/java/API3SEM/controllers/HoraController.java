package API3SEM.controllers;

import API3SEM.DTOS.HoraDTOs;
import API3SEM.DTOS.HoraDTOs.HoraRequestDTO;
import API3SEM.entities.Hora;
import API3SEM.repositories.ClientRepository;
import API3SEM.repositories.HoraRepository;
import API3SEM.utills.ApiException;
import API3SEM.utills.TipoEnum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;




@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/hora")
public class HoraController {

    private final HoraRepository horaRepository;

    @Autowired
    public HoraController(HoraRepository horaRepository) {
        this.horaRepository = horaRepository;
    }

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping
    public ResponseEntity<?> criarHoraExtra(@RequestBody HoraDTOs.HoraRequestDTO horaRequestDTO) {
        String msg = null;

        if(validacaoHora(horaRequestDTO).contains("Erro")){
            msg = "Erro: " +" "+ validacaoHora(horaRequestDTO);
            throw new ApiException(msg);
        }
        else{
            saveHora(horaRequestDTO, TipoEnum.SOBREAVISO);
            return new ResponseEntity<>(horaRequestDTO, HttpStatus.CREATED);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(msg);
    }



    @GetMapping
    public ResponseEntity<List<HoraDTOs>> listarHoras() {
        List<Hora> horas = horaRepository.findAll();

        List<HoraDTOs> horasResponse = horas.stream()
                .map(HoraDTOs::new)
                .collect(Collectors.toList());

        return new ResponseEntity<>(horasResponse, HttpStatus.OK);
    }




    private String validacaoHora(HoraRequestDTO hora){

        List<Timestamp> hourRange = new ArrayList<>();
        hourRange.add(hora.data_hora_inicio());
        hourRange.add(hora.data_hora_fim());

        String cnpjCliente = hora.cnpj();

        if (!clientRepository.existsById(cnpjCliente)) {
            return "Erro: O cliente fornecido não esta cadastrado no sistema";
        }
        if (hourRange.get(0).after(hourRange.get(1))) {
            return "Erro: O final da hora não pode anteceder seu início";
        }
        return"";
    }
    
    private void saveHora(HoraRequestDTO hora, TipoEnum tipo){
        List<Timestamp> hourRange = new ArrayList<>();
        hourRange.add(hora.data_hora_inicio());
        hourRange.add(hora.data_hora_fim());

        Hora hour = new Hora();
        hour.setLancador(hora.lancador());
        hour.setData_hora_inicio(hourRange.get(0));
        hour.setData_hora_fim(hourRange.get(1));
        hour.setTipo(tipo.name());
        hour.setJustificativa(hora.justificativa());
        hour.setProjeto(hora.projeto());
        hour.setSolicitante(hora.solicitante());
        hour.setCodcr(hora.codcr());
        hour.setCnpj(hora.cnpj());

        horaRepository.save(hour);
    }
}