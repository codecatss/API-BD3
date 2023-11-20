package API3SEM.controllers;

import API3SEM.DTOS.IdHora;
import API3SEM.DTOS.VerbaDTOs;
import API3SEM.entities.Hora;
import API3SEM.repositories.HoraRepository;
import API3SEM.utills.Service.VerbaHora;
import API3SEM.utills.Service.VerbaService;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/verba")
public class VerbaController {

    @Autowired
    HoraRepository horaRepository;

    @PostMapping("/getVerbas")
    public ResponseEntity<?> getVerbas(@RequestBody ArrayList<IdHora> horas) {
        
        ArrayList<VerbaHora> verbas = new ArrayList<>();
        try {
            if(horas.isEmpty()) return ResponseEntity.badRequest().body("Nenhuma hora foi enviada");
            for (IdHora hora : horas) {
                try {
                    Hora tempHora = horaRepository.findById(hora.idHora()).get();
                    ArrayList<VerbaHora> tempVerba = new ArrayList<VerbaHora>();
                    tempVerba = (ArrayList<VerbaHora>) VerbaService.getVerbaFromHora(tempHora);
                    verbas.addAll(tempVerba);
                } catch (Exception e) {
                    ResponseEntity.badRequest().body("inner try "+e.getStackTrace());
                }
            }
            int comprimento = verbas.size();
            for (int i = 0; i < comprimento; i++) {
                verbas.get(i).fixDuracao();
            }
        }
        catch (Exception e) {
            ResponseEntity.badRequest().body("outter try "+e.getStackTrace());
        }
        return ResponseEntity.ok().body(verbas);
    }

    @PostMapping
    @RequestMapping("/total")
    public ResponseEntity<?> getTotalVerba(@RequestBody VerbaDTOs.TotalHoras totalHoras){
        
        VerbaService verbaService = new VerbaService(horaRepository);
        return ResponseEntity.ok().body(verbaService.getTotalVerbas(totalHoras));
    }

}