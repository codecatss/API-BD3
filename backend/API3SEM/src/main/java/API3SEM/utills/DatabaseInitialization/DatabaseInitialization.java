package API3SEM.utills.DatabaseInitialization;

import API3SEM.entities.CenterResult;
import API3SEM.entities.Client;
import API3SEM.entities.Employee;
import API3SEM.entities.Hora;
import API3SEM.entities.funcaoUsuarioEnum.FuncaoUsuarioEnum;
import API3SEM.repositories.CenterResultRepository;
import API3SEM.repositories.ClientRepository;
import API3SEM.repositories.EmployeeRepository;
import API3SEM.repositories.HoraRepository;
import API3SEM.utills.AprovacaoEnum;
import API3SEM.utills.StatusEnum;

import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class DatabaseInitialization implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private HoraRepository horaRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CenterResultRepository centerResultRepository;

    private static Faker faker = new Faker();

    private static Random random = new Random();

    @Override
    public void run(String... args) throws Exception {

        seedMokeds(this.employeeRepository);
        
        List<Client> clietes = seedCliet(this.clientRepository);

        List<Employee> employees = this.employeeRepository.findAll();

        List<CenterResult> centerResults = seedCenterResults(this.centerResultRepository);
        
        if(employees.size() > 15){
            return;
        }
        // else{
            seedEmployees(this.employeeRepository);
            employees = this.employeeRepository.findAll();
        // }

        for (Employee employee : employees) {
            DatabaseInitialization.seedHoras(employee, clietes, centerResults, horaRepository);
        }
    }
    
    private static void seedMokeds(EmployeeRepository employeeRepository){
       
    
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
                employee.setFuncao(mokedRolesEnum[Arrays.asList(mokedIds).indexOf(mokedId)]);
                employee.setMatricula(mokedId.toString());
                employee.setSenha("admin123");
                employee.setStatus_usuario(StatusEnum.ativo);
                moked.add(employee);
            }
        }
        employeeRepository.saveAll(moked);
        
    }

    private static void seedEmployees(EmployeeRepository employeeRepository){
        
       

        for (int i = 0; i < 15; i++) {
            Employee employee = new Employee();
            String name = faker.name().firstName();
            employee.setNome(name);
            employee.setMatricula(faker.number().digits(6));
            employee.setFuncao(FuncaoUsuarioEnum.colaborador);
            employee.setSenha(faker.number().digits(6));
            employee.setStatus_usuario(StatusEnum.ativo);
            employeeRepository.save(employee);
        }
    }

    private static List<CenterResult> seedCenterResults(CenterResultRepository centerResultRepository){
        List<CenterResult> centerResults = new ArrayList<CenterResult>();

        if(!centerResultRepository.findAll().isEmpty()){
            return centerResultRepository.findAll();
        }
        
       
        List<String> siglas = new ArrayList<String>();
        List<String> squadList = new ArrayList<String>();
        squadList.add("TechTitans");
        squadList.add("CodeCrushers");
        squadList.add("ByteBusters");
        squadList.add("DevDynamos");
        squadList.add("HackHeroes");
        squadList.add("PixelPioneers");
        for (String squad : squadList) {
            CenterResult centerResult = new CenterResult();
            centerResult.setNome(squad);
            centerResult.setCodigoCr(faker.number().digits(6));
            centerResult.setStatusCr(StatusEnum.ativo);

            String sigla = centerResult.getNome().substring(0, 3);
            if(siglas.isEmpty() || siglas.contains(sigla)){
                centerResult.setSigla(sigla.concat(faker.number().digits(1)));
            }
            else{
                siglas.add(sigla);
                centerResult.setSigla(sigla);
            }
            centerResults.add(centerResult);
            centerResultRepository.save(centerResult);
        }
        return centerResults;

    }

    private static void seedHoras(Employee employee, List<Client> clientes, List<CenterResult> crs, HoraRepository horaRepository){
        
        int nHora = random.nextInt(10) + 1;
        for(int i = 0; i < nHora; i++){
            Hora hora = new Hora();
            int day = random.nextInt(27) + 1;
            int month = random.nextInt(11) + 1;
            int hour = random.nextInt(23) + 1; 
            int minuto = random.nextInt(59) + 1;
            int segundo = random.nextInt(59) + 1;
            hora.setCnpj(clientes.get(random.nextInt(clientes.size())).getCnpj());
            hora.setData_hora_inicio(Timestamp.valueOf(LocalDateTime.of(2023, month, day, hour, minuto, segundo)));
            hora.setData_hora_fim(Timestamp.valueOf(hora.getData_hora_inicio().toLocalDateTime().plusHours(random.nextInt(12)).plusMinutes(random.nextInt(60)).plusSeconds(random.nextInt(60))));
            hora.setData_lancamento(Timestamp.valueOf(LocalDateTime.now()));
            hora.setData_modificacao_gestor(Timestamp.valueOf(LocalDateTime.now()));
            hora.setData_modificacao_admin(Timestamp.valueOf(LocalDateTime.now()));
            hora.setLancador(employee.getMatricula());;
            hora.setCodcr(crs.get(random.nextInt(crs.size())).getCodigoCr());
            hora.setJustificativa(faker.rickAndMorty().location());
            hora.setProjeto(faker.rickAndMorty().character());
            hora.setSolicitante(faker.name().firstName());
            hora.setStatus_aprovacao(AprovacaoEnum.PENDENTE.toString());
            
            horaRepository.save(hora);
        }
        
    }

    private static List<Client> seedCliet(ClientRepository clientRepository){
        List<Client> clients = new ArrayList<Client>();
        clients = clientRepository.findAll();
        if(clients.isEmpty()){
            for (int i = 0; i < 8; i++) {
                Client client = new Client();
                client.setCnpj(faker.number().digits(14));
                client.setRazao_social(faker.company().name());
                client.setStatus(StatusEnum.ativo.toString());
                clientRepository.save(client);
            }
            return clientRepository.findAll();
        }
        else{
            return clients;
        }
    }
}
