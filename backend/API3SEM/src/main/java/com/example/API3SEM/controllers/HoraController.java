package com.example.API3SEM.controllers;

import com.example.API3SEM.hora.Hora;
import com.example.API3SEM.hora.HoraRepository;
import com.example.API3SEM.hora.HoraRequestDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/hour")
@CrossOrigin(origins = "*")
public class HoraController {
    
    @Autowired
    private HoraRepository repository;

    @GetMapping("/{var}") 
    public List<Hora> allHoras(@PathVariable String var, @RequestBody String filtro){
        List<Hora> horas = null;
        if(!filtro.isEmpty()){
            if(filtro.equals("matricula")){
                horas.clear();
                horas.addAll(repository.findByLancador(var));
            }
            if(filtro.equals("cod_cd")){
                horas.clear();
                horas = repository.findByCodcr(filtro);
            }
            if(filtro.equals("cliente")){
                horas.clear();
                horas = repository.findByCnpj(filtro);
            }
        }
        return horas;          
    }

    @PostMapping("/{strHourRange}") //2023-12-1-15-15&2023-12-1-15-45  -  yyyy-mm-dd-hh-mm&yyyy-mm-dd-hh-mm
    public String putHour(@PathVariable String strHourRange, @RequestBody HoraRequestDTO horaRequestDTO){

        String msg = null;

        //try{

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
        // }catch (DataIntegrityViolationException ex) {
        //     Throwable rootCause = ex.getRootCause();
        //     if (rootCause instanceof java.sql.SQLException) {
        //         java.sql.SQLException sqlException = (java.sql.SQLException) rootCause;
        //         msg = rootCause+"\n";
        
        //         // Verifique se a mensagem de erro contém informações sobre o tamanho da coluna
        //         String errorMessage = sqlException.getMessage();
        //         if (errorMessage != null && errorMessage.contains("value too long for type")) {
        //             // Tente encontrar o nome da coluna na mensagem de erro
        //             int startIndex = errorMessage.indexOf("column \"") + "column \"".length();
        //             int endIndex = errorMessage.indexOf("\" ", startIndex);
        //             if (startIndex >= 0 && endIndex >= 0) {
        //                 String columnName = errorMessage.substring(startIndex, endIndex);
        //                 msg.concat("Erro de tamanho na coluna: " + columnName);
        //             }
        //         }
        //     } else {
        //         //System.out.println("Erro: " + errorMessage);
        //     }
        // }
        
        return "string to int: "+stringToInteger(horaRequestDTO.solicitante())+"\n"+msg;
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
    

}