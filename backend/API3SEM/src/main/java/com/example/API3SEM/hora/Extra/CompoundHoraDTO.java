package com.example.API3SEM.hora.Extra;

import java.util.List;

import com.example.API3SEM.hora.HoraRequestDTO;

public record CompoundHoraDTO(HoraRequestDTO sobreaviso, List<HoraRequestDTO> extas) {
}
