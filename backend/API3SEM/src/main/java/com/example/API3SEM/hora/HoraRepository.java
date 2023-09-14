package com.example.API3SEM.hora;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface HoraRepository extends JpaRepository<Hora, Integer>{

    List<Hora> findByUsernameLancador(@Param("nome")String nome);

}

