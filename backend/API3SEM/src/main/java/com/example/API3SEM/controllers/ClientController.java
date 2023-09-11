package com.example.API3SEM.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.API3SEM.client.Client;
import com.example.API3SEM.client.ClientRepository;
import com.example.API3SEM.client.ClientRequestDTO;
import com.example.API3SEM.client.ClientResponseDTO;
import com.example.API3SEM.utills.StatusEnum;

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
            client.setStatus(StatusEnum.ativo.name());
            return repository.save(client);
        } catch (Exception e) {
            Client client = new Client(clientRequest);
            System.out.println(client.getRazao_social());
            throw new RuntimeException("Não foi possível Cadastrar o cliente, por favor verifique as informações " + e.getMessage());
        }
    }

    @PatchMapping("disable/{cnpj}")
    public ResponseEntity<ClientResponseDTO> update(@PathVariable String cnpj) {
        try {
            if (!repository.existsById(cnpj)) {
                return ResponseEntity.notFound().build();
            }

            Client client = repository.findById(cnpj).orElse(null);
            if (client != null) {
                client.setStatus(StatusEnum.inativo.name());
                repository.save(client);
                return ResponseEntity.ok(new ClientResponseDTO(client));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            throw new RuntimeException("Não foi possível atualizar o cliente, por favor verifique as informações " + e.getMessage());
        }
    }



}