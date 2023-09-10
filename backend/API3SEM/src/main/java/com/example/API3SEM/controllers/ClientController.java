package com.example.API3SEM.controllers;

import java.util.List; // Import java.util.List

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.API3SEM.client.Client;
import com.example.API3SEM.client.ClientRepository;
import com.example.API3SEM.client.ClientRequestDTO;
import com.example.API3SEM.client.ClientResponseDTO;

@RestController
@RequestMapping("/clients")
@CrossOrigin(origins = "*")
public class ClientController {

    @Autowired
    private ClientRepository repository;

    @GetMapping
    public ResponseEntity<List<ClientResponseDTO>> index() {
        List<ClientResponseDTO> teste = repository.findAll().stream().map(ClientResponseDTO::new).toList();
        return ResponseEntity.ok(teste);
    }

    @PostMapping
    public Client create(@RequestBody ClientRequestDTO clientRequest) {
        try{
            Client client = new Client(clientRequest);
            return repository.save(client);
        } catch (Exception e) {
            Client client = new Client(clientRequest);
            System.out.println(client.getRazao_social());
            throw new RuntimeException("Não foi possível Cadastrar o seu usuário, por favor verifique as informações " + e.getMessage());
        }
    }

}