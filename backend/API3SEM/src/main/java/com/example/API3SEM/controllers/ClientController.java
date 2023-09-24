package com.example.API3SEM.controllers;

import com.example.API3SEM.client.Client;
import com.example.API3SEM.client.ClientRepository;
import com.example.API3SEM.client.ClientRequestDTO;
import com.example.API3SEM.client.ClientResponseDTO;
import com.example.API3SEM.utills.StatusEnum;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clients")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class ClientController {

    private final ClientRepository repository;

    @GetMapping
    public ResponseEntity<List<ClientResponseDTO>> index() {
        List<ClientResponseDTO> clients = repository.findAll().stream().map(ClientResponseDTO::new).toList();
        return ResponseEntity.ok(clients);
    }

    @PostMapping
    public Client create(@RequestBody ClientRequestDTO clientRequest) {
        Client client = new Client(clientRequest);
        client.setStatus(StatusEnum.ativo.name());
        return repository.save(client);
    }

    @PatchMapping("/{cnpj}")
    public ResponseEntity<ClientResponseDTO> update(@PathVariable String cnpj, @RequestBody Client partialClient) {
        Optional<Client> optionalClient = repository.findById(cnpj);

        if (optionalClient.isPresent()) {
            Client client = optionalClient.get();

            if (partialClient.getRazaoSocial() != null) {
                client.setRazaoSocial(partialClient.getRazaoSocial());
            }

            if (partialClient.getStatus() != null) {
                client.setStatus(partialClient.getStatus());
            }

            repository.save(client);
            return ResponseEntity.ok(new ClientResponseDTO(client));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
