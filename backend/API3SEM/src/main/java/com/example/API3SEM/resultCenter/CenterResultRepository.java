package com.example.API3SEM.resultCenter;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CenterResultRepository extends JpaRepository<CenterResult, String> {
    @Query("SELECT COUNT(c) > 0 FROM CenterResult c WHERE c.codigoCr = :codigoCr AND c.sigla = :sigla")
    boolean existsByCodigoCrAndSigla(@Param("codigoCr") String codigoCr, @Param("sigla") String sigla);
}
