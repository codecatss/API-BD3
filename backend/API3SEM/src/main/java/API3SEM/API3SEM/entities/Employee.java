package API3SEM.API3SEM.entities;

import API3SEM.API3SEM.DTOS.EmployeeDTOs;
import API3SEM.API3SEM.utills.StatusEnum;
import API3SEM.API3SEM.entities.funcaoUsuarioEnum.FuncaoUsuarioEnum;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Table(name = "usuario")
@Entity(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "matricula")
public class Employee implements UserDetails {


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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.funcao == FuncaoUsuarioEnum.admin)
            return List.of(
                new SimpleGrantedAuthority("admin"),
                new SimpleGrantedAuthority("gestor"),
                new SimpleGrantedAuthority("colaborador")
            );
        else if (this.funcao == FuncaoUsuarioEnum.gestor)
            return List.of(
                new SimpleGrantedAuthority("gestor"),
                new SimpleGrantedAuthority("colaborador")
            );
        else
            return List.of(new SimpleGrantedAuthority("colaborador"));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return matricula;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
