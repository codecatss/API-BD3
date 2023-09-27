package API3SEM.entities.hora.extra;

import java.util.List;

import API3SEM.DTOS.HoraDTOs;

public record CompoundHoraDTO(HoraDTOs.HoraRequestDTO sobreaviso, List<HoraDTOs.HoraRequestDTO> extras) {
}
