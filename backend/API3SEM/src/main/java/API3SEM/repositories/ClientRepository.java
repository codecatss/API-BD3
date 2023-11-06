package API3SEM.repositories;


import API3SEM.entities.Client;
import API3SEM.utills.StatusEnum;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, String>{
    

}
