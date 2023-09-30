package API3SEM.API3SEM.controllers;

import API3SEM.API3SEM.DTOS.AuthenticationDTO;
import API3SEM.API3SEM.DTOS.EmployeeDTOs;
import API3SEM.API3SEM.entities.Employee;
import API3SEM.API3SEM.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmployeeRepository repository;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data) {
        System.out.println("Data:--------> " + data);
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.matricula(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        System.out.println("erro aqui passou");
        System.out.println("------------");
        System.out.println(auth);
        System.out.println("------------");
        return ResponseEntity.ok().build();
    }

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
}
