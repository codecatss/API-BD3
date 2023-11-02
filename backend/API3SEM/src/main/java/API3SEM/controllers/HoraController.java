package API3SEM.controllers;

import API3SEM.DTOS.HoraDTOs;
import API3SEM.DTOS.HoraDTOs.HoraRequestDTO;
import API3SEM.entities.Hora;
import API3SEM.repositories.ClientRepository;
import API3SEM.repositories.HoraRepository;
import API3SEM.utills.ApiException;
import API3SEM.utills.AprovacaoEnum;
import API3SEM.utills.TipoEnum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/hora")
public class HoraController {

    private final HoraRepository horaRepository;

    @Autowired
    public HoraController(HoraRepository horaRepository) {
        this.horaRepository = horaRepository;
    }

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping
    public ResponseEntity<?> criarHoraExtra(@RequestBody HoraDTOs.HoraRequestDTO horaRequestDTO) {
        String msg = null;

        if(validacaoHora(horaRequestDTO).contains("Erro")){
            msg = "Erro: " +" "+ validacaoHora(horaRequestDTO);
            throw new ApiException(msg);
        }
        else{
            saveHora(horaRequestDTO);
            return new ResponseEntity<>(horaRequestDTO, HttpStatus.CREATED);
        }
    }

    @GetMapping("/{var}/{filtro}") 
    public ResponseEntity<?> filtredHours(@PathVariable String var, @PathVariable String filtro){
        List<Object> response = new ArrayList<>();
        List<Hora> horas = new ArrayList<>();
        
        List<Hora> horasFromRepository = null;
        if (filtro.equals("matricula")||filtro.equals("codigo_cr")||filtro.equals("cliente")) {

            if (filtro.equals("matricula")) {
                try {
                    if (!horaRepository.findByLancador(var).isEmpty()) {
                        horasFromRepository = horaRepository.findByLancador(var);
                        for (Hora hora : horasFromRepository) {
                           horas.add(hora); 
                        }
                    }else{
                        throw new ApiException("O usuário fornecido não possui horas lançadas");
                    }
                }catch (Exception e){
                    response.add(e.getMessage());
                }

            } else if (filtro.equals("codigo_cr")) {
                try{
                    if(!horaRepository.findByCodcr(var).isEmpty()) {
                        horasFromRepository = horaRepository.findByCodcr(var);
                        for (Hora hora : horasFromRepository) {
                           horas.add(hora); 
                        }
                    }else {
                        throw new ApiException("O CR fornecido não possui horas registradas");
                    }
                }catch (Exception e){
                    response.add(e.getMessage());
                }

            } else if (filtro.equals("cliente")) {
                try {
                    if(!horaRepository.findByCnpj(var).isEmpty()) {
                        horasFromRepository = horaRepository.findByCnpj(var);
                        for (Hora hora : horasFromRepository) {
                           horas.add(hora); 
                        }
                    }else {
                        throw new ApiException("O cliente fornecido não possui horas registradas");
                    }   
                }catch (Exception e){
                    throw new ApiException(e.getMessage());
                }
            }
        }
        else {
            String error = "O valor fornecido de filtro '" + filtro + "' não atende a nenhum dos tipos permitidos. Filtro deve ser 'matricula', 'codigo_cr' ou 'cliente'";
            response.add(error);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        response.addAll(horas);
        return ResponseEntity.ok(response);          
    }

    @GetMapping("/todas")
    public ResponseEntity<List<Hora>> listarTodasHoras(

    ) {
        List<Hora> horas = horaRepository.findAllHoras();
        System.out.println(horas);

        return new ResponseEntity<>(horas, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Hora>> listarHoras() {


        List<Hora >listaHora = new ArrayList<>();

        List<Hora> horas = horaRepository.findAll();


        horas.forEach(hora -> {



            if(hora.getTipo().equals(TipoEnum.SOBREAVISO.name())){
                Hora hour = new Hora(hora);
                List<Hora >listaAcionamentos = new ArrayList<>();
                horas.forEach(hora1 -> {
                    if (hora1.getTipo().equals(TipoEnum.ACIONAMENTO.name())
                            && hora1.getCodcr().equals(hora.getCodcr())
                            && hora1.getLancador().equals(hora.getLancador())
                            && hora1.getData_hora_inicio().after(hora.getData_hora_inicio())
                            && hora1.getData_hora_fim().before(hora.getData_hora_fim())) {
                        listaAcionamentos.add(hora1);
                    }
                });

                hour.setLista_de_acionamentos(listaAcionamentos);
                listaHora.add(hour);
            }else if (hora.getTipo().equals(TipoEnum.EXTRA.name())){
                listaHora.add(hora);

            }

        });



        return new ResponseEntity<>(listaHora, HttpStatus.OK);
    }

    @GetMapping("/pendentes")
    public ResponseEntity<List<Hora>> horasAprovarGestor() {


        List<Hora >listaHora = new ArrayList<>();

        List<Hora> horas = horaRepository.findAll();


        horas.forEach(hora -> {



            if(!hora.getStatus_aprovacao().equals(AprovacaoEnum.APROVADO_ADMIN.name()) && !hora.getStatus_aprovacao().equals(AprovacaoEnum.NEGADO_ADMIN.name())){
                System.out.println(hora.getId());
                if(hora.getTipo().equals(TipoEnum.SOBREAVISO.name())){
                    Hora hour = new Hora(hora);
                    List<Hora >listaAcionamentos = new ArrayList<>();
                    horas.forEach(hora1 -> {
                        if (hora1.getTipo().equals(TipoEnum.ACIONAMENTO.name())
                                && hora1.getCodcr().equals(hora.getCodcr())
                                && hora1.getData_hora_inicio().after(hora.getData_hora_inicio())
                                && hora1.getData_hora_fim().before(hora.getData_hora_fim())) {
                            listaAcionamentos.add(hora1);
                        }
                    });

                    hour.setLista_de_acionamentos(listaAcionamentos);
                    listaHora.add(hour);
                }else if (hora.getTipo().equals(TipoEnum.EXTRA.name())){
                    listaHora.add(hora);

                }
            }

        });



        return new ResponseEntity<>(listaHora, HttpStatus.OK);
    }

    @GetMapping("/pendentesAdmin")
    public ResponseEntity<List<Hora>> horasAprovarAdministrador() {


        List<Hora >listaHora = new ArrayList<>();

        List<Hora> horas = horaRepository.findAll();


        horas.forEach(hora -> {



            if(hora.getStatus_aprovacao().equals(AprovacaoEnum.APROVADO_GESTOR.name())){
                System.out.println(hora.getId());
                if(hora.getTipo().equals(TipoEnum.SOBREAVISO.name())){
                    Hora hour = new Hora(hora);
                    List<Hora >listaAcionamentos = new ArrayList<>();
                    horas.forEach(hora1 -> {
                        if (hora1.getTipo().equals(TipoEnum.ACIONAMENTO.name())
                                && hora1.getCodcr().equals(hora.getCodcr())
                                && hora1.getData_hora_inicio().after(hora.getData_hora_inicio())
                                && hora1.getData_hora_fim().before(hora.getData_hora_fim())) {
                            listaAcionamentos.add(hora1);
                        }
                    });

                    hour.setLista_de_acionamentos(listaAcionamentos);
                    listaHora.add(hour);
                }else if (hora.getTipo().equals(TipoEnum.EXTRA.name())){
                    listaHora.add(hora);

                }
            }

        });



        return new ResponseEntity<>(listaHora, HttpStatus.OK);
    }


    @PatchMapping("/{id}")
    public Hora updateHora(@PathVariable Integer id, @RequestBody HoraDTOs.HoraRequestDTO partialData) {
        Hora hora = horaRepository.findById(id).orElseThrow(() -> new RuntimeException("Hora não encontrada com o id: " + id));

        try {
            // Verifica se está chegando algum status para a hora
            if (partialData.status_aprovacao() != null) {

                // Verifica se esse status é igual a APROVADO_GESTOR ou NEGADO_GESTOR
                if(partialData.status_aprovacao().equals(AprovacaoEnum.APROVADO_GESTOR.name()) ||
                        partialData.status_aprovacao().equals(AprovacaoEnum.NEGADO_GESTOR.name())) {
                    if (hora.getMatricula_admin() == null) {

                        // Verifica se a matrícula do gestor veio na requisição
                        if (partialData.matricula_gestor() != null) {

                            // Em caso de negação, verifica se a justificativa está preenchida
                            if (partialData.status_aprovacao().equals(AprovacaoEnum.NEGADO_GESTOR.name())) {
                                if (partialData.justificativa_negacao() != null) {

                                    // Setta tudo (é tudo ou nada)
                                    hora.setStatus_aprovacao(partialData.status_aprovacao());
                                    hora.setMatricula_gestor(partialData.matricula_gestor());
                                    hora.setJustificativa_negacao(partialData.justificativa_negacao());

                                    // Verifica se veio a data de modificação
                                    if (partialData.data_modificacao_gestor() != null) {
                                        hora.setData_modificacao_gestor(partialData.data_modificacao_gestor());
                                    } else { // Se não veio, configura como agora
                                        hora.setData_modificacao_gestor(Timestamp.valueOf(LocalDateTime.now()));
                                    }

                                } else {
                                    throw new ApiException("Deve-se colocar uma justificativa em caso de negação >:|");
                                }
                            } else { // É aprovação, tudo preenchido
                                // Setta tudo
                                hora.setStatus_aprovacao(partialData.status_aprovacao());
                                hora.setMatricula_gestor(partialData.matricula_gestor());
                                if (partialData.data_modificacao_gestor() != null) {
                                    hora.setData_modificacao_gestor(partialData.data_modificacao_gestor());
                                } else {
                                    hora.setData_modificacao_gestor(new Timestamp(System.currentTimeMillis()));
                                }
                            }
                        } else { // Gestor da ação não foi preenchido
                            throw new ApiException("Deve-se indicar o gestor da ação! >:|");
                        }
                    } else {
                        throw new ApiException("Essa hora já passou pelo ciclo de aprovação do admin! :'(");
                    }
                    // Verifica se esse status é igual a APROVADO_ADMIN ou NEGADO_ADMIN
                } else if (partialData.status_aprovacao().equals(AprovacaoEnum.APROVADO_ADMIN.name()) ||
                        partialData.status_aprovacao().equals(AprovacaoEnum.NEGADO_ADMIN.name())) {
                    // Verifica se a hora já foi aprovada por um gestor
                    if(hora.getMatricula_gestor() != null) {

                        // Verifica se a matrícula do admin da ação vieram na requisição
                        if (partialData.matricula_admin() != null) {

                            // Em caso de negação, verifica se a justificativa está preenchida
                            if (partialData.status_aprovacao().equals(AprovacaoEnum.NEGADO_ADMIN.name())) {
                                if (partialData.justificativa_negacao() != null) {
                                    // Setta tudo (é tudo ou nada)
                                    hora.setStatus_aprovacao(partialData.status_aprovacao());
                                    hora.setMatricula_admin(partialData.matricula_admin());
                                    hora.setJustificativa_negacao(partialData.justificativa_negacao());
                                    if (partialData.data_modificacao_admin() != null) {
                                        hora.setData_modificacao_admin(partialData.data_modificacao_admin());
                                    } else {
                                        hora.setData_modificacao_admin(new Timestamp(System.currentTimeMillis()));
                                    }
                                } else { // Veio sem justificativa
                                    throw new ApiException("Deve-se colocar uma justificativa em caso de negação >:|");
                                }
                            } else { // É aprovação, tudo preenchido
                                hora.setStatus_aprovacao(partialData.status_aprovacao());
                                hora.setMatricula_admin(partialData.matricula_admin());
                                if (partialData.data_modificacao_admin() != null) {
                                    hora.setData_modificacao_admin(partialData.data_modificacao_admin());
                                } else {
                                    hora.setData_modificacao_admin(new Timestamp(System.currentTimeMillis()));
                                }
                            }
                        } else { // Admin não foi preenchido
                            throw new ApiException("Deve-se indicar o admin da ação! >:|");
                        }
                    }else{ // A hora estava sem a matrícula do gestor
                        throw new ApiException("O admin não pode aprovar ou negar sem a hora ter passado pelo ciclo de aprovação do gestor! >:)");

                    }
                } else{ // Não bateu com nenhum dos status válidos
                    throw new ApiException("Deve-se colocar um status válido para a hora! >:|");
                }
            } else{ // Status chegou null
                throw new ApiException("O status da hora não pode ser nulo! >:|");
            }
        } catch (Exception e) {
            throw new ApiException("Erro ao atualizar hora: " + e.getMessage());
        }

        horaRepository.save(hora);
        return hora;
    }



    private String validacaoHora(HoraRequestDTO hora){

        List<Timestamp> hourRange = new ArrayList<>();
        hourRange.add(hora.data_hora_inicio());
        hourRange.add(hora.data_hora_fim());

        String cnpjCliente = hora.cnpj();

        if (!clientRepository.existsById(cnpjCliente)) {
            return "Erro: O cliente fornecido não esta cadastrado no sistema";
        }
        if (hourRange.get(0).after(hourRange.get(1))) {
            return "Erro: O final da hora não pode anteceder seu início";
        }
        return"";
    }
    
    private void saveHora(HoraRequestDTO hora){
        List<Timestamp> hourRange = new ArrayList<>();
        hourRange.add(hora.data_hora_inicio());
        hourRange.add(hora.data_hora_fim());

        Hora hour = new Hora();

        hour.setLancador(hora.lancador());
        hour.setData_hora_inicio(hourRange.get(0));
        hour.setData_hora_fim(hourRange.get(1));
        if(hora.tipo().contains("ex")){
            hour.setTipo(TipoEnum.EXTRA.name());
        }else {
            hour.setTipo(TipoEnum.SOBREAVISO.name());
        }
        hour.setJustificativa(hora.justificativa());
        hour.setProjeto(hora.projeto());
        hour.setSolicitante(hora.solicitante());
        hour.setCodcr(hora.codcr());
        hour.setCnpj(hora.cnpj());
        hour.setStatus_aprovacao(AprovacaoEnum.PENDENTE.name());

        if(hora.justificativa_negacao()!= null && !hora.justificativa_negacao().equals("")){
            hour.setJustificativa_negacao(hora.justificativa_negacao());
        }

        if(hora.matricula_gestor() != null && !hora.matricula_gestor().equals("")){
            hour.setMatricula_gestor(hora.matricula_gestor());
        }

        hour.setData_lancamento(new Timestamp(System.currentTimeMillis()));

        if(hora.data_modificacao_gestor() != null){
            hour.setData_modificacao_gestor(hora.data_modificacao_gestor());
        }else{
            hour.setData_modificacao_gestor(new Timestamp(System.currentTimeMillis()));
        }

        if(hora.matricula_admin() != null && !hora.matricula_admin().equals("")){
            hour.setMatricula_admin(hora.matricula_admin());
        }

        if(hora.data_modificacao_admin() != null){
            hour.setData_modificacao_admin(hora.data_modificacao_admin());
        }else{
            hour.setData_modificacao_admin(new Timestamp(System.currentTimeMillis()));
        }

        horaRepository.save(hour);
    }


    @GetMapping("/{matricula}")
    public ResponseEntity<List<HoraDTOs>> horasDoUsuario(
            @PathVariable String matricula,
            @RequestParam(name = "codCR", required = false) String codCR,
            @RequestParam(name = "cnpj", required = false) String cnpj
    ) {
        List<HoraDTOs> horasDoUsuario;

        if (codCR != null && cnpj != null) {
            horasDoUsuario = horaRepository.findByLancadorAndCodcrAndCnpj(matricula, codCR, cnpj)
                    .stream()
                    .map(HoraDTOs::new)
                    .collect(Collectors.toList());
        } else if (codCR != null) {
            horasDoUsuario = horaRepository.findByLancadorAndCodcr(matricula, codCR)
                    .stream()
                    .map(HoraDTOs::new)
                    .collect(Collectors.toList());
        } else if (cnpj != null) {
            horasDoUsuario = horaRepository.findByLancadorAndCnpj(matricula, cnpj)
                    .stream()
                    .map(HoraDTOs::new)
                    .collect(Collectors.toList());
        } else {
            horasDoUsuario = horaRepository.findByLancador(matricula)
                    .stream()
                    .map(HoraDTOs::new)
                    .collect(Collectors.toList());
        }

        if (horasDoUsuario.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(horasDoUsuario);
        }

        return ResponseEntity.ok(horasDoUsuario);
    }

//    Task BD-72 -- INÍCIO
    // Filtro por tipo de hora
    @GetMapping("/tipo")
    public ResponseEntity<List<Hora>> filtrarPorTipo(@RequestParam(name = "tipo", required = true) String tipo) {
        List<Hora> horasFiltradas = horaRepository.findByTipo(tipo);
        return ResponseEntity.ok(horasFiltradas);
    }
//
//    // Filtro por período
//    @GetMapping("/filtrarPorPeriodo")
//    public ResponseEntity<List<Hora>> filtrarPorPeriodo(
//            @RequestParam Timestamp data_hora_inicio,
//            @RequestParam Timestamp data_hora_fim,
//            @RequestParam Timestamp data_lancamento
//    ) {
//        List<Hora> horasFiltradas = horaRepository.findByPeriodo(data_hora_inicio, data_hora_fim, data_lancamento);
//        return ResponseEntity.ok(horasFiltradas);
//    }
//
//    // Filtro por status da hora
//        // Todas
//    @GetMapping("/horas")
//    public ResponseEntity<List<Hora>> listarTodasAsHoras() {
//        List<Hora> horas = horaRepository.findAll();
//        return ResponseEntity.ok(horas);
//    }
//
//        // Aprovadas
//    @GetMapping("/horas/aprovadas")
//    public ResponseEntity<List<Hora>> listarHorasAprovadas() {
//        List<Hora> horasAprovadas = horaRepository.findByStatusAprovacao(AprovacaoEnum.APROVADO_ADMIN.name());
//        return ResponseEntity.ok(horasAprovadas);
//    }
//
//        // Negadas
//    @GetMapping("/horas/negadas")
//    public ResponseEntity<List<Hora>> listarHorasNegadas() {
//        List<Hora> horasNegadas = horaRepository.findByStatusAprovacao(AprovacaoEnum.NEGADO_GESTOR.name());
//        horasNegadas.addAll(horaRepository.findByStatusAprovacao(AprovacaoEnum.NEGADO_ADMIN.name()));
//        return ResponseEntity.ok(horasNegadas);
//    }
//
//        // Horas que ainda não encerraram seu ciclo de aprovação
//    @GetMapping("/horas/pendentes")
//    public ResponseEntity<List<Hora>> listarHorasPendentes() {
//        List<Hora> horasPendentes = horaRepository.findByStatusAprovacao(AprovacaoEnum.PENDENTE.name());
//        horasPendentes.addAll(horaRepository.findByStatusAprovacao(AprovacaoEnum.APROVADO_GESTOR.name()));
//        return ResponseEntity.ok(horasPendentes);
//    }
//
//    // Horas lançadas por Clientes - TODOS!:
//        // Quantidade de lançamentos por CR (hora-extra, sobreaviso, acionamentos e total)
//    @GetMapping("/quantidade-lancamentos-cr")
//    public ResponseEntity<?> obterQuantidadeLancamentosCR(@RequestParam String tipo) {
//        if (!tipo.equals("hora-extra") && !tipo.equals("sobreaviso") && !tipo.equals("acionamentos") && !tipo.equals("total")) {
//            return ResponseEntity.badRequest().body("Tipo inválido. Deve ser 'hora-extra', 'sobreaviso', 'acionamentos' ou 'total'.");
//        }
//
//        List<Object[]> resultado = horaRepository.contarLancamentosPorCR(tipo);
//
//        return ResponseEntity.ok(resultado);
//    }
//
//        // Horas brutas trabalhadas por CR (Seria legal, verificar com PO/Cliente)
//        // TODO
//
//
//    // Horas lançadas por Clientes - TODOS:
//    // Quantidade de lançamentos por Cliente (hora-extra, sobreaviso, acionamentos e total)
//

}