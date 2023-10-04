package API3SEM.entities;

import java.sql.Time;

import API3SEM.DTOS.HoraDTOs;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Table(name = "parametrizacao")
@Entity(name = "parametrizacao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Verba {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "hora_inicio")
    private Time inicio;

    @Column(name = "hora_fim")
    private Time fim;

    @Column(name = "exclusivo_fds")
    private boolean exclusivo = false;

    @Column(name = "remuneracao")
    private int remuneracao;

}
