package com.example.API3SEM.controllers;

import com.example.API3SEM.hora.Hora;
import com.example.API3SEM.hora.HoraRepository;
import com.example.API3SEM.hora.HoraRequestDTO;
import com.example.API3SEM.hora.HoraResponseDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
    private HoraRepository repository;

    @GetMapping
    public List<HoraResponseDTO> allHours(){
        List<Hora> response = repository.findAll();
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
                horasFromRepository = repository.findByLancador(var);
                horas = horasFromRepository.stream()
                    .map(this::convertToHoraResponseDTO)
                    .collect(Collectors.toList());
            } else if (filtro.equals("codigo_cr")) {
                horasFromRepository = repository.findByCodcr(var);
                horas = horasFromRepository.stream()
                    .map(this::convertToHoraResponseDTO)
                    .collect(Collectors.toList());
            } else if (filtro.equals("cliente")) {
                horasFromRepository = repository.findByCnpj(var);
                horas = horasFromRepository.stream()
                    .map(this::convertToHoraResponseDTO)
                    .collect(Collectors.toList());
            }
        }
        else {
            String error = "O valor fornecido de filtro '" + filtro + "' não atende a nenhum dos tipos permitidos\nFiltro deve ser 'matricula', 'codigo_cr' ou 'cliente'";
            response.add(error);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        response.addAll(horas);
        return ResponseEntity.ok(response);          
    }


    @PostMapping("/{strHourRange}") //2023-12-1-15-15&2023-12-1-15-45  -  yyyy-mm-dd-hh-mm&yyyy-mm-dd-hh-mm
    public String putHour(@PathVariable String strHourRange, @RequestBody HoraRequestDTO horaRequestDTO){

        String msg = null;

        try{

            List<Timestamp> hourRange = new ArrayList<>();
            for(String str : Arrays.asList(strHourRange.split("&"))){
                hourRange.add(toTimestamp(str.split("-")));
            }
            System.out.println(horaRequestDTO.justificativa_lan());
            Hora hour = new Hora();
            if(10>=stringToInteger(horaRequestDTO.cnpj())){
                hour.setCodcr(horaRequestDTO.codigo_cr());
                hour.setLancador(horaRequestDTO.matricula_lancador());
                hour.setCnpj(horaRequestDTO.cnpj());
                hour.setData_hora_inicio(hourRange.get(0));
                hour.setData_hora_fim(hourRange.get(1));
                hour.setTipo(horaRequestDTO.tipo());
                hour.setJustificativa(horaRequestDTO.justificativa_lan());
                hour.setProjeto(horaRequestDTO.projeto());
                hour.setSolicitante(horaRequestDTO.solicitante());
                repository.save(hour);
            
                msg = "hora criada";
            }
        }catch (DataIntegrityViolationException ex) {
            Throwable rootCause = ex.getRootCause();
            msg = rootCause+"\n";
            
            if (rootCause instanceof java.sql.SQLException) {
                java.sql.SQLException sqlException = (java.sql.SQLException) rootCause;
                String errorMessage = sqlException.getMessage();
            
                if (errorMessage != null && errorMessage.contains("value too long for type")) {
                    msg.concat("O comprimento de um dos dados passados como chave excede o permitido pelo banco");
                }
            } else {
                Exception e = (Exception) rootCause;
                msg.concat("erro desconhecido:\n" + e.getMessage());
            }
        }         
    return msg;
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

    private static Integer stringToInteger(String str){
        int retorno = 0;
        if(str != null){
            for (Character character : str.toCharArray()) {
                retorno++;
            }
        }
        return retorno;
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
    

}