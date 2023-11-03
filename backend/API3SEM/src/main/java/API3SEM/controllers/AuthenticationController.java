package API3SEM.controllers;

import API3SEM.DTOS.AuthenticationDTO;
import API3SEM.DTOS.LoginResponseDTO;
import API3SEM.entities.Employee;
import API3SEM.infra.security.TokenService;
import API3SEM.repositories.EmployeeRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmployeeRepository employeeRepository;


    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")

    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.matricula(),data.senha());
        var authentication = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Employee) authentication.getPrincipal());
        System.out.println(token);
        return ResponseEntity.ok(new LoginResponseDTO(token));

    }
}
