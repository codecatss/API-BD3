package API3SEM.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import API3SEM.repositories.HoraRepository;
import API3SEM.utills.verbaService.VerbaHora;
import API3SEM.utills.verbaService.VerbaManager;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/verba")
public class VerbaController {

    @Autowired
    HoraRepository horaRepository;

    @GetMapping
    public ResponseEntity<?> getVerbas(@RequestBody ArrayList<Integer> horas) {
        ArrayList<ArrayList<VerbaHora>> verbas = new ArrayList<ArrayList<VerbaHora>>();
        VerbaManager.getVerbaFromHora(horaRepository.findAllById(horas));
        return ResponseEntity.ok().body(verbas);
    }   
    
}
