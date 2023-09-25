package com.example.API3SEM.resultCenter;

import com.example.API3SEM.resultCenter.CenterResult;
import com.example.API3SEM.members.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CenterResultWithMembersDTO {
    private CenterResult centerResult;
    private List<Member> members;
}