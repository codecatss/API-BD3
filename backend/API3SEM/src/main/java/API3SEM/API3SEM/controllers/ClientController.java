package API3SEM.API3SEM.controllers;

import java.util.List;

import API3SEM.API3SEM.DTOS.ClientDTOs;
import API3SEM.API3SEM.entities.Client;
import API3SEM.API3SEM.repositories.ClientRepository;
import API3SEM.API3SEM.utills.StatusEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clients")
@CrossOrigin(origins = "*")
public class ClientController {

    @Autowired
    private ClientRepository repository;

    @GetMapping
    public ResponseEntity<List<ClientDTOs>> index() {
        List<ClientDTOs> teste = repository.findAll().stream().map(ClientDTOs::new).toList();
        return ResponseEntity.ok(teste);
    }

    @PostMapping
    public Client create(@RequestBody ClientDTOs.ClientRequestDTO clientRequest) {
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
    public ResponseEntity<ClientDTOs> disable(@PathVariable String cnpj) {
        try {
            if (!repository.existsById(cnpj)) {
                return ResponseEntity.notFound().build();
            }

            Client client = repository.findById(cnpj).orElse(null);
            if (client != null) {
                client.setStatus(StatusEnum.inativo.name());
                repository.save(client);
                return ResponseEntity.ok(new ClientDTOs(client));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            throw new RuntimeException("Não foi possível desabilitar o cliente, por favor verifique as informações " + e.getMessage());
        }
    }

    @PatchMapping("enable/{cnpj}")
    public ResponseEntity<ClientDTOs> enable(@PathVariable String cnpj) {
        try {
            if (!repository.existsById(cnpj)) {
                return ResponseEntity.notFound().build();
            }

            Client client = repository.findById(cnpj).orElse(null);
            if (client != null) {
                client.setStatus(StatusEnum.ativo.name());
                repository.save(client);
                return ResponseEntity.ok(new ClientDTOs(client));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            throw new RuntimeException("Não foi possível habilitar o cliente, por favor verifique as informações " + e.getMessage());
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("/{cnpj}")
    public Client update(@PathVariable String cnpj,  @RequestBody ClientDTOs.ClientRequestDTO partial_client) {
        Client client = repository.findById(cnpj).orElseThrow(() -> new RuntimeException("Cliente não encontrado com o CNPJ: " + cnpj));

        try {
            if (partial_client.cnpj() != null) {
                client.setCnpj(partial_client.cnpj());
            }
            if (partial_client.razao_social() != null) {
                client.setRazao_social((partial_client.razao_social()));
            }
            if (partial_client.status() != null) {
                client.setStatus((partial_client.status()));
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        repository.save(client);
        return client;
    }
}