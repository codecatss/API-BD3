package API3SEM.controllers;

import API3SEM.DTOS.HoraDTOs;
import API3SEM.DTOS.HoraDTOs.HoraRequestDTO;
import API3SEM.entities.Hora;
import API3SEM.repositories.ClientRepository;
import API3SEM.repositories.HoraRepository;
import API3SEM.utills.ApiException;
import API3SEM.utills.AprovacaoEnum;
import API3SEM.utills.TipoEnum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Null;
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
            saveHora(horaRequestDTO);
            return new ResponseEntity<>(horaRequestDTO, HttpStatus.CREATED);
        }
    }

    @GetMapping("/{var}/{filtro}") 
    public ResponseEntity filtredHours(@PathVariable String var, @PathVariable String filtro){
        List<Object> response = new ArrayList<>();
        List<Hora> horas = new ArrayList<>();
        
        List<Hora> horasFromRepository = null;
        if (filtro.equals("matricula")||filtro.equals("codigo_cr")||filtro.equals("cliente")) {

            if (filtro.equals("matricula")) {
                try {
                    if (!horaRepository.findByLancador(var).isEmpty()) {
                        horasFromRepository = horaRepository.findByLancador(var);
                        for (Hora hora : horasFromRepository) {
                           horas.add(hora); 
                        }
                    }else{
                        throw new ApiException("O usuário fornecido não possui horas lançadas");
                    }
                }catch (Exception e){
                    response.add(e.getMessage());
                }

            } else if (filtro.equals("codigo_cr")) {
                try{
                    if(!horaRepository.findByCodcr(var).isEmpty()) {
                        horasFromRepository = horaRepository.findByCodcr(var);
                        for (Hora hora : horasFromRepository) {
                           horas.add(hora); 
                        }
                    }else {
                        throw new ApiException("O CR fornecido não possui horas registradas");
                    }
                }catch (Exception e){
                    response.add(e.getMessage());
                }

            } else if (filtro.equals("cliente")) {
                try {
                    if(!horaRepository.findByCnpj(var).isEmpty()) {
                        horasFromRepository = horaRepository.findByCnpj(var);
                        for (Hora hora : horasFromRepository) {
                           horas.add(hora); 
                        }
                    }else {
                        throw new ApiException("O cliente fornecido não possui horas registradas");
                    }   
                }catch (Exception e){
                    throw new ApiException(e.getMessage());
                }
            }
        }
        else {
            String error = "O valor fornecido de filtro '" + filtro + "' não atende a nenhum dos tipos permitidos. Filtro deve ser 'matricula', 'codigo_cr' ou 'cliente'";
            response.add(error);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        response.addAll(horas);
        return ResponseEntity.ok(response);          
    }


    @GetMapping
    public ResponseEntity<List<HoraDTOs>> listarHoras() {
        List<Hora> horas = horaRepository.findAll();

        List<HoraDTOs> horasResponse = horas.stream()
                .map(HoraDTOs::new)
                .collect(Collectors.toList());

        return new ResponseEntity<>(horasResponse, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public Hora updateHora(@PathVariable Integer id, @RequestBody HoraDTOs.HoraRequestDTO partialData) {
        Hora hora = horaRepository.findById(id).orElseThrow(() -> new RuntimeException("Hora não encontrada com o id: " + id));

        try {
            if (partialData.status_aprovacao() != null) {
                if (partialData.status_aprovacao().equals(AprovacaoEnum.APROVADO_GESTOR.name())) {
                    hora.setStatus_aprovacao(partialData.status_aprovacao());
                }
                else if (partialData.status_aprovacao().equals(AprovacaoEnum.NEGADO_GESTOR.name())){
                    if(partialData.justificativa_negacao() != null) {
                        hora.setStatus_aprovacao(partialData.status_aprovacao());
                        hora.setJustificativa_negacao(partialData.justificativa_negacao());
                    }else{
                        throw new ApiException("Deve-se colocar uma justificativa em caso de negação >:|");
                        }
                } else{
                    throw new ApiException("Deve-se colocar um status válido para a hora! >:|");
                }
            }
            if (partialData.matricula_gestor() != null) {
                hora.setMatricula_gestor(partialData.matricula_gestor());
            }
            if (partialData.data_modificacao() != null) {
                hora.setData_modificacao(partialData.data_modificacao());
            }
        } catch (Exception e) {
            throw new ApiException("Erro ao atualizar hora: " + e.getMessage());
        }

        horaRepository.save(hora);
        return hora;
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
    
    private void saveHora(HoraRequestDTO hora){
        List<Timestamp> hourRange = new ArrayList<>();
        hourRange.add(hora.data_hora_inicio());
        hourRange.add(hora.data_hora_fim());

        Hora hour = new Hora();

        hour.setLancador(hora.lancador());
        hour.setData_hora_inicio(hourRange.get(0));
        hour.setData_hora_fim(hourRange.get(1));
        if(hora.tipo().contains("ex")){
            hour.setTipo(TipoEnum.EXTRA.name());
        }else {
            hour.setTipo(TipoEnum.SOBREAVISO.name());
        }
        hour.setJustificativa(hora.justificativa());
        hour.setProjeto(hora.projeto());
        hour.setSolicitante(hora.solicitante());
        hour.setCodcr(hora.codcr());
        hour.setCnpj(hora.cnpj());
        hour.setStatus_aprovacao(AprovacaoEnum.PENDENTE.name());



        if(hora.justificativa_negacao()!= null && !hora.justificativa_negacao().equals("")){
            hour.setJustificativa_negacao(hora.justificativa_negacao());
        }

        if(hora.matricula_gestor() != null && !hora.matricula_gestor().equals("")){
            hour.setMatricula_gestor(hora.matricula_gestor());
        }

        hour.setData_lancamento(new Timestamp(System.currentTimeMillis()));

        hour.setData_modificacao(new Timestamp(System.currentTimeMillis()));
        horaRepository.save(hour);
    }
}