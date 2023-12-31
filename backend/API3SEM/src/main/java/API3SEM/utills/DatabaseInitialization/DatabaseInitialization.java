package API3SEM.utills.DatabaseInitialization;

import API3SEM.DTOS.ResultCenterDTOs;
import API3SEM.entities.CenterResult;
import API3SEM.entities.Client;
import API3SEM.entities.Employee;
import API3SEM.entities.Hora;
import API3SEM.entities.Integrante;
import API3SEM.entities.IntegrantePk;
import API3SEM.entities.funcaoUsuarioEnum.FuncaoUsuarioEnum;
import API3SEM.repositories.CenterResultRepository;
import API3SEM.repositories.ClientRepository;
import API3SEM.repositories.EmployeeRepository;
import API3SEM.repositories.HoraRepository;
import API3SEM.repositories.IntegranteRepository;
import API3SEM.utills.AprovacaoEnum;
import API3SEM.utills.StatusEnum;
import API3SEM.utills.TipoEnum;
import API3SEM.utills.Service.UserCr;

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
    private IntegranteRepository integranteRepository;

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

        
        List<Client> clietes = seedCliet(this.clientRepository);
        
        List<Employee> employees = this.employeeRepository.findAll();
        
        List<CenterResult> centerResults = seedCenterResults(this.centerResultRepository);

        seedMokeds(this.employeeRepository);

        seedEmployees(this.employeeRepository);
        employees = this.employeeRepository.findAll();

        seedIntegrantes(this.centerResultRepository, this.employeeRepository, this.integranteRepository);

        for (Employee employee : employees) {
            seedHoras(employee, employeeRepository, clietes, clientRepository, horaRepository, integranteRepository, centerResultRepository);
        }
    }
    
    private static void seedMokeds(EmployeeRepository employeeRepository){
       
    
        String[] mokedRoles = {"colaborador", "gestor", "admin"};
    
        List<Employee> moked = new ArrayList<>();
        for (String mokedRole : mokedRoles) {
            
            if(!employeeRepository.existsByNome(mokedRole)){
    
                Employee employee = new Employee();
    
                employee.setNome(mokedRole);

                String matricula = faker.number().digits(6);
                if(employeeRepository.existsByMatricula(matricula)){
                    do{
                        matricula = faker.number().digits(6);}
                        while(employeeRepository.existsByMatricula(matricula));
                }
                employee.setMatricula(matricula);

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
        if(employeeRepository.findAll().size()<=15){

            for (int i = 0; i < 15; i++) {
                Employee employee = new Employee();
                String name = faker.name().firstName();
                employee.setNome(name);
                
                String matricula = faker.number().digits(6);
                if(employeeRepository.existsByMatricula(matricula)){
                    do{
                        matricula = faker.number().digits(6);}
                        while(employeeRepository.existsByMatricula(matricula));
                }
                employee.setMatricula(matricula);

                if(employeeRepository.findAllByFuncao(FuncaoUsuarioEnum.gestor).size() < 3) employee.setFuncao(FuncaoUsuarioEnum.gestor);
                else{
                    if(employeeRepository.findAllByFuncao(FuncaoUsuarioEnum.admin).size() < 3) employee.setFuncao(FuncaoUsuarioEnum.admin);
                    else {
                        employee.setFuncao(FuncaoUsuarioEnum.colaborador);
                    }
                }
                
                employee.setSenha(faker.number().digits(6));
                employee.setStatus_usuario(StatusEnum.ativo);
                employeeRepository.save(employee);
            }
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

    private static void seedIntegrantes(CenterResultRepository centerResultRepository, EmployeeRepository employeeRepository, IntegranteRepository integranteRepository){
        List<CenterResult> centerResults = centerResultRepository.findAll();
        List<Employee> employees = employeeRepository.findAll();
        for (CenterResult centerResult : centerResults) {
            for (int i = 0; i < 5; i++) {
                Employee employee = employees.get(random.nextInt(employees.size()));
                if(integranteRepository.findByIntegrantePkMatricula(employee.getMatricula()).isEmpty()){
                    boolean gestor = false;
                    if(employee.getFuncao().equals(FuncaoUsuarioEnum.gestor)) gestor = true;

                    if (employee.getMatricula() != null && centerResult.getCodigoCr() != null) {
                        IntegrantePk integrantePk = new IntegrantePk(employee.getMatricula(), centerResult.getCodigoCr());
                        integranteRepository.save(new Integrante(gestor, integrantePk.getMatricula(), integrantePk.getCodCr()));
                    }
                }
            }
        }
    }

    private static void seedHoras(Employee employee, EmployeeRepository employeeRepository, List<Client> clientes, ClientRepository clientRepository, HoraRepository horaRepository, IntegranteRepository integranteRepository, CenterResultRepository centerResultRepository){
        
        if(employee.getFuncao().equals(FuncaoUsuarioEnum.admin)){
            return;
        }
        int nHora = random.nextInt(10) + 1;
        List<Employee> gestores = new ArrayList<Employee>();
        List<Employee> administradores = new ArrayList<Employee>();
        for (Employee funcionario : employeeRepository.findAll()) {
            if(funcionario.getFuncao().equals(FuncaoUsuarioEnum.gestor)) gestores.add(funcionario);
            if(funcionario.getFuncao().equals(FuncaoUsuarioEnum.admin)) administradores.add(funcionario);
        }

        UserCr userCr = new UserCr(centerResultRepository, integranteRepository);

        for(int i = 0; i < nHora; i++){
            try {
            Hora hora = new Hora();
            
            //set tipo aleatorio
            TipoEnum[] tipos = {TipoEnum.EXTRA, TipoEnum.SOBREAVISO};
            TipoEnum tipo = tipos[random.nextInt(Arrays.asList(tipos).size())];
            hora.setTipo(tipo.toString());
            
            String cnpj = null;
            do {
                cnpj = clientes.get(random.nextInt(clientes.size())).getCnpj();
            } while (clientRepository.findById(cnpj).get().getStatus().equals(StatusEnum.inativo.toString()));
            hora.setCnpj(cnpj);
            
            int day = random.nextInt(27) + 1;
            int month = random.nextInt(11) + 1;
            int hour = random.nextInt(23) + 1; 
            int minuto = random.nextInt(59) + 1;
            int segundo = random.nextInt(59) + 1;
            hora.setData_hora_inicio(Timestamp.valueOf(LocalDateTime.of(2023, month, day, hour, minuto, segundo)));
            
            Timestamp fim = Timestamp.valueOf(hora.getData_hora_inicio().toLocalDateTime().plusHours(random.nextInt(12)).plusMinutes(random.nextInt(60)).plusSeconds(random.nextInt(60)));
            hora.setData_hora_fim(fim);

            hora.setData_lancamento(Timestamp.valueOf(LocalDateTime.now()));

            
            hora.setData_modificacao_gestor(Timestamp.valueOf(LocalDateTime.now()));
                        
            hora.setData_modificacao_admin(Timestamp.valueOf(LocalDateTime.now()));
            
            hora.setLancador(employee.getMatricula());
            
            List<String> codCr = new ArrayList<String>();

            for (ResultCenterDTOs cr : userCr.getCrListByUsarId(employee.getMatricula())) {
                codCr.add(cr.codigoCr());
            }
            
            hora.setCodcr(codCr.get(random.nextInt(codCr.size())));
            
            //set Justificativa lancamento
            hora.setJustificativa(Justificativas.getJusLan());
            
            hora.setProjeto(faker.rickAndMorty().character());
            
            hora.setSolicitante(faker.name().firstName());
            
            //aprova automaticamente a hora pelo adm se o lancador for gestor
            if(employee.getFuncao().equals(FuncaoUsuarioEnum.gestor)){
                hora.setStatus_aprovacao(AprovacaoEnum.APROVADO_ADMIN.toString());
                hora.setMatricula_gestor(hora.getLancador());
                hora.setMatricula_admin(administradores.get(random.nextInt(administradores.size())).getMatricula());
            } else{
                AprovacaoEnum[] statusAprovacao = AprovacaoEnum.values();
                AprovacaoEnum status = statusAprovacao[random.nextInt(statusAprovacao.length)];
                hora.setStatus_aprovacao(status.toString());
                if(!status.equals(AprovacaoEnum.PENDENTE)){
                    hora.setMatricula_gestor(gestores.get(random.nextInt(gestores.size())).getMatricula());
                    if (status.equals(AprovacaoEnum.NEGADO_ADMIN)||status.equals(AprovacaoEnum.APROVADO_ADMIN)) {
                        hora.setMatricula_admin(administradores.get(random.nextInt(administradores.size())).getMatricula());
                    }
                    if(status.equals(AprovacaoEnum.NEGADO_ADMIN) || status.equals(AprovacaoEnum.NEGADO_GESTOR)){
                        hora.setJustificativa_negacao(Justificativas.getJusNeg());
                    }
                }
            }
            
            horaRepository.save(hora);  
            
            } catch (Exception e) {
                System.out.println(e.getMessage());
                System.out.println(e.getCause());
                System.out.println(e.getStackTrace());
                return;
            } 
        }
    }

    private static List<Client> seedCliet(ClientRepository clientRepository){
        List<Client> clients = new ArrayList<Client>();
        clients = clientRepository.findAll();

        int nInativos = 0;
        if(clients.isEmpty()){
            for (int i = 0; i < 15; i++) {
                nInativos = 0;
                Client client = new Client();
                client.setCnpj(faker.number().digits(14));
                client.setRazao_social(faker.company().name());

                StatusEnum[] status = StatusEnum.values();
                for(Client cliente : clientRepository.findAll()){
                    if(cliente.getStatus().equals(StatusEnum.inativo.name())) nInativos++;
                }
                if(nInativos >= 3){
                    client.setStatus(StatusEnum.ativo.toString());
                }
                else{
                    client.setStatus(status[random.nextInt(status.length)].toString());
                }
                clientRepository.save(client);
            }
            return clientRepository.findAll();
        }
        else{
            return clients;
        }
    }
}
