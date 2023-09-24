package com.example.API3SEM.controllers;

import java.util.List; // Import java.util.List

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.API3SEM.client.ClientRepository;
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
    public ResponseEntity<ClientResponseDTO> create(@RequestBody ClientRequestDTO clientRequest) {
    // Create a new Client entity from the request DTO
    Client client = new Client();
    client.setCnpj(clientRequest.getCnpj());
    client.setRazao_social(clientRequest.getRazao_social());
    client.setStatus(clientRequest.isStatus());

    // Save the new client to the database using the repository
    Client savedClient = repository.save(client);

    // Map the saved client to a response DTO
    ClientResponseDTO responseDTO = new ClientResponseDTO(savedClient);

    // Return the response with a status of CREATED (201)
    return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
}

}
