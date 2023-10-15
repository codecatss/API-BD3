package API3SEM.controllers;

import API3SEM.API3SEM.DTOS.AuthenticationDTO;
import API3SEM.DTOS.EmployeeDTOs;
import API3SEM.API3SEM.DTOS.LoginResponseDTO;
import API3SEM.entities.Employee;
import API3SEM.infra.security.TokenService;
import API3SEM.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.validation.Valid;
import java.util.Arrays;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmployeeRepository repository;

    @Autowired
    private TokenService tokenService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.matricula(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Employee) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid EmployeeDTOs data) {
        if (this.repository.findByMatricula(data.matricula()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
        Employee newEmployee = new Employee(data.matricula(), data.nome(), encryptedPassword, data.funcao(), data.status_usuario());
        System.out.println(encryptedPassword);
        System.out.println(newEmployee.toString());

        this.repository.save(newEmployee);

        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping ("/validateToken")
    public ResponseEntity ValidateToken(@RequestBody @Valid String token) {
        String validationResponse = tokenService.validateToken(token);

        System.out.println("Retorno: " + validationResponse);

        if (!validationResponse.isEmpty()) {
            return ResponseEntity.ok(validationResponse); // Retorna 200 OK com a mensagem de validação
        } else {
            return ResponseEntity.badRequest().body("Token inválido"); // Retorna 400 Bad Request
        }
    }
}
