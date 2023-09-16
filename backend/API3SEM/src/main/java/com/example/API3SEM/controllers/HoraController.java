package com.example.API3SEM.controllers;

import com.example.API3SEM.hora.Hora;
import com.example.API3SEM.hora.HoraRepository;
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
                horas = repository.findByCliente(filtro);
            }
        }
        return horas;          
    }

    @PostMapping("/{strHourRange}")
    public void putHour(@PathVariable String strHourRange, @RequestBody String codcr, String lancador, String cliente,
    String tipo, String justificatica, String projeto, String solicitante, String aprovadoradm){

        List<Timestamp> hourRange = new ArrayList<>();
        for(String str : Arrays.asList(strHourRange.split("&"))){
            hourRange.add(toTimestamp(str.split("-")));
        }

        repository.save(new Hora(codcr, lancador, cliente, hourRange, tipo, justificatica, projeto, solicitante, aprovadoradm));

    }
//2023-09-13 15:30:00
    private Timestamp toTimestamp(String[] list){
        Timestamp hour;
        String str = list[0]+"-"+list[1]+"-"+list[2]+" "+list[3]+":"+list[4] + ":00";
        hour = Timestamp.valueOf(str);
        return hour;
    }

}