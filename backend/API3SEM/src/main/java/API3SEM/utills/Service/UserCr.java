package API3SEM.utills.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import API3SEM.DTOS.ResultCenterDTOs;
import API3SEM.entities.Integrante;
import API3SEM.repositories.CenterResultRepository;
import API3SEM.repositories.IntegranteRepository;

@Component
public class UserCr {

    public UserCr(CenterResultRepository repository, IntegranteRepository integranteRepository) {
    this.repository = repository;
    this.integranteRepository = integranteRepository;
    }

    @Autowired
    private CenterResultRepository repository;

    @Autowired
    private IntegranteRepository integranteRepository;

    public List<ResultCenterDTOs> getCrListByUsarId(String Userid){
        List<Integrante> listIntegrantes = new ArrayList<Integrante>();
        listIntegrantes = integranteRepository.findByIntegrantePkMatricula(Userid);
        List<ResultCenterDTOs> crList = new ArrayList<ResultCenterDTOs>();
        for (Integrante integrante : listIntegrantes) {
            crList.add(new ResultCenterDTOs(repository.findById(integrante.getIntegrantePk().getCodCr()).get()));
        }
        return crList;
    }
}
