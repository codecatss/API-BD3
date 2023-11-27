package API3SEM.controllers;

import API3SEM.utills.ApiException;
import API3SEM.utills.StatusEnum;
import API3SEM.entities.Employee;
import API3SEM.entities.Integrante;
import API3SEM.repositories.CenterResultRepository;
import API3SEM.repositories.EmployeeRepository;
import API3SEM.repositories.IntegranteRepository;
import API3SEM.DTOS.EmployeeDTOs;
import API3SEM.DTOS.ResultCenterDTOs.CenterResultRequestDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository repository;

    @Autowired
    private IntegranteRepository integranteRepository;

    @Autowired
    private CenterResultRepository crRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public Employee saveEmployee(@RequestBody EmployeeDTOs.EmployeeRequestDTO data) {
        try {
            Employee employeeData = new Employee(data);
            System.out.println(employeeData.getMatricula());
            return repository.save(employeeData);
        } catch (Exception e) {
            Employee employeeData = new Employee(data);
            System.out.println(employeeData.getNome());
            throw new ApiException("Não foi possível Cadastrar o seu usuário, por favor verifique as informações " + e.getMessage());
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<EmployeeDTOs> getAll(){
        List<EmployeeDTOs> employeesList = repository.findAll().stream().map(EmployeeDTOs::new ).toList();
        return employeesList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{matricula}")
    public ResponseEntity<Employee> getOne(@PathVariable String matricula) {
        Optional<Employee> optionalEmployee = repository.findById(matricula);

        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            return ResponseEntity.ok(employee);
        } else {
            throw new ApiException("Funcionário não encontrado");
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{employeeId}/crlist")
    public ResponseEntity<?> getCrByUserId(@PathVariable String employeeId) {
        Optional<Employee> optionalEmployee = repository.findById(employeeId);

        if (optionalEmployee.isPresent()) {
            List<Integrante> integrantes = integranteRepository.findByIntegrantePkMatricula(employeeId);
            ArrayList<CenterResultRequestDTO> crList = new ArrayList<>();
            for (Integrante integracao : integrantes) {
                CenterResultRequestDTO crDTO = new CenterResultRequestDTO(crRepository.findById(integracao.getIntegrantePk().getCodCr()).get());
                crList.add(crDTO);
            }
            return ResponseEntity.ok(crList);
        } else {
            throw new ApiException("Funcionário não encontrado");
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("/{matricula}")
    public Employee updateEmployee(@PathVariable String matricula, @RequestBody EmployeeDTOs.EmployeeRequestDTO partialData) {
        Employee employee = repository.findById(matricula).orElseThrow(() -> new RuntimeException("Funcionário não encontrado com a matrícula: " + matricula));

        try {
            if (partialData.nome() != null) {
                employee.setNome(partialData.nome());
            }
            if (partialData.senha() != null) {
                employee.setSenha(partialData.senha());
            }
            if (partialData.funcao() != null) {
                employee.setFuncao(partialData.funcao());
            }
            if (partialData.status_usuario() != null) {
                employee.setStatus_usuario(partialData.status_usuario());
            }
        } catch (Exception e) {
            throw new ApiException("Erro ao atualizar o funcionário: " + e.getMessage());
        }

        repository.save(employee);
        return employee;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("/enable/{matricula}")
    public Employee enableEmployee(@PathVariable String matricula) {
        Employee employee = repository.findById(matricula).orElseThrow(() -> new RuntimeException("Funcionário não encontrado com a matrícula: " + matricula));

        try {
            employee.setStatus_usuario(StatusEnum.ativo);
        } catch (Exception e) {
            throw new ApiException("Erro ao ativar o funcionário: " + e.getMessage());
        }

        repository.save(employee);
        return employee;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{matricula}")
    public Employee softDeleteEmployee(@PathVariable String matricula) {
        Employee employee = repository.findById(matricula).orElseThrow(() -> new RuntimeException("Funcionário não encontrado com a matrícula: " + matricula));

        try {
            employee.setStatus_usuario(StatusEnum.inativo);
        } catch (Exception e) {
            throw new ApiException("Erro ao inativar o funcionário: " + e.getMessage());
        }

        repository.save(employee);
        return employee;
    }

}
