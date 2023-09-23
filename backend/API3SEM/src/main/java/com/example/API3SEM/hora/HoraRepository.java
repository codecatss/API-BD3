package com.example.API3SEM.hora;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HoraRepository extends JpaRepository<Hora, Integer>{

    List<Hora> findByLancador(String nome);

    List<Hora> findByCodcr(String filtro);

    List<Hora> findByCnpj(String filtro);



}
