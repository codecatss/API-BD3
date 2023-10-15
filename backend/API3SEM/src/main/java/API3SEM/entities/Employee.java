package API3SEM.entities;

import API3SEM.DTOS.EmployeeDTOs;
import API3SEM.utills.StatusEnum;
import API3SEM.entities.funcaoUsuarioEnum.FuncaoUsuarioEnum;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "usuario")
@Entity(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "matricula")
public class Employee {


    @Id
    @Column(name = "matricula", length = 20, nullable = false)
    private String matricula;

    @Column(name = "nome", length = 80, nullable = false)
    private String nome;

    @Column(name = "senha", length = 15, nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(name = "funcao", nullable = false)
    private FuncaoUsuarioEnum funcao;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_usuario", nullable = false, columnDefinition = "VARCHAR(10) DEFAULT 'ativo'")
    private StatusEnum status_usuario;

    public Employee(EmployeeDTOs.EmployeeRequestDTO data){
        this.matricula = data.matricula();
        this.nome = data.nome();
        this.senha = data.senha();
        this.funcao = data.funcao();
        this.status_usuario = data.status_usuario();
    }


}
