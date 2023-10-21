package API3SEM.utills.seed;

import API3SEM.entities.Employee;
import API3SEM.entities.funcaoUsuarioEnum.FuncaoUsuarioEnum;
import API3SEM.repositories.EmployeeRepository;
import API3SEM.utills.StatusEnum;

import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseInitialization implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public void run(String... args) throws Exception {

        Faker faker = new Faker();

        String[] mokedRoles = {"colaborador", "gestor", "admin"};

        List<Employee> moked = new ArrayList<>();
        for (String mokedRole : mokedRoles) {
            
            if(!employeeRepository.existsByNome(mokedRole)){
    

                Employee employee = new Employee();
    
                employee.setNome(mokedRole);
                employee.setMatricula(faker.number().digits(6));
                employee.setFuncao(FuncaoUsuarioEnum.valueOf(mokedRole));
                employee.setSenha(mokedRole.concat("123"));
                employee.setStatus_usuario(StatusEnum.ativo);
                moked.add(employee);
            }
        }
        Integer[] mokedIds = {6987, 4533};
        FuncaoUsuarioEnum[] mokedRolesEnum = {FuncaoUsuarioEnum.admin, FuncaoUsuarioEnum.gestor};
        for (Integer mokedId : mokedIds) {
            
            if(!employeeRepository.existsById(mokedId.toString())){

                Employee employee = new Employee();
    
                employee.setNome(faker.name().firstName());
                int index = Arrays.asList(mokedIds).indexOf(mokedId);
                employee.setFuncao(mokedRolesEnum[index]);
                employee.setMatricula(mokedId.toString());
                employee.setSenha("admin123");
                employee.setStatus_usuario(StatusEnum.ativo);
                moked.add(employee);
            }
        }
        employeeRepository.saveAll(moked);


        if(employeeRepository.findAll().size() > 15){
            return;
        }
        else{
            seedEmployees(this.employeeRepository);
        }
    }

    private static void seedEmployees(EmployeeRepository employeeRepository){
        
        Faker faker = new Faker();
        List<Employee> employees = new ArrayList<>();

        for (int i = 0; i < 15; i++) {
            Employee employee = new Employee();
            String name = faker.name().firstName();
            employee.setNome(name);
            employee.setMatricula(faker.number().digits(6));
            employee.setFuncao(FuncaoUsuarioEnum.colaborador);
            employee.setSenha(faker.number().digits(6));
            employee.setStatus_usuario(StatusEnum.ativo);
            employees.add(employee);
        }

        employeeRepository.saveAll(employees);
    }
}
