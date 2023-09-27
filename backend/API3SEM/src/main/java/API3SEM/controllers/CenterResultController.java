package API3SEM.controllers;



import API3SEM.entities.Member;
import API3SEM.utills.ApiException;
import API3SEM.utills.StatusEnum;
import API3SEM.repositories.MemberRepository;
import API3SEM.repositories.EmployeeRepository;

import API3SEM.entities.CenterResult;
import API3SEM.DTOS.MemberDTOs;
import API3SEM.repositories.CenterResultRepository;
import API3SEM.DTOS.ResultCenterDTOs;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import API3SEM.entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("cr")
public class CenterResultController {
    @Autowired
    private CenterResultRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public CenterResult saveCenterResult(@RequestBody ResultCenterDTOs.CenterResultRequestDTO data) {
        if (data.codigoCr() == null || data.nome() == null || data.sigla() == null || data.statusCr() == null) {
            throw new ApiException("Todas as informações devem ser preenchidas.");
        }

        if (repository.existsByCodigoCrAndSigla(data.codigoCr(), data.sigla())) {
            throw new ApiException("Um CR com o mesmo código e sigla já existe.");
        }

        try {
            CenterResult centerResultData = new CenterResult(data);
            return repository.save(centerResultData);
        } catch (Exception e) {
            throw new ApiException("Não foi possível cadastrar o centro de resultado, verifique as informações: " + e.getMessage());
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<ResultCenterDTOs> getAll(){


        List<ResultCenterDTOs> crList = repository.findAll().stream().map(ResultCenterDTOs::new ).toList();
        return crList;
    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{codigoCr}")
    public ResponseEntity<CenterResult> getOne(@PathVariable String codigoCr) {
        Optional<CenterResult> optionalCenterResult = repository.findById(codigoCr);

        if (optionalCenterResult.isPresent()) {
            CenterResult centerResult = optionalCenterResult.get();
            return ResponseEntity.ok(centerResult);
        } else {
            throw new ApiException("Funcionário não encontrado");
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("/{codigoCr}")
    public CenterResult updateCR(@PathVariable String codigoCr, @RequestBody ResultCenterDTOs.CenterResultRequestDTO partialData) {
        CenterResult cr = repository.findById(codigoCr).orElseThrow(() -> new ApiException("Centro de resultado não encontrado com o código: " + codigoCr));

        try {
            if (partialData.nome() != null) {
                cr.setNome(partialData.nome());
            }
            if (partialData.sigla() != null) {
                cr.setSigla(partialData.sigla());
            }
            if (partialData.statusCr() != null) {
                cr.setStatusCr(partialData.statusCr());
            }
        } catch (Exception e) {
            throw new ApiException("Erro ao atualizar o centro de resultado: " + e.getMessage());
        }

        repository.save(cr);
        return cr;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("/enable/{codigoCr}")
    public CenterResult enableCenterResult(@PathVariable String codigoCr) {
        CenterResult cr = repository.findById(codigoCr).orElseThrow(() -> new ApiException("Centro de resultado não encontrado com o código: " + codigoCr));

        try {
            cr.setStatusCr(StatusEnum.ativo);
        } catch (Exception e) {
            throw new ApiException("Erro ao ativar o centro de resultado: " + e.getMessage());
        }

        repository.save(cr);
        return cr;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{codigoCr}")
    public CenterResult softDeleteCenterResult(@PathVariable String codigoCr) {
        CenterResult cr = repository.findById(codigoCr).orElseThrow(() -> new ApiException("Centro de resultado não encontrado com o código: " + codigoCr));

        try {
            cr.setStatusCr(StatusEnum.inativo);
        } catch (Exception e) {
            throw new ApiException("Erro ao inativar o centro de resultado: " + e.getMessage());
        }

        repository.save(cr);
        return cr;
    }


    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private EmployeeRepository employeeRepository;



    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/{codigoCr}/employee")
    public List<Member> saveMembers(@PathVariable String codigoCr, @RequestBody List<MemberDTOs.MemberRequestDTO> dataList) {
        CenterResult centerResult = repository.findById(codigoCr)
                .orElseThrow(() -> new ApiException("Centro de resultado não encontrado com o código: " + codigoCr));

        if (centerResult.getStatusCr() != StatusEnum.ativo) {
            throw new ApiException("Não é possível adicionar membros a um CR inativo.");
        }

        List<Member> savedMembers = new ArrayList<>();

        try {
            for (MemberDTOs.MemberRequestDTO data : dataList) {
                Employee employee = employeeRepository.findById(data.matriculaIntegrante())
                        .orElseThrow(() -> new ApiException("Usuário não encontrado com a matrícula: " + data.matriculaIntegrante()));
                Member memberData = new Member(data);
                memberData.setCodCr(codigoCr);
                savedMembers.add(memberRepository.save(memberData));
            }
        } catch (Exception e) {
            throw new ApiException("Não foi possível cadastrar os membros, verifique as informações: " + e.getMessage());
        }

        return savedMembers;
    }



    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{codigoCr}/employee")
    public ResponseEntity<String> deleteMembersByMatricula(@PathVariable String codigoCr, @RequestBody List<String> matriculas) {
        try {
            List<Member> membersToDelete = memberRepository.findByCodCrAndMatriculaIntegranteIn(codigoCr, matriculas);

            if (!membersToDelete.isEmpty()) {
                memberRepository.deleteAll(membersToDelete);
                return ResponseEntity.ok("Membros removidos com sucesso.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            throw new ApiException("Não foi possível remover os membros: " + e.getMessage());
        }
    }



    @Autowired
    private MemberRepository memberRepositoryGET;

    @Autowired
    private EmployeeRepository employeeRepositoryGET;



    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{codigoCr}/employees")
    public List<Employee> getEmployeesByCrCode(@PathVariable String codigoCr) {
        CenterResult centerResult = repository.findById(codigoCr)
                .orElseThrow(() -> new ApiException("Centro de resultado não encontrado com o código: " + codigoCr));

        if (centerResult.getStatusCr() != StatusEnum.ativo) {
            throw new ApiException("Não é possível listar membros de um CR inativo.");
        }

        List<Member> members = memberRepositoryGET.findByCodCr(codigoCr);
        List<String> matriculas = members.stream()
                .map(Member::getMatriculaIntegrante)
                .collect(Collectors.toList());

        List<Employee> employees = employeeRepositoryGET.findByMatriculaIn(matriculas);

        return employees;
    }

    @Autowired
    private EmployeeRepository employeeRepositoryGETUnique;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{codigoCr}/employeeNotInCr")
    public List<Employee> getEmployeesNotInCenterResult(@PathVariable String codigoCr) {
        CenterResult centerResult = repository.findById(codigoCr)
                .orElseThrow(() -> new ApiException("Centro de resultado não encontrado com o código: " + codigoCr));

        if (centerResult.getStatusCr() != StatusEnum.ativo) {
            throw new ApiException("Não é possível listar membros de um CR inativo.");
        }

        List<Member> members = memberRepositoryGET.findByCodCr(codigoCr);
        List<String> matriculas = members.stream()
                .map(Member::getMatriculaIntegrante)
                .collect(Collectors.toList());

        List<Employee> allEmployees = employeeRepositoryGETUnique.findAll();

        List<Employee> employeesNotInCr = allEmployees.stream()
                .filter(employee -> !matriculas.contains(employee.getMatricula()))
                .collect(Collectors.toList());

        return employeesNotInCr;
    }

}
