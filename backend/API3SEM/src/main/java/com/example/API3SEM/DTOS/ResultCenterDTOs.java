package com.example.API3SEM.DTOS;

import com.example.API3SEM.entities.CenterResult;
import com.example.API3SEM.entities.Member;
import com.example.API3SEM.utills.StatusEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public record ResultCenterDTOs(String codigoCr, String nome, String sigla, StatusEnum statusCr) {

    public ResultCenterDTOs(CenterResult centerResult){
        this(centerResult.getCodigoCr(), centerResult.getNome(), centerResult.getSigla(), centerResult.getStatusCr());
    }

    public static record CenterResultRequestDTO(String codigoCr, String nome, String sigla, StatusEnum statusCr) {
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class CenterResultWithMembersDTO {
        private CenterResult centerResult;
        private List<Member> members;
    }
}
