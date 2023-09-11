package com.example.API3SEM.members;

import com.example.API3SEM.employees.Employee;
import com.example.API3SEM.resultCenter.CenterResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member,MemberId> {
    List<Member> findByCodCr(String codigoCr);
}
