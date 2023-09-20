package com.example.API3SEM.controllers;

import com.example.API3SEM.client.ClientRepository;
import com.example.API3SEM.hora.Hora;
import com.example.API3SEM.hora.HoraRepository;
import com.example.API3SEM.hora.HoraRequestDTO;
import com.example.API3SEM.hora.HoraResponseDTO;
import com.example.API3SEM.hora.Extra.CompoundHoraDTO;
import com.example.API3SEM.utills.ApiException;
import com.example.API3SEM.utills.TipoEnum;

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
@RequestMapping("/hour")
@CrossOrigin(origins = "*")
public class HoraController {
    
    @Autowired
    private HoraRepository horaRepository;

    @Autowired
    private ClientRepository clientRepository;

    @GetMapping
    public List<HoraResponseDTO> allHours(){
        List<Hora> response = horaRepository.findAll();
        List<HoraResponseDTO> horas;
        horas = response.stream()
                    .map(this::convertToHoraResponseDTO)
                    .collect(Collectors.toList());
        return horas;
    }

    @GetMapping("/{var}/{filtro}") 
    public ResponseEntity<List<Object>> filtredHours(@PathVariable String var, @PathVariable String filtro){
        List<Object> response = new ArrayList<>();
        List<HoraResponseDTO> horas = new ArrayList<>();
        
        List<Hora> horasFromRepository = null;
        if (filtro.equals("matricula")||filtro.equals("codigo_cr")||filtro.equals("cliente")) {

            if (filtro.equals("matricula")) {
                try {
                    if (!horaRepository.findByLancador(var).isEmpty()) {
                        horasFromRepository = horaRepository.findByLancador(var);
                        horas = horasFromRepository.stream()
                                .map(this::convertToHoraResponseDTO)
                                .collect(Collectors.toList());
                    }else{
                        response.add("O usuário fornecido não possui horas lançadas");
                    }
                }catch (Exception e){
                    response.add(e.getMessage());
                }

            } else if (filtro.equals("codigo_cr")) {
                try{
                    if(!horaRepository.findByCodcr(var).isEmpty()) {
                        horasFromRepository = horaRepository.findByCodcr(var);
                        horas = horasFromRepository.stream()
                                .map(this::convertToHoraResponseDTO)
                                .collect(Collectors.toList());
                    }else {
                        response.add("O CR fornecido não possui horas registradas");
                    }
                }catch (Exception e){
                    response.add(e.getMessage());
                }

            } else if (filtro.equals("cliente")) {
                try {
                    if(!horaRepository.findByCnpj(var).isEmpty()) {
                        horasFromRepository = horaRepository.findByCnpj(var);
                        horas = horasFromRepository.stream()
                                .map(this::convertToHoraResponseDTO)
                                .collect(Collectors.toList());
                    }else {
                        response.add("O cliente fornecido não possui horas registradas");
                    }   
                }catch (Exception e){
                    response.add(e.getMessage());
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


    @PostMapping("") //2023-12-1-15-15&2023-12-1-15-45  -  yyyy-mm-dd-hh-mm&yyyy-mm-dd-hh-mm
    public ResponseEntity putHour(@RequestBody CompoundHoraDTO compoundHoraDTO){

        String msg = null;

        HoraRequestDTO hora = compoundHoraDTO.sobreaviso();   

        if(compoundHoraDTO.extas()==null) {

            if(validacaoHora(hora, false, null).contains("Erro")){
                msg = "Erro na seguinte hora: " + hora.intervalo() +" "+ validacaoHora(hora, false, null);
                throw new ApiException(msg);
            }
            saveHora(hora, TipoEnum.SOBREAVISO, null);
        }
        else{
            
            List<Timestamp> hourRange = new ArrayList<>();
                for (String str : Arrays.asList(hora.intervalo().split("&"))) {
                    hourRange.add(toTimestamp(str.split("-")));
                }
            Timestamp startTime = hourRange.get(0);
            Timestamp endTime = hourRange.get(1);

            List<Timestamp> hourExtra = new ArrayList<>();
            for(HoraRequestDTO extra : compoundHoraDTO.extas()){
                for (String str : Arrays.asList(extra.intervalo().split("&"))) {
                    hourExtra.add(toTimestamp(str.split("-")));
                }
                if(startTime.after(hourExtra.get(0))||endTime.before(hourExtra.get(1))){
                    throw new ApiException("Erro: erro no intervalo");
                }
                if(validacaoHora(extra, true, hora).contains("Erro")){
                    msg = "Erro na seguinte hora: " + extra.intervalo() +" "+ validacaoHora(extra, true, hora);
                    throw new ApiException(msg);
                }
            }
        }

        if(validacaoHora(hora, false, null).contains("Erro")){
            msg = validacaoHora(hora,false, null);
            throw new ApiException(msg);
        }
        saveHora(hora, TipoEnum.SOBREAVISO, null);
        for (HoraRequestDTO extra : compoundHoraDTO.extas()) {
            saveHora(extra, TipoEnum.EXTRA, hora);  
        }
        msg = "Horas registradas";
        return ResponseEntity.status(HttpStatus.CREATED).body(msg);       
    }
        

    /**
     * converte uma strig no formato "yyyy-mm-dd-hh-mm" para um instancia de Timestamp
     * @param list 
     * @return Timestamp
     */
    private Timestamp toTimestamp(String[] list){
        Timestamp hour;
        String str = list[0]+"-"+list[1]+"-"+list[2]+" "+list[3]+":"+list[4] + ":00";
        hour = Timestamp.valueOf(str);
        return hour;
    }
    
    private HoraResponseDTO convertToHoraResponseDTO(Hora hora) {
        HoraResponseDTO response = new HoraResponseDTO(
            String.valueOf(hora.getId()),       //id
            hora.getCodcr(),                    // code_cr
            hora.getLancador(),                 // matricula_lancador
            hora.getCnpj(),                     // cnpj
            hora.getData_hora_inicio(),         // data_hora_inicio
            hora.getData_hora_fim(),            // data_hora_fim
            hora.getTipo(),                     // tipo
            hora.getJustificativa(),            // justificativa_lancamento
            hora.getProjeto(),                  // projeto
            hora.getGestor(),                   // gestor
            hora.getJustificativa_negacao(),    // justificativa_negacao
            hora.getStatus_aprovacao(),         // status_aprovacao
            hora.getSolicitante()               // solicitante_lancamento
        );
        
        return response;
    }

    private String validacaoHora(HoraRequestDTO hora, boolean extra, HoraRequestDTO sobreavisoHora){

        List<Timestamp> hourRange = new ArrayList<>();
        for (String str : Arrays.asList(hora.intervalo().split("&"))) {
            hourRange.add(toTimestamp(str.split("-")));
        }

        String cnpjCliente;
        if(extra&&hora.cnpj().isEmpty()){
            cnpjCliente = sobreavisoHora.cnpj();
        }
        else{
            cnpjCliente = hora.cnpj();
        }
        if (!clientRepository.existsById(cnpjCliente)) {
            return "Erro: O cliente fornecido não esta cadastrado no sistema";
        }
        if (hourRange.get(0).after(hourRange.get(1))) {
            return "Erro: O final da hora não pode anteceder seu início";
        }
        return"";
    }
    
    private void saveHora(HoraRequestDTO hora, TipoEnum tipo, HoraRequestDTO sobreaviso){
        List<Timestamp> newExtra = new ArrayList<>();
        for (String str : Arrays.asList(hora.intervalo().split("&"))) {
            newExtra.add(toTimestamp(str.split("-")));
        }
        Hora hour = new Hora();
        hour.setLancador(hora.matricula_lancador());
        hour.setData_hora_inicio(newExtra.get(0));
        hour.setData_hora_fim(newExtra.get(1));
        hour.setTipo(tipo.name());
        if(tipo.equals(TipoEnum.EXTRA)){
            hour.setJustificativa(sobreaviso.justificativa_lan());
            hour.setProjeto(sobreaviso.projeto());
            hour.setProjeto(sobreaviso.projeto());
            hour.setSolicitante(sobreaviso.solicitante());
            hour.setCodcr(sobreaviso.codigo_cr());
            hour.setCnpj(sobreaviso.cnpj());
        } else{
            hour.setJustificativa(hora.justificativa_lan());
            hour.setProjeto(hora.projeto());
            hour.setProjeto(hora.projeto());
            hour.setSolicitante(hora.solicitante());
            hour.setCodcr(hora.codigo_cr());
            hour.setCnpj(hora.cnpj());

        }
        horaRepository.save(hour);
    }

}