package API3SEM.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/status")
public class StausController {

    @GetMapping
    public ResponseEntity<?> getAllStatus() {
        return ResponseEntity.ok().body("API is running");
    }
    
}
